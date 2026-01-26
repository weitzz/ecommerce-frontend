

type ProductsPageProps = {
    searchParams: {
        page?: string
    }
}

export const ProductsPage = ({ searchParams }: ProductsPageProps) => {
    const page = Number(searchParams.page ?? 1)
    const limit = 12
    return (
        <div>page</div>
    )
}
