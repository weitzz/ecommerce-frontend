"use client"
import { useQueryString } from '@/hooks/useQueryString'
import { useEffect, useState } from 'react'

type Props = {
    groupId: string
    item: {
        id: string
        label: string
    }
}
function CheckBoxInput({ groupId, item }: Props) {
    const queryString = useQueryString()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const current = queryString.get(groupId)?.split('|') ?? []
        setChecked(current.includes(item.id))
    }, [groupId, item.id])



    const toggleFilter = () => {
        const queryGroup = queryString.get(groupId)
        let currentFilters = queryGroup ? queryGroup.split('|') : []

        if (currentFilters.includes(item.id)) {
            currentFilters = currentFilters.filter(i => i !== item.id)
        } else {
            currentFilters.push(item.id)
        }

        queryString.set(groupId, currentFilters.join('|'))
        setChecked(!checked)
    }


    return (
        <div className=" flex gap-4 items-center mt-4 ">
            <input
                onChange={toggleFilter}
                checked={checked}
                type="checkbox"
                className="size-6"
                id={`ck-${item.id}`} />
            <label htmlFor={`ck-${item.id}`} className="text-gray-500 text-lg">{item.label}</label>
        </div>
    )
}

export default CheckBoxInput