"use client"

import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        console.error("App Error:", error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl font-bold mb-4">
                Ocorreu um erro 😕
            </h2>

            <p className="text-gray-500 mb-6">
                {error.message || "Erro inesperado"}
            </p>

            <button
                onClick={() => reset()}
                className="px-6 py-3 bg-blue-600 text-white rounded-sm hover:opacity-90"
            >
                Tentar novamente
            </button>
        </div>
    )
}
