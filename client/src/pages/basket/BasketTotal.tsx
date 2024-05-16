import React from 'react'
import { useStores } from '../../store/MobXProvider'
import { formatNumberWithSpaces } from '../../helpers/functions'
import { observer } from 'mobx-react-lite'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {}

const BasketTotal = (props: Props) => {
    const { basketStore } = useStores()
    return (
        <div className='basket-total'>
            <h3>Ваш заказ</h3>
            <p className="d-flex justify-content-between">
                <span>Продукты</span>
                <span>{formatNumberWithSpaces(basketStore.getBasketTotal())} <i className="fa-solid fa-tenge-sign"></i></span>
            </p>

            <p className="d-flex justify-content-between mb-0">
                <span>
                    Доставка
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip id="button-tooltip" {...props}>
                            Для корзины от 6 000 <i className="fa-solid fa-tenge-sign"></i> <br /> доставка бесплатная, <br /> до 6 000 <i className="fa-solid fa-tenge-sign"></i> - 600 <i className="fa-solid fa-tenge-sign"></i>
                        </Tooltip>}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle ms-2" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                    </OverlayTrigger>
                </span>
                <span>{basketStore.getBasketTotal() > 6000 ? 'Бесплатно' : '600'} <i className="fa-solid fa-tenge-sign"></i></span>
            </p>

            <hr />

            <h4 className='d-flex justify-content-between'>
                <span>Итоговая сумма</span>
                <span>{formatNumberWithSpaces(basketStore.getBasketTotal() + (basketStore.getBasketTotal() > 6000 ? 0 : 600))} <i className="fa-solid fa-tenge-sign"></i></span>
            </h4>

            <Link to={'/checkout'} className='mt-4 btn btn-primary'>К оформлению заказа</Link>
        </div>
    )
}

export default observer(BasketTotal)