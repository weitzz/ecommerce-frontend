"use client"
import Image from 'next/image'
import React, { useState } from 'react'
type Props = {
    text: string
}

export const ProductDescription = ({ text }: Props) => {
    const [opened, setOpened] = useState(true)
    return (
        <div className='bg-white border border-gray-200 px-6 pt-12 mt-20'>
            <div className={`flex justify-between items-center pb-7 ${opened ? "border-b" : "border-0"}  border-gray-200`}>
                <h2 className='text-2xl font-bold'>Informações do produto</h2>
                <div onClick={() => setOpened(!opened)} className="cursor-pointer size-12 border border-gray-200 rounded-sm flex justify-center items-center">
                    <Image src={"/ui/arrow-left-s-line.png"} width={24} height={24} alt="" className={`${opened ? "rotate-0" : "rotate-180"} transition-all `} />
                </div>
            </div>
            {opened && <p className='text-gray-500 my-12'>{text}</p>}
        </div>
    )
}
