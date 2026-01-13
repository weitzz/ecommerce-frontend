import { Address } from '@/types/address'
import React, { startTransition, useState, useTransition } from 'react'
import z, { set } from 'zod'

const schema = z.object({
    zipcode: z.string().min(5, "O CEP deve ter no mínimo 5 caracteres"),
    street: z.string().min(1, "O logradouro é obrigatório"),
    number: z.string().min(1, "O número é obrigatório"),
    complement: z.string().optional(),
    city: z.string().min(1, "A cidade é obrigatória"),
    state: z.string().min(2, "O estado é obrigatório"),
})

type Props = {
    open: boolean
    onClose: () => void
    onAdd: (address: Address) => Promise<void>
}

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
    const [form, setForm] = useState<Address>(emptyAddress)
    const [errors, setErrors] = useState<string>('')
    const [pending, setPending] = useTransition()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const result = schema.safeParse(form)
        if (!result.success) {
            setErrors(result.error.issues[0]?.message || 'Preencha todos os campos corretamente')
            return
        }
        setErrors('')
        startTransition(async () => {
            try {
                await onAdd(form)
                setForm(emptyAddress)
            } catch (err: any) {
                setErrors(err.message || 'Erro ao salvar o endereço')
            }
        })
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    if (!open) return null
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
            <button disabled={pending} className='absolute top-2 right-4 text-4xl cursor-pointer text-white' onClick={onClose}>&times;</button>
            <div
                className='bg-white p-6 rounded w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-4'>Adicionar endereço</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <input
                        autoFocus
                        type='text'
                        name='zipcode'
                        placeholder='Digite o CEP'
                        value={form.zipcode}
                        onChange={handleChange}
                        className='w-full py-2 px-3 border rounded-sm border-gray-200'
                        disabled={pending}
                    />
                    {/* {errors.zipcode && <p className='text-red-500 text-sm mt-1'>{errors.zipcode}</p>} */}
                    <input

                        type='text'
                        name='street'
                        placeholder='Digite a Rua'
                        value={form.street}
                        onChange={handleChange}
                        className='w-full py-2 px-3 border rounded-sm border-gray-200'
                        disabled={pending}
                    />
                    <input

                        type='text'
                        name='number'
                        placeholder='Digite o número'
                        value={form.number}
                        onChange={handleChange}
                        className='w-full py-2 px-3 border rounded-sm border-gray-200'
                        disabled={pending}
                    />
                    <input

                        type='text'
                        name='city'
                        placeholder='Digite a Cidade'
                        value={form.city}
                        onChange={handleChange}
                        className='w-full py-2 px-3 border rounded-sm border-gray-200'
                        disabled={pending}
                    />
                    <input

                        type='text'
                        name='state'
                        placeholder='Digite o Estado'
                        value={form.state}
                        onChange={handleChange}
                        className='w-full py-2 px-3 border rounded-sm border-gray-200'
                        disabled={pending}
                    />
                    <input

                        type='text'
                        name='country'
                        placeholder='Digite o País'
                        value={form.country}
                        onChange={handleChange}
                        className='w-full py-2 px-3 border rounded-sm border-gray-200'
                        disabled={pending}
                    />
                    <input

                        type='text'
                        name='complement'
                        placeholder='Digite o Complemento'
                        value={form.complement}
                        onChange={handleChange}
                        className='w-full py-2 px-3 border rounded-sm border-gray-200'
                        disabled={pending}
                    />
                    <button type='submit'
                        className='w-full bg-blue-600 text-white p-4 rounded-sm cursor-pointer'
                        disabled={pending}>
                        {pending ? 'Salvando...' : 'Adicionar'}
                    </button>
                </form>
            </div>
        </div>
    )
}
