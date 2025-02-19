import axios from 'axios'

export interface User {
    id: number
    name: string
    username: string
    email: string
    phone: string
    website: string
    imageUrl?: string
    address: {
        city: string
        geo: {
            lat: string
            lng: string
        }
        street: string
        suite: string
        zipcode: string
    },
    company: {
        bs: string
        catchPhrase: string
        name: string
    }
}

export async function fetchUsers(): Promise<User[]> {
    const { data } = await axios.get('http://jsonplaceholder.typicode.com/users')
    return data
}