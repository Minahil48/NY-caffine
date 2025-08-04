import React from 'react'
import Link from 'next/link'
import AddButton from '../AddButton'
import { leftArrow } from '@/assets/common-icons'
import Form from './Form'

function AddItem() {
  return (
    <div>
      <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
            <div className='flex w-full justify-between hover:text-primary cursor-pointer'><Link href={"/menu-page"}><h1 className='text-xl flex items-center'>{leftArrow} Add New Item</h1></Link>
            <Link href=""><AddButton label="Add to Inventory"/></Link></div>
            <Form/>
    </div>
    
    </div>
  )
}

export default AddItem
