import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IProduct } from '../../types/catalog/IProduct'
import catalogService from '../../services/catalog-service'
import { Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { useStores } from '../../store/MobXProvider'
import { observer } from 'mobx-react-lite'

type Props = {}

const Page = (props: Props) => {
    const { id } = useParams()
    const [product, setProduct] = useState<IProduct | null>(null)
    useEffect(() => {
        catalogService.getProduct(Number(id)).then((response) => {
            setProduct(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [id])

    const { basketStore } = useStores()

    return (
        <>
            {product &&
                <>
                    <div className="title-banner">
                        <img src={process.env.REACT_APP_API_URL + product.images[1]} alt="" />
                        <div className="title-banner-content">
                            <Container>
                                <h5 className='text-white'><b>{product.productType.name}</b></h5>

                                <h2>{product.name}</h2>
                            </Container>
                        </div>
                    </div>
                    <Container>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <Swiper
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    modules={[Navigation]}
                                    navigation={{
                                        nextEl: '.btn-next-2',
                                        prevEl: '.btn-prev-2'
                                    }}
                                >
                                    {
                                        product.images.map((image, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <img src={process.env.REACT_APP_API_URL + image}
                                                        style={{
                                                            width: '100%',
                                                            aspectRatio: '1 / 1',
                                                            objectFit: 'cover',
                                                            borderRadius: 10
                                                        }}
                                                        alt="" />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                            <div className="col-md-6 pt-5">
                                <p >Артикул: {product.article}</p>
                                <div className='mt-4'>
                                    <small>Розничная цена: </small>
                                    {
                                            product.promotion && <p className='mb-0'> <del>{product.price} тг</del></p>
                                        }
                                    <h3>{product.promotion ? (product.price - (product.price * (product.promotion?.discount / 100))) : product.price} тг за {product.dimensionValue} {product.dimensions}</h3>
                                </div>
                                <div className="d-flex mt-3" style={{ gap: 20 }}>
                                    <div>
                                        <small>Оптовая цена: </small>
                                        {
                                            product.promotion && <p className='mb-0'> <del>{product.whosalePrice} тг</del></p>
                                        }
                                        <h3>{product.promotion ? (product.whosalePrice - (product.whosalePrice * (product.promotion?.discount / 100))) : product.whosalePrice} тг</h3>
                                    </div>
                                    <div>
                                        <small>Минимальный опт: </small>
                                        <h3>{product.whosaleQuantity * product.dimensionValue} {product.dimensions}</h3>
                                    </div>
                                </div>

                                {
                                    product.promotion && <div className='alert alert-success mt-3'>
                                        <h6>Акция: {product.promotion?.name}</h6>
                                        <h4 className='fw-bold text-success'>Скидка {product.promotion?.discount}%</h4>
                                        <p>{product.promotion?.description}</p>
                                        
                                    </div>
                                }

                                {
                                    basketStore.isInBasket(product.id) ?
                                        <Link to="/basket"><div className='btn btn-primary'>К корзине</div> </Link>
                                        :
                                        <button className='btn btn-primary mt-3'
                                            onClick={() => basketStore.addProduct({
                                                productId: product.id,
                                                amount: 1,
                                                price: (product.promotion ? product.price - (product.price * (product.promotion?.discount / 100)) : product.price),
                                                saleType: 'retail'
                                            })}>
                                            <i className="fa-solid fa-cart-plus"></i> - Добавить в корзину
                                        </button>
                                }

                                <h5 className="mt-4">Описание</h5>
                                <p>
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </Container>
                </>
            }
        </>
    )
}

export default observer(Page)