"use client"
import { useQueryString } from '@/hooks/useQueryString'
import React from 'react'
type Props = {
    groupId: string
    item: {
        id: string
        label: string
    }
}
function CheckBoxInput({ groupId, item }: Props) {
    const queryString = useQueryString()
    const toggleFilter = (groupId: string, itemId: string) => {
        const queryGroup = queryString.get(groupId)
        let currentFilters = queryGroup ? queryGroup.split('|') : []

        if (currentFilters.includes(itemId)) {
            currentFilters = currentFilters.filter(i => i !== itemId)
        } else {
            currentFilters.push(itemId)
        }
        queryString.set(groupId, currentFilters.join('|'))
    }
    const hasFilter = (groupId: string, itemId: string) => {
        let currentFilters = queryString.get(groupId)?.split('|')
        return currentFilters && currentFilters.includes(itemId) ? true : false
    }

    return (
        <div className=" flex gap-4 items-center mt-4 ">
            <input onChange={() => toggleFilter(groupId, item.id)}
                checked={hasFilter(groupId, item.id)}
                type="checkbox" className="size-6" id={`ck-${item.id}`} />
            <label htmlFor={`ck-${item.id}`} className="text-gray-500 text-lg">{item.label}</label>
        </div>
    )
}

export default CheckBoxInput