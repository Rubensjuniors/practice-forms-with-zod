import { useForm } from 'react-hook-form';
import { Input } from './Input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const RegisterFormSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, {
    message: "Invalid CPF format. Use 000.000.000-00 or 00000000000",
  }),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, {
    message: "Invalid zip code. The format must be 00000-000 or 00000000.",
  }).min(9),
  city: z.string().nonempty(),
  neighborhood: z.string().nonempty(),
  number: z.string().optional(),
  phone: z.string().nonempty(),
  state: z.string().nonempty(),
  street: z.string().nonempty(),
})

type TypeRegisterFormSchema = z.infer<typeof RegisterFormSchema>

export function RegistrationForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TypeRegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema)
  })

  const handleFormRegister = (data: TypeRegisterFormSchema) => {
    console.log(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormRegister)} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Formulário de Cadastro</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="FirstName"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="LastName"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="CPF"
        maxLength={14}
        {...register('cpf')}
        error={errors.cpf?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="CEP"
          maxLength={9}
          {...register('cep')}
          error={errors.cep?.message}
        />
        <Input
          label="Number"
          {...register('number')}
          error={errors.number?.message}
        />
      </div>

      <Input
        label="Street"
        {...register('street')}
        error={errors.street?.message}
      />

      <Input
        label="Neighborhood"
        {...register('neighborhood')}
        error={errors.neighborhood?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="State"
          {...register('state')}
          error={errors.state?.message}
        />
        <Input
          label="City"
          {...register('city')}
          error={errors.city?.message}
        />
      </div>

      <Input
        label="Phone"
        {...register('phone')}
        maxLength={15}
        error={errors.phone?.message}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-6"
      >
        Cadastrar
      </button>
    </form>
  );
}