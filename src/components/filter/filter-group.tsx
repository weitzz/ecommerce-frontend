"use client"

import { useQueryString } from "@/hooks/useQueryString"
import { ChangeEvent, useState } from "react"
import CheckBoxInput from "./checkbox"
import Image from "next/image"
import { useMenuStore } from "@/store/menuStore"
type Props = {
    id: string
    name: string
}

const FilterGroup = ({ id, name }: Props) => {
    //const [opened, setOpened] = useState(true)
    const queryString = useQueryString()
    const order = queryString.get('order') ?? 'views'
    const { groups, toggleGroup } = useMenuStore()
    const opened = groups[id] ?? true

    const handleSelectChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        queryString.set('order', event.target.value)
    }
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 ">
                <h2 className="flex 1 font-bold text-xl">{name}</h2>
                <div onClick={() => toggleGroup(id)}
                    className="cursor-pointer size-8 flex justify-center items-center">
                    <Image
                        src={"/ui/arrow-left-s-line.png"} width={24} height={24} alt=""
                        className={`${opened ? "rotate-0" : "rotate-180"} transition-all `} />
                </div>
            </div>

            <div className={` overflow-y-hidden ${opened ? "max-h-96" : "max-h-0"} transition-all`}>
                <CheckBoxInput item={{ id: "1", label: "item 1" }} groupId={id} />
                <CheckBoxInput item={{ id: "2", label: "item 2" }} groupId={id} />
                <CheckBoxInput item={{ id: "3", label: "item 3" }} groupId={id} />
            </div>
        </div >
    )
}

export default FilterGroup