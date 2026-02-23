import { Toast } from "./toast-context"

export default function ToastComponent({ message, type }: Toast) {
    const baseStyle =
        "px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-slide-in"

    const variants = {
        success: "bg-green-600",
        error: "bg-red-600",
        warning: "bg-yellow-500 text-black",
    }

    return (
        <div className={`${baseStyle} ${variants[type]}`}>
            {message}
        </div>
    )
}
