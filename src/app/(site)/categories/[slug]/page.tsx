import { getCategoryWithMetadata } from "@/actions/get-category-with-metadata"
import ProductFilter from "@/components/filter/product-filter"
import Link from "next/link"
import { redirect } from "next/navigation"

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>

}

export default async function Page({ params, searchParams }: Props) {
    const { slug } = await params
    const filters = await searchParams
    const categoryWithMetadata = await getCategoryWithMetadata(slug)

    if (!categoryWithMetadata) {
        redirect('/')
        return
    }

    return (
        <>

            <div className="text-gray-500 mb-4">
                <Link href={'/'}>Home</Link> &gt; {categoryWithMetadata.category.name}
            </div>
            <ProductFilter
                category={categoryWithMetadata.category}
                metadata={categoryWithMetadata.metadata}
                filters={filters} />
        </>
    );
}
