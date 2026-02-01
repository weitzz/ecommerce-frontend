'use client'

import { registerAction } from '@/actions/register'
import type { RegisterResponse } from '@/actions/register'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { useEffect, useActionState } from 'react'
import { SubmitButton } from '../ui/button-submit'


const initialState: RegisterResponse = { success: false, errors: {} }

const RegisterForm = () => {
    const router = useRouter()
    const [state, formAction] = useActionState(registerAction, initialState)


    useEffect(() => {
        if (state.success) {
            router.push("/login")
        }
    }, [state.success, router])


    return (
        <form action={formAction} className='bg-white border border-gray-200 p-8 rounded-sm'>
            <h2 className='text-xl font-bold mb-4'>Cadastro</h2>
            <div className='mb-4'>
                <Input
                    label='Nome'
                    autoFocus
                    type='text'
                    name='name'
                    className='w-full '
                    error={state.success ? undefined : state.errors?.fieldErrors?.name}
                />

            </div>
            <div className='mb-4'>
                <Input
                    label='Email'
                    type='email'
                    name='email'
                    className='w-full  '
                    error={state.success ? undefined : state.errors?.fieldErrors?.email}
                />

            </div>
            <div className='mb-4'>
                <Input
                    label='Senha'
                    type='password'
                    name='password'
                    className='w-full  '
                    error={state.success ? undefined : state.errors?.fieldErrors?.password}
                />

            </div>
            <div className='mb-4'>
                <Input
                    label='Confirmar Senha'
                    type='password'
                    name='confirmPassword'
                    className='w-full py-2 px-3'
                    error={state.success ? undefined : state.errors?.fieldErrors?.confirmPassword}
                />
            </div>
            <SubmitButton label="Cadastrar"
                pendingLabel="Criando conta..." />
            {!state.success && state.errors?.formError && (
                <p className="text-red-500 text-sm mt-2">
                    {state.errors.formError}
                </p>
            )}
            <div className='text-center mt-4'>
                <Link href='/login' className='text-blue-600 text-sm'>Já tem uma conta? Faça login</Link>
            </div>
        </form>
    )
}

export default RegisterForm