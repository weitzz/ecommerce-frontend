"use client"

import { useState } from "react"
import { ToastContext, Toast, ToastType } from "./toast-context"
import ToastComponent from "./toast"

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: ToastType = "success") => {
        const id = crypto.randomUUID()

        const newToast: Toast = { id, message, type }

        setToasts((prev) => [...prev, newToast])

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id))
        }, 3000)
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
                {toasts.map((toast) => (
                    <ToastComponent key={toast.id} {...toast} />
                ))}
            </div>
        </ToastContext.Provider>
    )
}
