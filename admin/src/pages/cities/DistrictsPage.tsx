import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cityService from '../../services/city-service'
import { ICity } from '../../types/cities/ICity'
import AppendDistrict from './components/appendDistrict/Index'
import { ICityDistrict } from '../../types/cities/ICityDistrict'
import Edit from './components/editDistrict/Index'
import Delete from './components/deleteDistrict/Index'

type Props = {}

const DistrictsPage = (props: Props) => {
    const { id } = useParams()
    const [city, setCity] = useState<ICity | null>(null)
    const [error, setError] = useState<string | null>(null)
    const update = () => {
        setError(null)
        cityService.findOne(Number(id)).then((response) => {
            setCity(response.data)
        }).catch((error) => {
            setError("Ошибка при получении данныз")
            console.log(error)
        })
    }
    useEffect(()=>{
        update()
    },[])
    return (
        <>
            {
                city && <>
                    <h3 className='mb-4'>Районы для города {city.name}</h3>
                    <Link to="/cities" className='btn btn-secondary me-3 mb-3'>Назад</Link>
                    <AppendDistrict cityId={city.id} update={update} />
                    {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: 80 }}>#</th>
                        <th style={{ width: 200 }}>Название</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        city.districts.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="d-flex" style={{ gap: 10 }}>
                                            <Edit item={item} update={update} />
                                            <Delete item={item} update={update} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
                </>
            }
        </>
    )
}

export default DistrictsPage