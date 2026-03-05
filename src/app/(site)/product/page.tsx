import { getProducts } from "@/actions/get-products"
import ProductList from "@/components/product/product-list"
import Link from "next/link"

type Props = {
    searchParams: Promise<{
        order?: string
        page?: string
    }>
}

const getOrderConfig = (order?: string) => {
    if (order === "views") {
        return {
            orderBy: "views" as const,
            title: "Produtos Mais Vistos",
            description: "Os produtos com maior número de visualizações."
        }
    }

    if (order === "selling") {
        return {
            orderBy: "selling" as const,
            title: "Produtos Mais Vendidos",
            description: "Os produtos campeões de vendas da loja."
        }
    }

    return {
        orderBy: undefined,
        title: "Produtos",
        description: "Confira nossa lista de produtos."
    }
}

export default async function ProductPage({ searchParams }: Props) {
    const { order, page } = await searchParams
    const config = getOrderConfig(order)
    const pageNumber = Number(page ?? "1")
    const currentPage = Number.isFinite(pageNumber) && pageNumber > 0
        ? Math.floor(pageNumber)
        : 1
    const limit = 12

    const products = await getProducts({
        orderBy: config.orderBy,
        limit,
        page: currentPage
    })
    const hasNextPage = products.length === limit

    const buildPageHref = (targetPage: number) => {
        const params = new URLSearchParams()
        if (order) params.set("order", order)
        if (targetPage > 1) params.set("page", String(targetPage))
        const query = params.toString()
        return query ? `/product?${query}` : "/product"
    }

    return (
        <section>
            <h1 className="text-2xl font-bold">{config.title}</h1>
            <p className="text-gray-500 mt-1">{config.description}</p>

            <div className="mt-8">
                <ProductList list={products} />
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
                {currentPage > 1 ? (
                    <Link
                        href={buildPageHref(currentPage - 1)}
                        className="px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50"
                    >
                        Anterior
                    </Link>
                ) : (
                    <span className="px-4 py-2 border border-gray-200 text-gray-400 rounded-sm">
                        Anterior
                    </span>
                )}

                <span className="text-sm text-gray-600">
                    Página {currentPage}
                </span>

                {hasNextPage ? (
                    <Link
                        href={buildPageHref(currentPage + 1)}
                        className="px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50"
                    >
                        Próxima
                    </Link>
                ) : (
                    <span className="px-4 py-2 border border-gray-200 text-gray-400 rounded-sm">
                        Próxima
                    </span>
                )}
            </div>
        </section>
    )
}
