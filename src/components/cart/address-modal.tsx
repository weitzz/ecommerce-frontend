import { Address } from '@/types/address'
import { useEffect, useActionState } from 'react'
import { Input } from '../ui/input'
import { SubmitButton } from '../ui/button-submit'
import { AddAddressResponse, addUserAddress } from '@/actions/add-user-address'


type Props = {
    open: boolean
    onClose: () => void
    onSuccess: (addresses: Address[]) => void
}

const initialState: AddAddressResponse = {
    success: false,
    errors: {}
}

export const AddressModal = ({ open, onClose, onSuccess }: Props) => {
    const [state, formAction] = useActionState(addUserAddress, initialState)

    useEffect(() => {
        if (state.success) {
            onSuccess(state.data!)
            onClose()
        }

        if (!state.success && state.errors?.formError === "Faça login para adicionar um endereço") {
            onClose()
        }
    }, [state, onClose, onSuccess])

    useEffect(() => {
        if (open === false) return
    }, [open])

    if (!open) return null
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50 p-4'>
            <button className='absolute top-2 right-4 text-4xl cursor-pointer text-white' aria-label='Fechar' onClick={onClose}>&times;</button>
            <div className='bg-white p-6 rounded w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-4'>Adicionar endereço</h2>
                <form action={open ? formAction : undefined} className='flex flex-col gap-4'>
                    <Input
                        autoFocus
                        placeholder='Digite o CEP'
                        type='text'
                        name='zipcode'
                        className='w-full  '
                        error={state.success ? undefined : state.errors?.fieldErrors?.zipcode}
                    />
                    <div className='flex flex-col md:flex-row gap-2'>
                        <Input
                            placeholder='Digite a Rua'
                            type='text'
                            name='street'
                            className='w-full flex-1'
                            error={state.success ? undefined : state.errors?.fieldErrors?.street}
                        />
                        <Input
                            placeholder='Digite o número'
                            type='text'
                            name='number'
                            className='w-full flex-1'
                            error={state.success ? undefined : state.errors?.fieldErrors?.number}
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <Input
                            placeholder='Digite a Cidade'
                            type='text'
                            name='city'
                            className='w-full flex-1 '
                            error={state.success ? undefined : state.errors?.fieldErrors?.city}
                        />
                        <Input
                            placeholder='Digite o Estado'
                            type='text'
                            name='state'
                            className='w-full flex-1'
                            error={state.success ? undefined : state.errors?.fieldErrors?.state}
                        />
                    </div>
                    <Input
                        placeholder='Digite o País'
                        type='text'
                        name='country'
                        className='w-full  '
                        error={state.success ? undefined : state.errors?.fieldErrors?.country}
                    />
                    <Input
                        placeholder='Digite o Complemento'
                        type='text'
                        name='complement'
                        className='  '
                        error={state.success ? undefined : state.errors?.fieldErrors?.complement}
                    />

                    {!state.success && state.errors?.formError && (
                        <p className="text-red-500 text-sm mt-2">
                            {state.errors.formError}
                        </p>
                    )}
                    <div className='flex flex-col md:flex-row gap-2'>
                        <button type="button" className='w-full bg-gray-600 text-white p-4 rounded-sm cursor-pointer flex-1' onClick={onClose}>Voltar</button>
                        <SubmitButton label='Adicionar' pendingLabel='Salvando endereço...' />
                    </div>
                </form>
            </div>
        </div>
    )
}
