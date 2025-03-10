import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@radix-ui/themes'
import { User } from '@/services'

interface UserCardProps {
    user: User
    actionsNode?: React.ReactNode
}

export function UserCard({ user, actionsNode }: UserCardProps) {

    const {
        id,
        imageUrl = '/images/user.svg',
        name,
        username,
        email,
        phone,
        website
    } = user

    return (
        <Card className='w-[300px] rounded-xl'>
            <div className="w-full h-36 flex items-end justify-center bg-violet-100">
                <Image
                    className=""
                    src={imageUrl}
                    width={140}
                    height={40}
                    alt="Picture of the user"
                    priority={true}
                />
            </div>
            <div className=" w-full p-1" >
                <div className="p-1 flex justify-start">
                    <div className="font-bold">Name:</div>
                    <div className="pl-1 truncate">{name}</div>
                </div>
                <div className="p-1 flex justify-start">
                    <div className="font-bold">Username:</div>
                    <div className="pl-1 truncate">{username}</div>
                </div>
                <div className="p-1 flex justify-start">
                    <div className="font-bold">E-mail:</div>
                    <div className="pl-1 truncate">{email}</div>
                </div>
                <div className="p-1 flex justify-start">
                    <div className="font-bold">Phone:</div>
                    <div className="pl-1 truncate">{phone}</div>
                </div>

                <div className="p-1 flex justify-start">
                    <div className="font-bold">Website:</div>
                    <div className="pl-1 truncate">{website}</div>
                </div>
            </div>
            <div className="bg-violet-100 w-full p-1 flex items-center justify-between" >
                <div className="p-1 hover:text-violet-800">
                    <Link href={`/users/${id}`}>See details</Link>
                </div>
                <div className="p-1 w-10 flex items-center justify-center">
                    {actionsNode && actionsNode}
                </div>
            </div>
        </Card>
    )
}