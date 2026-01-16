import React from 'react'

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
        <>
            {label && (
                <label htmlFor={name} className='mb-1'>{label}</label>
            )}

            <input name={name} className={`border rounded-sm border-gray-200 ${className}`} {...rest} />

            {error && (
                <p className='text-red-500 text-sm mt-2'>{error}</p>
            )}
        </>
    )
}
