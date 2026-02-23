import Link from "next/link"

export default function MeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="max-w-6xl mx-auto p-6 flex gap-8">
            {/* Sidebar */}
            <aside className="w-64">
                <h2 className="font-bold text-lg mb-4">Minha conta</h2>

                <nav className="flex flex-col gap-2 text-sm">
                    <Link href="/me/orders" className="hover:underline">
                        Meus pedidos
                    </Link>
                    <Link href="/me/favorites" className="hover:underline">
                        Favoritos
                    </Link>
                    <Link href="/me/profile" className="hover:underline">
                        Meus dados
                    </Link>
                </nav>
            </aside>

            {/* Conteúdo */}
            <main className="flex-1">
                {children}
            </main>
        </section>
    )
}
