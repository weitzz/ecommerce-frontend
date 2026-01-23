import z from 'zod'

export const AddressSchema = z.object({
    zipcode: z.string().min(5, "O CEP deve ter no mínimo 5 caracteres"),
    street: z.string().min(1, "O logradouro é obrigatório"),
    number: z.string().min(1, "O número é obrigatório"),
    city: z.string().min(1, "A cidade é obrigatória"),
    state: z.string().min(2, "O estado é obrigatório"),
    country: z.string().min(1, "País obrigatório"),
    complement: z.string().optional(),
})