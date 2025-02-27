'use client'

import { useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import { Button, Card, Spinner } from '@radix-ui/themes'
import Link from 'next/link'
import { User } from '@/services'


export default function UserDetails() {

    const params = useParams()
    const { id } = params
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        try {
            const storedUsers = localStorage.getItem('users')
            const parsedUsers = storedUsers ? JSON.parse(storedUsers) : []

            if (parsedUsers?.length === 0) {
                return notFound()
            }

            const user = parsedUsers.find((item: User) => Number(item.id) == Number(id))

            if (!user || !user.id) {
                return notFound()
            }

            setUser(user)

        } catch (error) {
            console.log(error)
            return notFound()
        }
    }, [id])

    if (!user) {
        return (
            <div className='w-screen h-screen bg-violet-100 flex items-center justify-center'>
                <div className="flex flex-col items-center justify-center">
                    <Spinner size="3" className='text-violet-800' />
                    <div className="text-violet-800 pt-2">Loading ...</div>
                </div>
            </div>
        )
    }

    const {
        imageUrl = '../images/user.svg',
        name,
        username,
        email,
        phone,
        website,
        address,
        company,
    } = user

    const { city, street, zipcode } = address

    const { name: companyName, } = company


    return (
        <div className='w-screen h-screen flex flex-col items-center bg-violet-100 pt-16'>
            <Card className='w-full sm:w-[500px] rounded-xl'>
                <div className="flex flex-col w-full justify-around sm:flex-row">
                    <div className="w-full sm:w-[300px] h-54 flex items-end justify-center bg-violet-200">
                        <Image
                            className=""
                            src={imageUrl}
                            width={140}
                            height={40}
                            alt="Picture of the user"
                            priority={true}
                        />
                    </div>
                    <div className="w-full pt-2 sm:pl-4 sm:pt-0" >
                        <div className="sm:pl-2 flex justify-start">
                            <div className="font-bold">Name:</div>
                            <div className="pl-1 truncate">{name}</div>
                        </div>
                        <div className="sm:pl-2 flex justify-start">
                            <div className="font-bold">Username:</div>
                            <div className="pl-1 truncate">{username}</div>
                        </div>
                        <div className="sm:pl-2 flex justify-start">
                            <div className="font-bold">E-mail:</div>
                            <div className="pl-1 truncate">{email}</div>
                        </div>
                        <div className="sm:pl-2 flex justify-start">
                            <div className="font-bold">Phone:</div>
                            <div className="pl-1 truncate">{phone}</div>
                        </div>

                        <div className="sm:pl-2 flex justify-start">
                            <div className="font-bold">Website:</div>
                            <div className="pl-1 truncate">{website}</div>
                        </div>

                        <div className="sm:pl-2 flex justify-start">
                            <div className="font-bold">City:</div>
                            <div className="pl-1 truncate">{city}</div>
                        </div>

                        <div className="sm:pl-2 flex justify-start">
                            <div className="font-bold">Street:</div>
                            <div className="pl-1 truncate">{street}</div>
                        </div>

                        <div className="sm:pl-2 flex justify-start">
                            <div className="font-bold">Zipcode:</div>
                            <div className="pl-1 truncate">{zipcode}</div>
                        </div>

                        <div className="sm:pl-2 flex justify-start">
                            <div className="font-bold truncate">Company Name:</div>
                            <div className="pl-1 truncate">{companyName}</div>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="w-full pt-10 flex justify-center">
                <Button><Link href='/'>Go back</Link></Button>
            </div>
        </div>
    )

}
