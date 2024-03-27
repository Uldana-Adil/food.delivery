import React, { useEffect } from 'react'
import { useStores } from '../../store/MobXProvider'

type Props = {}

const Page = (props: Props) => {
    const { routerStore } = useStores()
    useEffect(() => {
        routerStore.setCurrentPath('/products')
    }, [])
    return (
        <div>Page</div>
    )
}

export default Page