import { getOrders } from "@/actions/get-orders"
import Link from "next/link";
import { StatusBadge } from "@/components/order/status-badge";

export default async function MyOrdersPage() {
    const result = await getOrders()

    if (!result.success) {
        return <p className="text-red-500">Erro ao carregar pedidos</p>
    }
    if (result.data.length === 0) {
        return <p>Você ainda não realizou nenhum pedido.</p>
    }

    return (
        <section className="max-w-3xl mx-auto p6">
            <h1 className="text-2xl font-bold mb-6">Meus pedidos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {result.data.map(order => (
                    <div className="bg-white border border-gray-200 rounded-sm p-6" key={order.id}>
                        <p className="font-semibold">Pedido #{order.id}</p>
                        <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p>Status: <StatusBadge status={order.status} /></p>
                        <p className="font-bold">
                            Total: R$ {order.totalPrice.toFixed(2)}
                        </p>
                        <Link href={`/me/orders/${order.id}`} className="text-blue-600 font-bold">Ver detalhes</Link>

                    </div>
                ))}
            </div>
        </section>

    )
}
