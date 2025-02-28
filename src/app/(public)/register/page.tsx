'use client'

import Link from 'next/link'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { Form } from 'radix-ui'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { User } from '@/services'
import { Dialog } from '@/components/Dialog'

interface UserFormData {
    name: string
    username: string
    email: string
    phone: string
    website: string
    imageUrl?: FileList
    city: string
    street: string
    zipcode: string
    companyName: string
}


interface StatusRegister {
    message: string
    action?: () => void
}

export default function Register() {

    const router = useRouter()
    const [openDialog, setOpenDialog] = useState(false)
    const [statusRegister, setStatusRegister] = useState<StatusRegister>({ message: '' })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserFormData>()

    const buildUser = (data: UserFormData, imageUrl?: string): User => ({
        id: uuidv4(),
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        website: data.website,
        imageUrl,
        address: {
            city: data.city,
            geo: { lat: '', lng: '' },
            street: data.street,
            suite: '',
            zipcode: data.zipcode
        },
        company: {
            bs: '',
            catchPhrase: '',
            name: data.companyName
        }
    })

    const handleSuccess = () => {
        setStatusRegister({
            message: 'User registered successfully',
            action: () => router.replace('/')
        })
        setOpenDialog(true)
    }

    const handleError = (message: string | unknown) => {
        console.log(message)
        setStatusRegister({ message: 'Failed register user' })
        setOpenDialog(true)
    }

    const onSubmit = (data: UserFormData) => {
        try {
            const storedUsers = localStorage.getItem('users')
            const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : []

            const file = data.imageUrl?.item(0)
            if (file) {
                const reader = new FileReader()
                reader.readAsDataURL(file)

                reader.onload = () => {
                    try {
                        const newUser = buildUser(data, reader.result as string)
                        parsedUsers.push(newUser)
                        localStorage.setItem('users', JSON.stringify(parsedUsers))
                        handleSuccess()
                    } catch (error) {
                        console.error('Erro ao salvar usuário com imagem:', error)
                        handleError(error)
                    }
                }

                reader.onerror = (error) => {
                    handleError(error)
                }

            } else {
                const newUser = buildUser(data)
                parsedUsers.push(newUser)
                localStorage.setItem('users', JSON.stringify(parsedUsers))
                handleSuccess()
            }

        } catch (error) {
            handleError(error)
        }
    }



    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-violet-100 p-4">
            <header className="pb-4 text-2xl text-violet-800 font-bold">Register</header>
            <main className="bg-white opacity-80 border border-gray-300 p-6 rounded-lg w-full max-w-md">
                <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <Form.Field name="name">
                        <div className="flex justify-between">
                            <Form.Label>Name</Form.Label>
                            {errors.name && <Form.Message className="text-red-500">{errors.name.message}</Form.Message>}
                        </div>
                        <Form.Control asChild>
                            <input
                                className="w-full p-1 border border-gray-300 rounded-md"
                                type="text"
                                {...register('name', { required: 'Please provide a name' })}
                            />
                        </Form.Control>
                    </Form.Field>

                    {/* Email */}
                    <Form.Field name="email">
                        <div className="flex justify-between">
                            <Form.Label>Email</Form.Label>
                            {errors.email && <Form.Message className="text-red-500">{errors.email.message}</Form.Message>}
                        </div>
                        <Form.Control asChild>
                            <input
                                className="w-full p-1 border border-gray-300 rounded-md"
                                type="email"
                                {...register('email', {
                                    required: 'Please enter your email',
                                    pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
                                })}
                            />
                        </Form.Control>
                    </Form.Field>

                    {/* Username */}
                    <Form.Field name="username">
                        <div className="flex justify-between">
                            <Form.Label>Username</Form.Label>
                            {errors.username && <Form.Message className="text-red-500">{errors.username.message}</Form.Message>}
                        </div>
                        <Form.Control asChild>
                            <input
                                className="w-full p-1 border border-gray-300 rounded-md"
                                type="text"
                                {...register('username', { required: 'Please enter your username' })}
                            />
                        </Form.Control>
                    </Form.Field>

                    {/* Phone */}
                    <Form.Field name="phone">
                        <div className="flex justify-between">
                            <Form.Label>Phone</Form.Label>
                            {errors.phone && <Form.Message className="text-red-500">{errors.phone.message}</Form.Message>}
                        </div>
                        <Form.Control asChild>
                            <input
                                className="w-full p-1 border border-gray-300 rounded-md"
                                type="tel"
                                {...register('phone', { required: 'Please enter your phone' })}
                            />
                        </Form.Control>
                    </Form.Field>

                    {/* Website */}
                    <Form.Field name="website">
                        <div className="flex justify-between">
                            <Form.Label>Website</Form.Label>
                            {errors.website && <Form.Message className="text-red-500">{errors.website.message}</Form.Message>}
                        </div>
                        <Form.Control asChild>
                            <input
                                className="w-full p-1 border border-gray-300 rounded-md"
                                type="url"
                                {...register('website', { required: 'Please enter your website' })}
                            />
                        </Form.Control>
                    </Form.Field>


                    {/* City */}
                    <Form.Field name="city">
                        <div className="flex justify-between">
                            <Form.Label>City</Form.Label>
                            {errors.city && <Form.Message className="text-red-500">{errors.city.message}</Form.Message>}
                        </div>
                        <Form.Control asChild>
                            <input
                                className="w-full p-1 border border-gray-300 rounded-md"
                                type="text"
                                {...register('city', { required: 'Please enter your city' })}
                            />
                        </Form.Control>
                    </Form.Field>


                    {/* Street */}
                    <Form.Field name="street">
                        <div className="flex justify-between">
                            <Form.Label>Street</Form.Label>
                            {errors.street && <Form.Message className="text-red-500">{errors.street.message}</Form.Message>}
                        </div>
                        <Form.Control asChild>
                            <input
                                className="w-full p-1 border border-gray-300 rounded-md"
                                type="text"
                                {...register('street', { required: 'Please enter your street' })}
                            />
                        </Form.Control>
                    </Form.Field>


                    {/* Zipcode */}
                    <Form.Field name="zipcode">
                        <div className="flex justify-between">
                            <Form.Label>Zipcode</Form.Label>
                            {errors.zipcode && <Form.Message className="text-red-500">{errors.zipcode.message}</Form.Message>}
                        </div>
                        <Form.Control asChild>
                            <input
                                className="w-full p-1 border border-gray-300 rounded-md"
                                type="text"
                                {...register('zipcode', { required: 'Please enter your zipcode' })}
                            />
                        </Form.Control>
                    </Form.Field>


                    {/* CompanyName */}
                    <Form.Field name="companyName">
                        <div className="flex justify-between">
                            <Form.Label>CompanyName</Form.Label>
                            {errors.companyName && <Form.Message className="text-red-500">{errors.companyName.message}</Form.Message>}
                        </div>
                        <Form.Control asChild>
                            <input
                                className="w-full p-1 border border-gray-300 rounded-md"
                                type="text"
                                {...register('companyName', { required: 'Please enter your company name' })}
                            />
                        </Form.Control>
                    </Form.Field>

                    {/* Image */}
                    <Form.Field name="image">
                        <div className="flex justify-between">
                            <Form.Label>Image</Form.Label>
                        </div>
                        <Form.Control asChild>
                            <input
                                className="w-full p-1 border border-gray-300 rounded-md"
                                type="file"
                                accept="image/*"
                                {...register('imageUrl')}
                            />
                        </Form.Control>
                    </Form.Field>

                    {/* Buttons */}
                    <div className="flex justify-between pt-2">
                        <Button>
                            <Link className="text-white" href="/">Go back</Link>
                        </Button>
                        <Button type="submit">Register</Button>
                    </div>
                </Form.Root>

                <Dialog
                    onClickActionButton={statusRegister.action}
                    contentNode={
                        <>
                            <label className="">{statusRegister.message}</label>
                        </>

                    }
                    open={openDialog}
                    setOpen={setOpenDialog}
                    title='Register user'
                    actionButtonLabel='Ok'
                />
            </main>
        </div>
    )
}