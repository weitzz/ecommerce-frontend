import { getMe } from "@/actions/get-me"
import { redirect } from "next/navigation"

export default async function MePage() {
    const result = await getMe()
    console.log(result)

    if (!result.success) {
        // token inválido / expirado → middleware normalmente já bloqueia
        redirect("/login")
    }

    const { name, email } = result.data

    return (
        <main className="max-w-xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Meu perfil</h1>

            <div className="space-y-2">
                <p>
                    <strong>Nome:</strong>{" "}
                    {name ?? <span className="text-gray-500">Não informado</span>}
                </p>

                <p>
                    <strong>Email:</strong> {email}
                </p>

            </div>
        </main>
    )
}
