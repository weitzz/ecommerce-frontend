"use client"

import { useQueryString } from "@/hooks/useQueryString"
import { ChangeEvent, useEffect, useState, useTransition } from "react"
import FilterGroup from "./filter-group"
import ProductItem from "../product/product-item"
import { Category, CategoryMetadata } from "@/types/category"
import { Product } from "@/types/products"
import { getProducts } from "@/actions/get-products"
import { Order } from "@/types/order"
import ProductGridSkeleton from "../product/product-grid-skeleton"


type Props = {
    category: Category
    metadata: CategoryMetadata[]
    filters: any

}



const ProductFilter = ({ category, metadata, filters }: Props) => {
    const [filterOpened, setFilterOpened] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const queryString = useQueryString()
    const order: Order = queryString.get('order') as Order ?? 'views'

    const handleSelectChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        queryString.set('order', event.target.value)
    }

    const fetchProducts = async (filters: any) => {
        filters.order = undefined
        setLoading(true)
        setProducts(await getProducts({
            limit: 9,
            metadata: filters,
            orderBy: order,
        }))
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts(filters)
    }, [filters])

    console.log(products)
    return (
        <>
            <div className="flex flex-col md:flex-row  gap-6 justify-between items-start md:items-center">
                <h2 className="text-3xl"><strong>{products.length}</strong> Produto{products.length != 1 ? 's' : ''}</h2>
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
                    {metadata.map(item => (
                        <FilterGroup key={item.id} id={item.id} name={item.name} values={item.values} />

                    ))}

                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {loading &&
                        <ProductGridSkeleton />
                    }
                    {!loading && products.map(item => (
                        <ProductItem key={item.id} data={item} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default ProductFilter