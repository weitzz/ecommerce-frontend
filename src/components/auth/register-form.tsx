'use client'

import { registerAction } from '@/actions/register'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { startTransition, useState, useTransition } from 'react'
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
    const [form, setForm] = useState({ email: '', password: '', name: '', confirmPassword: '' })
    const [errors, setErrors] = useState<Errors>({})
    const [pending, setPending] = useTransition()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setForm(form => ({ ...form, [name]: value }))
        setErrors(errors => ({ ...errors, fieldErrors: { ...errors.fieldErrors, [name]: undefined } }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        startTransition(async () => {
            const result = await registerAction(form)

            if (!result.success) {
                setErrors(result.errors ?? {})
                return
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
                <Input
                    label='Nome'
                    autoFocus
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    className='w-full py-2 px-3'
                    error={errors.fieldErrors?.name}
                    disabled={pending}
                />

            </div>
            <div className='mb-4'>
                <label className='mb-1' htmlFor='email'>Email</label>
                <Input
                    autoFocus
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    className='w-full py-2 px-3 '
                    error={errors.fieldErrors?.email}
                    disabled={pending}
                />

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
            <div className='mb-4'>
                <Input
                    label='Confirmar Senha'
                    type='password'
                    name='confirmPassword'
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className='w-full py-2 px-3'
                    error={errors.fieldErrors?.confirmPassword}
                    disabled={pending}
                />
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-sm cursor-pointer' disabled={pending}>
                {pending ? 'Registrando...' : 'Registrar'}
            </button>
            {errors.formError && (<p className='text-red-500 text-sm mt-2'>{errors.formError}</p>)}
            <div className='text-center mt-4'>
                <Link href='/login' className='text-gray-500 text-sm'>Já tem uma conta? Faça login</Link>
            </div>
        </form>
    )
}

export default RegisterForm