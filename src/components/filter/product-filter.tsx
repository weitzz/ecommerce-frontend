"use client"

import { useQueryString } from "@/hooks/useQueryString"
import { ChangeEvent, useState } from "react"
import FilterGroup from "./filter-group"
import { data } from "@/data"
import ProductItem from "../product/product-item"


const ProductFilter = () => {
    const [filterOpened, setFilterOpened] = useState(false)
    const queryString = useQueryString()
    const order = queryString.get('order') ?? 'views'
    const handleSelectChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        queryString.set('order', event.target.value)
    }
    return (
        <>
            <div className="flex flex-col md:flex-row  gap-6 justify-between items-start md:items-center">
                <h2 className="text-3xl"><strong>{data.products.length}</strong> Produtos</h2>
                <div className="w-full md:max-w-70 flex flex-row gap-5">
                    <select defaultValue={order}
                        onChange={handleSelectChanged}
                        className="h-14  flex flex-1 items-center px-6 bg-white border border-gray-200 rounded-sm text-gray-500">
                        <option value="views">Popularidade</option>
                        <option value="price">Por preço</option>
                        <option value="selling">Mais vendidos</option>
                    </select>
                    <div
                        onClick={() => setFilterOpened(!filterOpened)}
                        className="h-14 flex flex-1 md:hidden  items-center px-6 bg-white border border-gray-200 rounded-sm text-gray-500">Filtrar por</div>
                </div>
            </div>

            <section className="mt-8 flex flex-col md:flex-row gap-8">
                <div className={`flex-1 md:max-w-70 ${filterOpened ? "block" : "hidden"} md:block`}>
                    <FilterGroup id="tech" name="tecnologias" />
                    <FilterGroup id="color" name="Cores" />
                    <FilterGroup id="entendeu" name="Entendeu ?" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.products.map(item => (
                        <ProductItem key={item.id} data={item} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default ProductFilter