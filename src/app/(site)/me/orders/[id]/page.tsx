import { getOrderById } from "@/actions/get-order-by-id"
import { StatusBadge } from "@/components/order/status-badge"
import Image from "next/image"
import Link from "next/link"

type Props = {
    params: Promise<{ id: string }>
}

export default async function OrderDetailPage({ params }: Props) {
    const { id } = await params
    const orderId = Number(id)

    if (Number.isNaN(orderId)) {
        return <p>Pedido inválido.</p>
    }

    const result = await getOrderById(orderId)

    if (!result.success) {
        return <p>Pedido não encontrado.</p>
    }

    const order = result.data

    return (
        <section className="max-w-3xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">
                        Pedido #{order.id}
                    </h1>
                    <StatusBadge status={order.status} />
                </div>

                <Link
                    href="/me/orders"
                    className="text-sm text-blue-600 hover:underline"
                >
                    ← Voltar
                </Link>
            </div>

            <p className="text-sm text-gray-500 mb-6">
                Realizado em{" "}
                {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <div className="mb-8">
                <h2 className="font-semibold mb-2">
                    Endereço de entrega
                </h2>
                <p className="text-sm text-gray-700">
                    {order.address.street}, {order.address.number}<br />
                    {order.address.city} - {order.address.state}<br />
                    CEP {order.address.zipcode}
                </p>
            </div>

            <div className="mb-8">
                <h2 className="font-semibold mb-4">
                    Itens do pedido
                </h2>

                <ul className="flex flex-col gap-4">
                    {order.items.map(item => (
                        <li
                            key={item.productId}
                            className="flex gap-4 border rounded-sm p-4 bg-white border-gray-200"
                        >
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="rounded-sm object-cover"
                                />
                            )}

                            <div className="flex-1">
                                <p className="font-medium">
                                    {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {item.quantity} × R$ {item.price.toFixed(2)}
                                </p>
                            </div>

                            <p className="font-semibold">
                                R$ {(item.quantity * item.price).toFixed(2)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-t pt-4 border-gray-200">
                <div className="flex justify-between text-sm mb-1">
                    <span>Frete</span>
                    <span>R$ {order.shippingCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">R$ {order.totalPrice.toFixed(2)}</span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                    Entrega em até {order.shippingDays} dias úteis
                </p>
            </div>
        </section>
    )
}
