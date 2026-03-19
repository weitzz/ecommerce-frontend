import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import ProductFilter from "./product-filter"
import type { Category, CategoryMetadata } from "@/types/category"
import type { Product } from "@/types/products"

const mocks = vi.hoisted(() => ({
    getProductsMock: vi.fn(),
    queryStringGetMock: vi.fn(),
    queryStringSetMock: vi.fn()
}))

vi.mock("@/actions/get-products", () => ({
    getProducts: mocks.getProductsMock
}))

vi.mock("@/hooks/useQueryString", () => ({
    useQueryString: () => ({
        get: mocks.queryStringGetMock,
        set: mocks.queryStringSetMock
    })
}))

vi.mock("./filter-group", () => ({
    default: ({ name }: { name: string }) => <div>{name}</div>
}))

vi.mock("../product/product-item", () => ({
    default: ({ data }: { data: Product }) => <div>{data.name}</div>
}))

vi.mock("../product/product-grid-skeleton", () => ({
    default: () => <div>product-grid-skeleton</div>
}))

const category: Category = {
    slug: "camisas",
    name: "Camisas"
}

const metadata: CategoryMetadata[] = [
    {
        id: "size",
        name: "Tamanho",
        values: [
            { id: "p", label: "P" }
        ]
    }
]

const products: Product[] = [
    { id: 1, name: "Produto A", image: "/a.png", price: 10 },
    { id: 2, name: "Produto B", image: "/b.png", price: 20 }
]

const expectCountHeading = (value: string) => {
    expect(
        screen.getByRole("heading", {
            level: 2,
            name: (_name, element) => element?.textContent === value
        })
    ).toBeInTheDocument()
}

describe("ProductFilter", () => {
    beforeEach(() => {
        mocks.getProductsMock.mockReset()
        mocks.queryStringGetMock.mockReset()
        mocks.queryStringSetMock.mockReset()
        mocks.queryStringGetMock.mockReturnValue("views")
    })

    it("mostra loading e depois renderiza os produtos buscados", async () => {
        let resolveProducts: ((value: Product[]) => void) | undefined
        mocks.getProductsMock.mockReturnValue(
            new Promise<Product[]>(resolve => {
                resolveProducts = resolve
            })
        )

        render(
            <ProductFilter category={category} metadata={metadata} filters={{ color: "blue" }} />
        )

        expect(screen.getByText("product-grid-skeleton")).toBeInTheDocument()

        resolveProducts?.(products)

        expect(await screen.findByText("Produto A")).toBeInTheDocument()
        expect(screen.getByText("Produto B")).toBeInTheDocument()
        expectCountHeading("2 Produtos")
        expect(mocks.getProductsMock).toHaveBeenCalledWith({
            limit: 9,
            metadata: { color: ["blue"] },
            orderBy: "views"
        })
    })

    it("atualiza a query string quando o usuario altera a ordenacao", async () => {
        const user = userEvent.setup()
        mocks.getProductsMock.mockResolvedValue(products)

        render(
            <ProductFilter category={category} metadata={metadata} filters={{}} />
        )

        const select = screen.getByRole("combobox")
        await user.selectOptions(select, "selling")

        expect(mocks.queryStringSetMock).toHaveBeenCalledWith("order", "selling")
    })

    it("limpa a lista quando a busca falha", async () => {
        mocks.getProductsMock.mockRejectedValue(new Error("Falha"))
        const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})

        render(
            <ProductFilter category={category} metadata={metadata} filters={{ color: "green|black" }} />
        )

        await waitFor(() => {
            expectCountHeading("0 Produtos")
        })

        expect(screen.queryByText("product-grid-skeleton")).not.toBeInTheDocument()
        expect(screen.queryByText("Produto A")).not.toBeInTheDocument()

        errorSpy.mockRestore()
    })
})
