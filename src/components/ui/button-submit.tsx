
'use client'
import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
    label: string
    pendingLabel?: string
}

export function SubmitButton({ label,
    pendingLabel }: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 text-white py-2 rounded-sm cursor-pointer"
        >
            {pending ? pendingLabel ?? label : label}
        </button>
    )
}
