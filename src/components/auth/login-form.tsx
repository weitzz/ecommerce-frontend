'use client'
import { loginAction } from '@/actions/login'
import { setAuthCookie } from '@/actions/set-auth-cookie'
import { useAuthStore } from '@/store/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { startTransition, useState, useTransition } from 'react'
import { Input } from '../ui/input'


type Errors = {
    fieldErrors?: {
        email?: string
        password?: string
    }
    formError?: string
}

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState<Errors>({})
    const [pending, setPending] = useTransition()
    const authStore = useAuthStore(state => state)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(form => ({ ...form, [e.target.name]: e.target.value }))
        setErrors(errors => ({ ...errors, fieldErrors: { ...errors.fieldErrors, [e.target.name]: undefined }, formError: undefined }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        startTransition(async () => {
            const result = await loginAction(form)
            if (!result.success) {
                setErrors(result.errors || {})
                return
            }
            if (result.token) {
                await setAuthCookie(result.token)
                authStore.setToken(result.token)
                redirect('/')
            }
        })
    }


    return (
        <form onSubmit={handleSubmit} className='bg-white border border-gray-200 p-8 rounded-sm'>
            <h2 className='text-xl font-bold mb-4'>Login</h2>
            <div className='mb-4'>
                <Input
                    label='Email'
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    className='w-full py-2 px-3'
                    error={errors.fieldErrors?.email}
                    disabled={pending} />

            </div>
            <div className='mb-4'>
                <Input
                    label='Senha'
                    type='password'
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                    className='w-full py-2 px-3 '
                    error={errors.fieldErrors?.password}
                    disabled={pending}
                />
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-sm cursor-pointer' disabled={pending}>
                {pending ? 'Logging in...' : 'Login'}
            </button>
            {errors.formError && (<p className='text-red-500 text-sm mt-2'>{errors.formError}</p>)}
            <div className='text-center mt-4'>
                <Link href='/register' className='text-gray-500 text-sm'>Não tem uma conta? Cadastre-se</Link>
            </div>
        </form>
    )
}

export default LoginForm