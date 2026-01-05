'use client'
import { useAuthStore } from '@/store/auth'
import Link from 'next/link'
import React, { useState, useTransition } from 'react'
import z from 'zod'

const schema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})
type ErrorStructure = { email?: string; password?: string, form?: string }
const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState<ErrorStructure>({})
    const [pending, setPending] = useTransition()
    const authStore = useAuthStore(state => state)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // setErrors({})
        // const result = schema.safeParse(form)
        // if (!result.success) {
        //     const fieldErrors: ErrorStructure = {}
        //     result.error.errors.forEach(err => {
        //         const field = err.path[0] as keyof ErrorStructure
        //         fieldErrors[field] = err.message
        //     })
        //     setErrors(fieldErrors)
        //     return
        // }
        // setPending(true)
        // try {
        //     await authStore.login(form.email, form.password)
        // } catch (error: any) {
        //     setErrors({ form: error.message || 'Login failed' })
        // } finally {
        //     setPending(false)
        // }
    }

    return (
        <form onSubmit={handleSubmit} className='bg-white border border-gray-200 p-8 rounded-sm'>
            <h2 className='text-xl font-bold mb-4'>Login</h2>
            <div className='mb-4'>
                <label className='mb-1' htmlFor='email'>Email</label>
                <input
                    autoFocus
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className='w-full py-2 px-3 border rounded-sm border-gray-200'
                    disabled={pending}
                />
                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}

            </div>
            <div className='mb-4'>
                <label className='mb-1' htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className='w-full py-2 px-3 border rounded-sm border-gray-200'
                    disabled={pending}
                />
                {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}

            </div>
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-sm cursor-pointer' disabled={pending}>
                {pending ? 'Logging in...' : 'Login'}
            </button>
            {errors.form && <p className='text-red-500 text-sm mt-2'>{errors.form}</p>}
            <div className='text-center mt-4'>
                <Link href='/register' className='text-gray-500 text-sm'>Don't have an account? Register</Link>
            </div>
        </form>
    )
}

export default LoginForm