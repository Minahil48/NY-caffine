import { MenuProvider } from '@/components/menu/context/MenuContext'
import MenuSection from '@/components/menu/MenuSection'
import React from 'react'

function page() {
  return (
    <MenuProvider>
    <MenuSection/>
    </MenuProvider>
  )
}

export default page
