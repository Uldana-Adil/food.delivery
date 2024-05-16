import React, { useState } from 'react'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { PromotionCreateRequest } from '../../../../types/promotions/PromotionCreateRequest'
import promotionService from '../../../../services/promotion-service'

type Props = {
    update: () => void
    handleClose: () => void
}

const Form = (props: Props) => {

    const [formValues, setFormValues] = useState<PromotionCreateRequest>(new PromotionCreateRequest())
    const [error, setError] = useState<string | null>(null)
    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        promotionService.create(formValues).then((response) => {
            props.update()
            props.handleClose()
        }).catch((error) => {
            console.log(error)
            setError('Ошибка при создании')
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
                />
            </FormGroup>

            {error && <div className="alert alert-danger">{error}</div>}

            <Button type={'submit'}>Сохранить</Button>

        </form>
    )
}

export default Form