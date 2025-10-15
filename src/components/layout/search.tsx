import React from 'react'

const Search = () => {
    return (
        <input type='search' className='text-gray-400 border border-gray-200 w-full text-lg pl-12 py-3 outline-0 rounded-sm bg-[url(/ui/search.png)] bg-no-repeat bg-[16px_50%] bg-[size:24px]'
            placeholder='O que você procura ?' />
    )
}

export default Search