import React from 'react'

interface ButtonProps {
    label:string;
}

function AddButton({label}:ButtonProps) {
  return (
    <div className='flex px-4 py-2 rounded-lg bg-primary text-white items-center justify-center hover:bg-gray-300 hover:text-black'>
      {label}
    </div>
  )
}

export default AddButton
