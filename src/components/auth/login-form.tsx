'use client'
import { loginAction } from '@/actions/login'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Input } from '../ui/input'

type Errors = {
    fieldErrors?: {
        email?: string
        password?: string
    }
    formError?: string
}

const LoginForm = () => {
    const [error, setError] = useState<Errors | null>(null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()


    const handleSubmit = async (formData: FormData) => {
        setError(null)
        startTransition(async () => {
            const result = await loginAction({
                email: formData.get("email") as string,
                password: formData.get("password") as string
            })
            console.log(result)

            if (!result.success) {
                setError(result.errors ?? null)
                return
            }

            router.push("/")
        })
    }


    return (
        <form action={handleSubmit} className='bg-white border border-gray-200 p-8 rounded-sm'>
            <h2 className='text-xl font-bold mb-4'>Login</h2>
            <div className='mb-4'>
                <Input
                    label='Email'
                    type='email'
                    name='email'
                    className='w-full py-2 px-3'
                    disabled={isPending}
                    error={error?.fieldErrors?.email}
                />

            </div>
            <div className='mb-4'>
                <Input
                    label='Senha'
                    type='password'
                    name='password'
                    className='w-full py-2 px-3 '
                    disabled={isPending}
                    error={error?.fieldErrors?.password}
                />
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-sm cursor-pointer' disabled={isPending}>
                {isPending ? 'Logging in...' : 'Login'}
            </button>
            {error?.formError && (<p className='text-red-500 text-sm mt-2'>{error?.formError}</p>)}
            <div className='text-center mt-4'>
                <Link href='/register' className='text-gray-500 text-sm'>Não tem uma conta? Cadastre-se</Link>
            </div>
        </form>
    )
}

export default LoginForm