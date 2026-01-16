'use client'

import { registerAction } from '@/actions/register'
import { useAuthStore } from '@/store/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { startTransition, useState, useTransition } from 'react'
import { RegisterSchema } from '@/schemas/register'


type ErrorStructure = {
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    form?: string
}
const RegisterForm = () => {
    const [form, setForm] = useState({ email: '', password: '', name: '', confirmPassword: '' })
    const [errors, setErrors] = useState<ErrorStructure>({})
    const [pending, setPending] = useTransition()
    const authStore = useAuthStore(state => state)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(form => ({ ...form, [e.target.name]: e.target.value }))
        setErrors(errors => ({ ...errors, [e.target.name]: undefined, form: undefined }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        const result = RegisterSchema.safeParse(form)
        if (!result.success) {
            const fieldErrors: any = {}
            result.error.issues.forEach(err => {
                if (err.path[0]) {
                    fieldErrors[err.path[0]] = err.message
                }

            })
            setErrors(fieldErrors)
            return
        }
        setErrors({})
        startTransition(async () => {
            const res = await registerAction(form)
            if (res.error) {
                setErrors({ form: res.error })
            }
            else {

                redirect('/login')
            }
        })
    }


    return (
        <form onSubmit={handleSubmit} className='bg-white border border-gray-200 p-8 rounded-sm'>
            <h2 className='text-xl font-bold mb-4'>Cadastro</h2>
            <div className='mb-4'>
                <label className='mb-1' htmlFor='name'>Nome</label>
                <input
                    autoFocus
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    className='w-full py-2 px-3 border rounded-sm border-gray-200'
                    disabled={pending}
                />
                {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}

            </div>
            <div className='mb-4'>
                <label className='mb-1' htmlFor='email'>Email</label>
                <input
                    autoFocus
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    className='w-full py-2 px-3 border rounded-sm border-gray-200'
                    disabled={pending}
                />
                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}

            </div>
            <div className='mb-4'>
                <label className='mb-1' htmlFor='password'>Senha</label>
                <input
                    type='password'
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                    className='w-full py-2 px-3 border rounded-sm border-gray-200'
                    disabled={pending}
                />
                {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}

            </div>
            <div className='mb-4'>
                <label className='mb-1' htmlFor='confirmPassword'>Confirmar Senha</label>
                <input
                    type='password'
                    name='confirmPassword'
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className='w-full py-2 px-3 border rounded-sm border-gray-200'
                    disabled={pending}
                />
                {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>}

            </div>
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-sm cursor-pointer' disabled={pending}>
                {pending ? 'Registrando...' : 'Registrar'}
            </button>
            {errors.form && <p className='text-red-500 text-sm mt-2'>{errors.form}</p>}
            <div className='text-center mt-4'>
                <Link href='/login' className='text-gray-500 text-sm'>Já tem uma conta? Faça login</Link>
            </div>
        </form>
    )
}

export default RegisterForm