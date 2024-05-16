import React, { useState } from 'react'
import { IProductType } from '../../../../types/productTypes/IProductType'
import { Button, Figure, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { ProductTypeUpdate } from '../../../../types/productTypes/ProductTypeUpdate'
import APP_CONFIG from '../../../../app.config'
import productTypeService from '../../../../services/productType-service'
import { PromotionUpdateRequest } from '../../../../types/promotions/PromotionUpdateRequest'
import { IPromotion } from '../../../../types/promotions/IPromotion'
import promotionService from '../../../../services/promotion-service'

type Props = {
    handleClose: () => void
    update: () => void
    item: IPromotion
}

const Form = (props: Props) => {

    const [formValues, setFormValues] = useState<PromotionUpdateRequest>(new PromotionUpdateRequest(props.item))
    const [error, setError] = useState<string | null>(null)

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        promotionService.update(formValues).then((response) => {
            props.update()
            props.handleClose()
        }).catch((error) => {
            setError('Ошибка при сохранений изменений')
        })
    }

    return (
        <form onSubmit={handleForm}>
            <FormGroup className='mb-3'>
                <FormLabel>Название</FormLabel>
                <FormControl type="text"
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    autoFocus
                />
            </FormGroup>

            <FormGroup className='mb-3'>
                <FormLabel>Описание</FormLabel>
                <FormControl
                    rows={4}
                    value={formValues.description}
                    as={'textarea'}
                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    autoFocus
                />
            </FormGroup>

            <FormGroup className='mb-3'>
                <FormLabel>Размер скидки в %</FormLabel>
                <FormControl type="text"
                    value={formValues.discount}
                    onChange={(e) => setFormValues({ ...formValues, discount: +e.target.value })}
                    autoFocus
                />
            </FormGroup>

            
            {error && <div className="alert alert-danger">{error}</div>}

            <Button type={'submit'}>Сохранить изменения</Button>

        </form>
    )
}

export default Form