type OrderStatus = "PENDING" | "PAID" | "CANCELED"

type Props = {
    status: OrderStatus
}

const statusMap: Record<
    OrderStatus,
    { label: string; className: string, icon: string }
> = {
    PENDING: {
        label: "Pendente",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: "⏳",
    },
    PAID: {
        label: "Pago",
        className: "bg-green-100 text-green-800 border-green-200",
        icon: "✅",
    },
    CANCELED: {
        label: "Cancelado",
        className: "bg-red-100 text-red-800 border-red-200",
        icon: "❌",
    },
}

export function StatusBadge({ status }: Props) {
    const config = statusMap[status]

    if (!config) return null

    return (
        <span
            className={`
        inline-flex items-center
        px-3 py-1
        rounded-full
        text-xs font-medium
        border
        ${config.className}
      `}
        >
            {config.icon}  {config.label}
        </span>
    )
}
