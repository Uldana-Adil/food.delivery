import React from 'react'
import { IOrderStatus } from '../../types/orders/IOrderStatus'
import { Button } from 'react-bootstrap'
import orderService from '../../services/order-service'

type Props = {
    status: IOrderStatus,
    id: number,
    update: () => void
}

const ChangeStatus = (props: Props) => {

    const handleSetStatus = (statusCode: string) => {
        orderService.setStatus(props.id, statusCode).then((response) => {
            props.update()
        }).catch((error) => console.log(error))
    }

    return (
        <>
            {
                props.status.code === 'NEW' &&
                <Button onClick={() => handleSetStatus('ACCEPTED_BY_MERCHANT')} size='sm' variant="success"> Принять </Button>
            }
            {
                props.status.code === 'ACCEPTED_BY_MERCHANT' &&
                <Button onClick={() => handleSetStatus('PREPARED')} size='sm' variant="success"> Подготовить </Button>
            }
            {
                props.status.code === 'PREPARED' &&
                <Button onClick={() => handleSetStatus('DELIVERING')} size='sm' variant="success"> Отгрузить </Button>
            }
            {
                props.status.code === 'DELIVERING' &&
                <Button onClick={() => handleSetStatus('DELIVERED')} size='sm' variant="success"> Доставлен </Button>
            }
            {
                props.status.code !== 'DELIVERED' &&
                <Button onClick={() => handleSetStatus('CANCELED')} className='ms-2' size='sm' variant="danger"> Отменить</Button>
            }
        </>
    )
}

export default ChangeStatus