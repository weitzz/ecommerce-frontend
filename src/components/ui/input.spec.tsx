import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createElement } from 'react'
import { Input } from './input'

describe('Input', () => {
    it('renderiza o label e o estado de erro', () => {
        render(createElement(Input, {
            name: 'email',
            label: 'Email',
            error: 'Campo obrigatorio'
        }))

        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByText('Campo obrigatorio')).toBeInTheDocument()
        expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
    })
})
