import Link from 'next/link'
import Image from 'next/image'
import { Card, IconButton } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Dialog } from '@/components/Dialog'
import { User } from '@/services'

interface UserCardProps {
    user: User
    onDelete: () => void
}

export function UserCard({ user, onDelete }: UserCardProps) {

    const [openDialog, setOpenDialog] = useState(false)

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
                <div className="p-1 w-12flex items-center justify-center">
                    <IconButton onClick={() => setOpenDialog(true)}>
                        <TrashIcon width="18" height="18" />
                    </IconButton>
                    <Dialog
                        onClickActionButton={onDelete}
                        contentNode={
                            <>
                                <label className="">Click confirm to delete user</label>
                                <label className="font-bold pl-1">{name}</label>
                            </>

                        }
                        open={openDialog}
                        setOpen={setOpenDialog}
                        title='Delete User'
                        actionButtonLabel='Confirm'
                    />
                </div>
            </div>
        </Card>
    )
}