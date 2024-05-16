import React, { useEffect, useState } from 'react'
import { useStores } from '../../store/MobXProvider'
import { observer } from 'mobx-react-lite'
import { IOrder } from '../../types/orders/IOrder'
import orderService from '../../services/order-service'
import OrderProducts from './OrderProducts'
import StatusHistory from './StatusHistory'
import ChangeStatus from './ChangeStatus'

type Props = {}

const Page = (props: Props) => {
  const { routerStore } = useStores()

  const [list, setList] = useState<IOrder[]>([])

  const update = () => {
    orderService.findAll().then((response) => {
      setList(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    routerStore.setCurrentPath('/orders')
    update()
  }, [])
  return (
    <>
      <h3>Заказы</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Номер</th>
            <th>Адрес</th>
            <th>Состав</th>
            <th>Текущий статус</th>
            <th>История статусов</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((item) => {
              return <tr>
                <td>{item.id}</td>
                <td>{item.phone}</td>
                <td>
                  <div>
                    {item.address.city ? item.address.city.name + ", " : ''}
                    {item.address.cityDistrict ? item.address.cityDistrict.name + ", " : ''}
                    {item.address.street}, {item.address.house}, {item.address.roomNumber}
                  </div>
                </td>
                <td>
                  <OrderProducts products={item.orderProducts} />
                </td>
                <td>
                  {item.statusHistories[0].status.name}
                </td>
                <td>
                  <StatusHistory history={item.statusHistories} />
                </td>
                <td>
                  <ChangeStatus status={item.statusHistories[0].status} id={item.id} update={update}/>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default observer(Page)