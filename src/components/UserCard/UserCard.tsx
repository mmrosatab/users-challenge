import { Card, IconButton } from '@radix-ui/themes'
import Image from 'next/image'
import { TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { User } from '@/services'

interface UserCardProps {
    user: User
    onDelete: () => void
}

export function UserCard({ user, onDelete }: UserCardProps) {

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
            <div className="w-full h-36 flex items-end justify-center bg-violet-200">
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
            <div className="bg-violet-200 w-full p-1 flex items-center justify-between" >
                <div className="p-1 hover:text-violet-800"><Link href={`/users/${id}`} >See details</Link></div>
                <div className="p-1 w-12flex items-center justify-center">
                    <IconButton onClick={onDelete}>
                        <TrashIcon width="18" height="18" />
                    </IconButton>
                </div>
            </div>
        </Card>
    )
}