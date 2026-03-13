'use client'
import { loginAction } from '@/actions/login'
import type { LoginResponse } from '@/actions/login'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useActionState } from 'react'
import { Input } from '../ui/input'
import { SubmitButton } from '../ui/button-submit'
import { useAuthStore } from '@/store/auth'


const initialState: LoginResponse = { success: false, errors: {} }

const LoginForm = () => {
    const router = useRouter()
    const [state, formAction] = useActionState(loginAction, initialState)
    const setAuthenticated = useAuthStore(state => state.setAuthenticated)
    const setHydrated = useAuthStore(state => state.setHydrated)

    useEffect(() => {
        if (state.success) {
            setAuthenticated(true)
            setHydrated()
            router.replace("/")
            router.refresh()
        }
    }, [router, setAuthenticated, setHydrated, state.success])


    return (
        <form action={formAction} className='bg-white border border-gray-200 p-8 rounded-sm'>
            <h2 className='text-xl font-bold mb-4'>Login</h2>
            <div className='mb-4'>
                <Input
                    label='Email'
                    type='email'
                    name='email'
                    className='w-full'
                    error={state.success ? undefined : state.errors?.fieldErrors?.email}
                />

            </div>
            <div className='mb-4'>
                <Input
                    label='Senha'
                    type='password'
                    name='password'
                    className='w-full'
                    error={state.success ? undefined : state.errors?.fieldErrors?.password}
                />
            </div>
            <SubmitButton label="Login"
                pendingLabel="Entrando..." />
            {!state.success && state.errors?.formError && (
                <p className="text-red-500 text-sm mt-2">
                    {state.errors.formError}
                </p>
            )}
            <div className='text-center mt-4'>
                <Link href='/register' className='text-blue-600 text-sm'>Não tem uma conta? Cadastre-se</Link>
            </div>
        </form>
    )
}

export default LoginForm
