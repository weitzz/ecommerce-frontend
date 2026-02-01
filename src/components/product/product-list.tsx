import { Product } from "@/types/products"
import ProductItem from "./product-item"

type Props = {
    list: Product[]
}

function ProductList({ list }: Props) {

    console.log(list.data)
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {list.map(item => (
                <ProductItem key={item.id} data={item} />
            ))}
        </div>
    )
}

export default ProductList