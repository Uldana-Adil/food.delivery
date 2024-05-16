import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';
import { IProductType } from '../../../types/productTypes/IProductType';
import { IPromotion } from '../../../types/promotions/IPromotion';
import promotionService from '../../../services/promotion-service';
import productTypeService from '../../../services/productType-service';

type Props = {
  item: IPromotion,
  update:()=>void
}

const ProductTypesList = (props: Props) => {
  const [show, setShow] = useState(false);

  const [productTypes, setProductTypes] = useState<IProductType[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    productTypeService.findAll().then((response)=>{
      setProductTypes(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const handleDelete = (id:number)=>{
    promotionService.removeProductType(props.item.id, id).then((response)=>{
      props.update()
    }).catch((error)=>{
      console.log(error)
    })
  }

  const handleAppend = (id:number)=>{
    promotionService.appendProductType(props.item.id, id).then((response)=>{
      props.update()
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <>
      <Button variant="primary" size='sm' onClick={handleShow}>
        Типы продуктов
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='h5'>Типы продуктов, участвующих в акции</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {
              productTypes.map((item: IProductType) => {
                return <ListGroup.Item key={item.id}>
                    <Form.Check type={'checkbox'} label={item.name} defaultChecked={props.item.productTypes.map((pt)=>{return pt.id}).includes(item.id)} onChange={(e)=>{
                      if(e.target.checked) {
                        handleAppend(item.id)
                      } else {
                        handleDelete(item.id)
                      }
                    }}/>
                </ListGroup.Item>
              })
            }
          </ListGroup>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default ProductTypesList