import Link from "next/link"
import ProductList from "../product/product-list"
import { getProducts } from "@/actions/get-products"


export const MostViewedProducts = async () => {
    const products = await getProducts({ orderBy: 'views', limit: 4 })

    return (
        <div className="mt-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className=" text-2xl text-center md:text-left">Produtos mais vistos </h2>
                    <p className="text-gray-400 text-center md:text-left">Campeões de vizualização da nossa loja.</p>
                </div>
                <Link
                    href="/product?order=views"
                    className="hidden md:inline-block text-sm font-medium text-primary hover:underline"
                >
                    Ver mais →
                </Link>
            </div>

            <div className="mt-9">
                <ProductList list={products} />
            </div>

            <div className="mt-6 text-center md:hidden">
                <Link
                    href="/product?order=views"
                    className="inline-block px-6 py-2 border rounded-md text-sm font-medium hover:bg-gray-100"
                >
                    Ver mais
                </Link>
            </div>
        </div>
    )
}
