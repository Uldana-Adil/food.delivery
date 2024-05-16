import React from 'react' //Сначала мы импортируем React и интерфейс IProfilePayment из файла с типами
import { IProfilePayment } from '../../types/profile/payment/IProfilePayment'
import CreatePayment from './CreatePayment'

type Props = { //Мы определяем тип Props, который содержит массив объектов payments (способы оплаты) и функцию update, которая будет вызываться для обновления данных.
    payments: IProfilePayment[],
    update: () => void
}

const Payments = (props: Props) => { //Компонент Payments получает props в качестве параметра и отображает список способов оплаты.
    return ( //Внутри блока div у нас есть заголовок "Способы оплаты" и компонент CreatePayment, который позволяет добавить новый способ оплаты.
        <div className="card card-body border-0"> 
        
            <h4>Способы оплаты</h4> 

            <div>
                <CreatePayment source='profile' update={props.update} />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Название карты</th>
                        <th>Номер карты</th>
                        <th>Срок действия</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.payments.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.cardNumber}</td>
                                <td>{item.expirationDate}</td>
                                <td></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
} //Мы используем функцию map, чтобы пройти по массиву payments и отобразить каждый объект в виде строки в таблице.

export default Payments //В конце мы экспортируем компонент Payments, чтобы он мог быть использован в других частях нашего приложения.