import React, { ReactNode } from 'react'
interface ViewProps {
    value: string;
    icon?: ReactNode;
}

function ViewButton({ value, icon }: ViewProps) {
    return (
        <div className='flex gap-2 border-1 border-gray-300 bg-secondary p-2 text-xs items-center justify-center rounded-2xl'>
            {value}
            {icon}
        </div>
    )
}

export default ViewButton
