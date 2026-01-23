import { AddressSchema } from '@/schemas/address'
import { Address } from '@/types/address'
import React, { useState, useTransition } from 'react'
import { Input } from '../ui/input'


type Props = {
    open: boolean
    onClose: () => void
    onAdd: (address: Address) => Promise<{ success: boolean; errors?: any }>
}

type Errors = {
    fieldErrors?: Partial<Record<keyof Address, string>>;
    formError?: string;
};

export const AddressModal = ({ open, onClose, onAdd }: Props) => {
    let emptyAddress: Address = {
        zipcode: '',
        street: '',
        number: '',
        city: '',
        state: '',
        country: '',
        complement: '',
    }
    const [error, setError] = useState<Errors | null>(null);
    const [isPending, startTransition] = useTransition();
    const handleSubmit = (formData: FormData) => {

        setError(null)

        const address: Address = {
            zipcode: (formData.get("zipcode") as string) || "",
            street: (formData.get("street") as string) || "",
            number: (formData.get("number") as string) || "",
            city: (formData.get("city") as string) || "",
            state: (formData.get("state") as string) || "",
            country: (formData.get("country") as string) || "",
            complement: (formData.get("complement") as string) || "",
        };

        const result = AddressSchema.safeParse(address)
        if (!result.success) {
            const fieldErrors: Errors["fieldErrors"] = {};
            result.error.issues.forEach(issue => {
                const key = issue.path[0] as keyof Address
                fieldErrors[key] = issue.message
            })
            setError({ fieldErrors })
            return
        }

        startTransition(async () => {
            try {
                const result = await onAdd(address);

                if (!result.success) {
                    setError(result.errors ?? { formError: "Erro ao salvar endereço" });
                    return;
                }
                onClose()

            } catch (err: any) {
                setError({ formError: err.message || "Erro ao salvar endereço" });
            }
        })
    }



    if (!open) return null
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50 p-4'>
            <button disabled={isPending} className='absolute top-2 right-4 text-4xl cursor-pointer text-white' onClick={onClose}>&times;</button>
            <div
                className='bg-white p-6 rounded w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-4'>Adicionar endereço</h2>
                <form action={handleSubmit} className='flex flex-col gap-4'>
                    <Input
                        autoFocus
                        placeholder='Digite o CEP'
                        type='text'
                        name='zipcode'
                        className='w-full  '
                        disabled={isPending}
                        error={error?.fieldErrors?.zipcode}
                    />
                    <div className='flex flex-col md:flex-row gap-2'>
                        <Input
                            placeholder='Digite a Rua'
                            type='text'
                            name='street'
                            className='w-full flex-1'
                            disabled={isPending}
                            error={error?.fieldErrors?.street}
                        />
                        <Input
                            placeholder='Digite o número'
                            type='text'
                            name='number'
                            className='w-full flex-1'
                            disabled={isPending}
                            error={error?.fieldErrors?.number}
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <Input
                            placeholder='Digite a Cidade'
                            type='text'
                            name='city'
                            className='w-full flex-1 '
                            disabled={isPending}
                            error={error?.fieldErrors?.city}
                        />
                        <Input
                            placeholder='Digite o Estado'
                            type='text'
                            name='state'
                            className='w-full flex-1'
                            disabled={isPending}
                            error={error?.fieldErrors?.state}
                        />
                    </div>
                    <Input
                        placeholder='Digite o País'
                        type='text'
                        name='country'
                        className='w-full  '
                        disabled={isPending}
                        error={error?.fieldErrors?.country}
                    />
                    <Input
                        placeholder='Digite o Complemento'
                        type='text'
                        name='complement'
                        className='  '
                        disabled={isPending}
                        error={error?.fieldErrors?.complement}
                    />
                    {error?.formError && (
                        <p className="text-red-500 text-sm">{error.formError}</p>
                    )}
                    <div className='flex flex-col md:flex-row gap-2'>

                        <button type="button" className='w-full bg-gray-600 text-white p-4 rounded-sm cursor-pointer flex-1' onClick={onClose}>Voltar</button>
                        <button type='submit'
                            className='w-full bg-blue-600 text-white p-4 rounded-sm cursor-pointer flex-1'
                            disabled={isPending}>
                            {isPending ? 'Salvando...' : 'Adicionar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
