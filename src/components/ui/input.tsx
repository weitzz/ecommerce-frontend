import { cn } from "@/libs/utils"

type InputProps = {
    type?: string
    name: string
    value?: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    error?: string
    label?: string
    disabled?: boolean
    autoFocus?: boolean
}

export const Input = ({ label, error, className, name, ...rest }: InputProps) => {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
            )}

            <input
                id={name}
                name={name}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                className={cn(

                    'border border-gray-200  rounded-sm py-2 px-3 transition-colors outline-hidden ring-1',
                    error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500',
                    className,

                )}{...rest} />

            <div className="min-h-[1.25rem] mt-1 transition-all">
                {error && (
                    <p
                        id={`${name}-error`}
                        className="text-red-500 text-sm"
                    >
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}
