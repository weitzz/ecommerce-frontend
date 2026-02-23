import { getFavorites } from "@/actions/get-favorites"
import ProductItem from "@/components/product/product-item"
import { Product } from "@/types/products"


export default async function FavoritesPage() {
    const result = await getFavorites()

    if (!result.success) {
        return <p className="text-red-500">Erro ao carregar favoritos.</p>
    }

    if (result.data.length === 0) {
        return (
            <p className="text-gray-500">
                Você ainda não favoritou nenhum produto.
            </p>
        )
    }

    return (
        <section className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">
                Meus favoritos
            </h1>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                {result.data.map(product => (
                    <ProductItem data={product as Product} key={product.id} />
                ))}
            </div>
        </section>
    )
}
