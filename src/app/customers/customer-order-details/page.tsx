import {leftArrow } from '@/assets/common-icons'
import Header from '@/Components/Header'
import GeneralCard from '@/Components/OrderDetails/GeneralCard'
import Items from '@/Components/OrderDetails/Items'
import PaymentDetailsCard from '@/Components/OrderDetails/PaymentDetailsCard'
import Sidebar from '@/Components/Sidebar'
import React from 'react'

const paymentData = {
    paymentMethod: {
        type: "card",
        lastFour: "456",
    },
    orderItems: [
        { quantity: 1, name: "Salted Caramel Latte", price: 10.9 },
        { quantity: 1, name: "Vanilla Cappuccino", price: 12.9 },
        { quantity: 2, name: "Breakfast Croissants", price: 12.9 },
        { quantity: 1, name: "Chocolate Shake", price: 16.9 },
    ],
    total: 34.8,
    gst: 5.8,
    subtotal: 40.8,
};

function page() {
    return (
        <div className='bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr]'>
            <div><Sidebar /></div>
            <div className='flex flex-col gap-3 p-4 justify-center'>
                <Header heading='Customers' subheading='Let’s check your clients here' />
                <div className='bg-white p-5 rounded-2xl text-lg font-medium'>
                    <div className='flex items-center gap-1'>
                        {leftArrow}
                        <h1>Order Details</h1>
                    </div>
                    <div className='grid grid-cols-[800px_1fr]'>
                        <div className='flex flex-col grid-cols-[1fr_1fr]'>
                            <GeneralCard date="27 April, 2025" id={881911} name="Aiza Nadeem" contact="+99 345 8789199" branch="Ny Caffine California" />
                            <PaymentDetailsCard {...paymentData} />
                        </div>
                        <div className='flex flex-col p-6 bg-gray-100'>
                            <h1 className='text-lg font-medium mb-4'>Item List(3)</h1>
                            <div className='flex flex-col gap-4'>
                                <Items
                                    imageSrc="/iced-mocha.png"
                                    altText="Item 1"
                                    heading="Salted Caramel Latte"
                                    total={10}
                                    Qty={1}
                                    Modifiers={['Whipped cream', '2 espresso shots', 'Sprinkles']}
                                />
                                <Items
                                    imageSrc="/iced-mocha.png"
                                    altText="Item 2"
                                    heading="Salted Caramel Latte"
                                    total={10}
                                    Qty={1}
                                    Modifiers={['Whipped cream', '2 espresso shots', 'Sprinkles']}
                                />
                                <Items
                                    imageSrc="/iced-mocha.png"
                                    altText="Item 2"
                                    heading="Salted Caramel Latte"
                                    total={10}
                                    Qty={1}
                                    Modifiers={['Whipped cream', '2 espresso shots', 'Sprinkles']}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default page
