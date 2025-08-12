import { MenuProvider } from '@/components/menu/context/MenuContext'
import Form from '@/components/menu/new-item/Form'
import React from 'react'

function page() {
    return (
        <MenuProvider>
        <Form />
        </MenuProvider>

    )
}

export default page
