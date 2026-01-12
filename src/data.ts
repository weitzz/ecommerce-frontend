export const data = {
    banners: [
        { img: '/banners/banner-1.png', link: "" },
        { img: '/banners/banner-2.png', link: "" },
        { img: '/banners/banner-3.png', link: "" },
        { img: '/banners/banner-4.png', link: "" }
    ],
    products: [
        { id: 1, label: "Camisa PHP", price: 49.90, image: "/products/camiseta-php.png", liked: false },
        { id: 2, label: "Camisa NODE", price: 49.90, image: "/products/camiseta-node.png", liked: false },
        { id: 3, label: "Camisa REACT", price: 49.90, image: "/products/camiseta-react-azul.png", liked: false },
        { id: 4, label: "Camisa JS", price: 49.90, image: "/products/camiseta-js.png", liked: false },
    ],
    product: {

        id: 1,
        label: "Camisa PHP",
        images: ["/products/camiseta-php.png", "/products/camiseta-node.png"],
        price: 49.90,
        liked: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    addresses: [
        {
            id: 1,
            zipcode: "12345-678",
            street: "Rua Exemplo",
            number: "100",
            city: "São Paulo",
            state: "SP",

            country: "Brasil"
        },
        {
            id: 2,
            zipcode: "98765-432",
            street: "Avenida Teste",
            number: "200",
            city: "Rio de Janeiro",
            state: "RJ",
            complement: "Apto 101",
            country: "Brasil"
        },
        {
            id: 3,
            zipcode: "54321-987",
            street: "Travessa Demo",
            number: "300",
            city: "Belo Horizonte",
            state: "MG",
            country: "Brasil"
        }
    ]
}