"use client"

import { createContext, useContext } from "react"

export type ToastType = "success" | "error" | "warning"

export interface Toast {
    id: string
    message: string
    type: ToastType
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

export const useToast = () => {
    const context = useContext(ToastContext)

    if (!context) {
        throw new Error("useToast must be used inside ToastProvider")
    }

    return context
}
