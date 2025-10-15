import { data } from "@/data"
import ProductList from "../product-list"


export const MostSoldProducts = async () => {
    return (
        <div className="mt-10">
            <h2 className="text-2xl text-center md:text-left">Produtos mais vendidos</h2>
            <p className="text-gray-400 text-center md:text-left">Campeões de vizualização da nossa loja.</p>

            <div className="mt-9">
                <ProductList list={data.products} />
            </div>
        </div>
    )
}
