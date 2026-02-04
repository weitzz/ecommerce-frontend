import { getProducts } from "@/actions/get-products"
import ProductList from "@/components/product/product-list"


type Props = {
    searchParams: Promise<{ query?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
    const { query } = await searchParams

    const products = await getProducts({
        search: query
    })
    console.log(products)

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">
                Resultados para "{query}"
            </h1>

            <ProductList list={products} />
        </div>
    )
}
