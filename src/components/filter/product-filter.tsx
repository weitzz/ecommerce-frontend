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
import { SelectFilter } from "./select-filter"


type Props = {
    category: Category
    metadata: CategoryMetadata[]
    filters: any

}

const ORDER_OPTIONS = [
    { value: 'views', label: 'Popularidade' },
    { value: 'price', label: 'Menor Preço' },
    { value: 'selling', label: 'Mais Vendidos' },
]



const ProductFilter = ({ category, metadata, filters }: Props) => {
    const [filterOpened, setFilterOpened] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const queryString = useQueryString()
    const order: Order = (queryString.get('order') as Order) ?? 'views'

    const handleSelectChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        queryString.set('order', value)
    }
    const normalizeFilters = (filters: any) => {
        const metadata: Record<string, string[]> = {}

        for (const key in filters) {
            if (key === 'order') continue;

            const value = filters[key]
            if (!value) continue

            if (Array.isArray(value)) {
                metadata[key] = value
            } else {
                metadata[key] = value.split('|')
            }
        }

        return metadata
    }

    const fetchProducts = async (filters: any) => {
        const metadata = normalizeFilters(filters)

        setLoading(true)
        console.log("Filtros enviados:", metadata, order)
        const result = await getProducts({
            limit: 9,
            metadata: metadata,
            orderBy: order
        })

        setProducts(result)
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts(filters)
    }, [filters, order])


    console.log(metadata)
    return (
        <>
            <div className="flex flex-col md:flex-row  gap-6 justify-between items-start md:items-center">
                <h2 className="text-3xl"><strong>{products.length}</strong> Produto{products.length != 1 ? 's' : ''}</h2>
                <div className="w-full md:max-w-70 flex flex-row gap-5">
                    <SelectFilter options={ORDER_OPTIONS} value={order} onChange={handleSelectChanged} />

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