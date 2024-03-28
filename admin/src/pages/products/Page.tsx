import React, { useEffect, useState } from 'react'
import { useStores } from '../../store/MobXProvider'
import { IProduct } from '../../types/products/IProduct'

type Props = {}

const Page = (props: Props) => {
    const { routerStore } = useStores()
    const [list, setList] = useState<IProduct>([])

    useEffect(() => {
        routerStore.setCurrentPath('/products')
    }, [])
    return (
        <>
            <h3>Продукты</h3>

            

        </>
    )
}

export default Page