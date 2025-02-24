import { notFound } from 'next/navigation'
import { fetchUsersDetails } from '@/services'

interface UserDetailsParams {
    params: Promise<{ id: string }>
}

export default async function UserDetails({ params }: UserDetailsParams) {

    const { id } = await params

    try {
        const user = await fetchUsersDetails(id)

        if (!user || !user.id) {
            return notFound()
        }

        return (
            <div>
                <h1>Detalhes do Usuário</h1>
                <p>Nome: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Telefone: {user.phone}</p>
            </div>
        )
    } catch (error) {
        console.log(error)
        return notFound()
    }
}
