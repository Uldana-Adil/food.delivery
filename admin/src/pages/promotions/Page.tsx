import React, { useEffect, useState } from 'react'
import { useStores } from '../../store/MobXProvider'
import { IPromotion } from '../../types/promotions/IPromotion'
import promotionService from '../../services/promotion-service'
import Create from './components/create/Index'
import Edit from './components/edit/Index'
import Delete from './components/delete/Index'
import APP_CONFIG from '../../app.config'
import ProductTypesList from './components/ProductTypesList'
import ProductList from './components/ProductList'

type Props = {}

const Page = (props: Props) => {

 const { routerStore } = useStores()

    const [list, setList] = useState<IPromotion[]>([])
    const [error, setError] = useState<string | null>(null)

    const update = () => {
        setError(null)
        promotionService.findAll().then((response) => {
            setList(response.data)
        }).catch((error) => {
            setError("Ошибка при получении списка")
            console.log(error)
        })
    }

    useEffect(() => {
        routerStore.setCurrentPath('/promotions')
        update()
    }, [])

    return (
        <>
            <h3 className='mb-4'>Действующие акции и скидки</h3>
            <Create update={update}/>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: 50 }}>#</th>
                        <th scope="col" style={{ width: 200 }}>Название</th>
                        <th scope="col" style={{ width: 200 }}>Размер скидки</th>
                        <th scope='col'>Продукты</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.discount} %</td>
                                <td>
                                  <ProductTypesList item={item} update={update}/>
                                  <ProductList item={item} update={update}/>
                                </td>
                                <td>
                                    <div className="d-flex" style={{ gap: 20 }}>
                                        <Edit item={item} update={update} />
                                        <Delete item={item} update={update}/>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Page