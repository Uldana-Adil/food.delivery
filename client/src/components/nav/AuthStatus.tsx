import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStores } from '../../store/MobXProvider'
import { observer } from 'mobx-react-lite'
import { Button, Dropdown } from 'react-bootstrap'
import profileService from '../../services/profile-service'

type Props = {}

const AuthStatus = (props: Props) => {
    const { authStore } = useStores()

// 
    profileService.getBonuses().then((response) => {
        authStore.setBonus(response.data)
    }).catch((error) => {
        console.log(error)
    })

    return <>
        {
            authStore.isAuth ? <>
                <p className='mb-0 me-3'><span className='h5'>{authStore.currentBonus}</span> бонусов</p>
                <Dropdown  align="end">
                    <Dropdown.Toggle id="dropdown-basic">
                        {authStore.user?.email}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/profile">Профиль</Dropdown.Item>
                        <Dropdown.Item href="/FAQ">Помощь</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => authStore.logout()}>Выйти</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>
                : <Link to="/auth/login" className='btn btn-primary'><i className="fa-solid fa-right-to-bracket"></i> Войти</Link>
        }
    </>
}

export default observer(AuthStatus)