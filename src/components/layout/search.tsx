"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const Search = () => {
    const router = useRouter()
    const [value, setValue] = useState("")




    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!value.trim()) return

        router.push(`/search?query=${encodeURIComponent(value)}`)

    }


    return (
        <form onSubmit={handleSubmit}>

            <input
                type='search'
                className='text-gray-400 border border-gray-200 w-full text-lg pl-12 py-3 outline-0 rounded-sm bg-[url(/ui/search.png)] bg-no-repeat bg-[16px_50%] bg-[size:22px]'
                placeholder='O que você procura ?'
                value={value}
                onChange={e => setValue(e.target.value)} />

        </form>
    )
}

export default Search