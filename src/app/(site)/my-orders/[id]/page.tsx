import { getOrderById } from "@/actions/get-order-by-id"
import { StatusBadge } from "@/components/order/status-badge"
import { OrderDetail } from "@/types/order-details"
import Image from "next/image"
import Link from "next/link"

type Props = {
    params: { id: string }
}

export default async function MyOrderDetailPage({ params }: Props) {
    const orderId = Number(params.id)

    if (Number.isNaN(orderId)) {
        return <p>Pedido inválido.</p>
    }

    const result = await getOrderById(orderId)

    if (!result.success) {
        return <p>Pedido não encontrado.</p>
    }

    const order = result.data

    console.log(order)
    return (
        <section className="max-w-3xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">
                        Pedido #{order.id}
                    </h1>
                    <StatusBadge status={order.status} />
                </div>

                <Link
                    href="/my-orders"
                    className="text-sm text-blue-600 hover:underline"
                >
                    ← Voltar
                </Link>
            </div>

            <p className="text-sm text-gray-500 mb-6">
                Realizado em{" "}
                {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {/* Endereço */}
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

            {/* Itens */}
            <div className="mb-8">
                <h2 className="font-semibold mb-4">
                    Itens do pedido
                </h2>

                <ul className="flex flex-col gap-4">
                    {order.items.map(item => (
                        <li
                            key={item.productId}
                            className="flex gap-4 border rounded-sm p-4"
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

            {/* Resumo */}
            <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-1">
                    <span>Frete</span>
                    <span>R$ {order.shippingCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>R$ {order.totalPrice.toFixed(2)}</span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                    Entrega em até {order.shippingDays} dias úteis
                </p>
            </div>
        </section>
    )
}
