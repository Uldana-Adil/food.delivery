import React, { useState } from 'react'
import { Button, FloatingLabel, Form, ListGroup, Modal } from 'react-bootstrap';
import { IProductType } from '../../../types/productTypes/IProductType';
import { IPromotion } from '../../../types/promotions/IPromotion';
import promotionService from '../../../services/promotion-service';
import { IProduct } from '../../../types/products/IProduct';
import productService from '../../../services/product-service';
import ImageToggle from '../../../components/ImageToggle';

type Props = {
    item: IPromotion,
    update: () => void
}

const ProductList = (props: Props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [searchInput, setSearchInput] = useState<string>('');
    const [resultProducts, setResultProducts] = useState<IProduct[]>([]);

    const handleDelete = (id: number) => {
        promotionService.removeProduct(props.item.id, id).then((response) => {
            props.update()
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSearch = (value: string) => {
        setSearchInput(value)
        if (value.length < 2) {
            setResultProducts([])
        } else {
            productService.findAll({
                query: value
            }).then((response) => {
                setResultProducts(response.data[0])
            }).catch((error) => {
                console.log(error)
            })
        }

    }

    return (
        <>
            <Button variant="primary" className='ms-2' size='sm' onClick={handleShow}>
                Продукты
            </Button>

            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Продукты, участвующие в акции</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {
                            props.item.products.map((item: IProduct) => {
                                return <ListGroup.Item key={item.id}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className='d-flex align-items-center' style={{ gap: 20 }}>
                                            <ImageToggle
                                                src={item.images[0].path}
                                                title={item.article}
                                                style={{ width: 30 }}
                                            />
                                            <p className='mb-0'>{item.name}</p>
                                            <p className='mb-0'>{item.article}</p>
                                        </div>
                                        <Button variant="danger" size='sm' onClick={() => handleDelete(item.id)}>Удалить</Button>
                                    </div>
                                </ListGroup.Item>
                            })
                        }

                        <div className="card mt-4">
                            <div className="card-header">Добавление товара</div>
                            <div className="card-body">
                                <FloatingLabel
                                    controlId="searchInput"
                                    label="Название или артикул товара"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="name@example.com" value={searchInput}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </FloatingLabel>
                                <div className="searchResult">
                                    <ListGroup>
                                        {
                                            resultProducts.map((item: IProduct) => {
                                                return <ListGroup.Item key={item.id}>
                                                    <div className="d-flex justify-content-between">
                                                        <div className='d-flex align-items-center' style={{ gap: 20 }}>
                                                            <ImageToggle
                                                                src={item.images[0].path}
                                                                title={item.article}
                                                                style={{ width: 30 }}
                                                            />
                                                            <p className='mb-0'>{item.name}</p>
                                                            <p className='mb-0'>{item.article}</p>
                                                        </div>
                                                        <Button variant="primary" size='sm' onClick={() => {
                                                            promotionService.appendProduct(props.item.id, item.id).then((response) => {
                                                                props.update()
                                                                setResultProducts([])
                                                                setSearchInput('')
                                                            }).catch((error) => {
                                                                console.log(error)
                                                            })
                                                        }}>Добавить</Button>
                                                    </div>
                                                </ListGroup.Item>
                                            })
                                        }
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </ListGroup>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ProductList