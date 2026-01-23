'use client'

import { registerAction } from '@/actions/register'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Input } from '../ui/input'


type Errors = {
    fieldErrors?: {
        name?: string
        email?: string
        password?: string
        confirmPassword?: string
    }
    formError?: string
}
const RegisterForm = () => {
    const [error, setError] = useState<Errors | null>(null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()




    const handleSubmit = async (formData: FormData) => {
        setError(null)
        startTransition(async () => {
            const result = await registerAction({
                name: formData.get('name') as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                confirmPassword: formData.get("confirmPassword") as string
            })

            if (!result.success) {
                setError(result.errors ?? null)
                return
            }
            else {

                router.push("/login")
            }
        })
    }


    return (
        <form action={handleSubmit} className='bg-white border border-gray-200 p-8 rounded-sm'>
            <h2 className='text-xl font-bold mb-4'>Cadastro</h2>
            <div className='mb-4'>
                <Input
                    label='Nome'
                    autoFocus
                    type='text'
                    name='name'
                    className='w-full '
                    disabled={isPending}
                    error={error?.fieldErrors?.name}
                />

            </div>
            <div className='mb-4'>
                <Input
                    label='Email'
                    type='email'
                    name='email'
                    className='w-full  '
                    disabled={isPending}
                    error={error?.fieldErrors?.email}
                />

            </div>
            <div className='mb-4'>
                <Input
                    label='Senha'
                    type='password'
                    name='password'
                    className='w-full  '
                    disabled={isPending}
                    error={error?.fieldErrors?.password}
                />

            </div>
            <div className='mb-4'>
                <Input
                    label='Confirmar Senha'
                    type='password'
                    name='confirmPassword'
                    className='w-full py-2 px-3'
                    disabled={isPending}
                    error={error?.fieldErrors?.confirmPassword}
                />
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-sm cursor-pointer' disabled={isPending}>
                {isPending ? 'Registrando...' : 'Registrar'}
            </button>
            {error?.formError && (<p className='text-red-500 text-sm mt-2'>{error?.formError}</p>)}
            <div className='text-center mt-4'>
                <Link href='/login' className='text-gray-500 text-sm'>Já tem uma conta? Faça login</Link>
            </div>
        </form>
    )
}

export default RegisterForm