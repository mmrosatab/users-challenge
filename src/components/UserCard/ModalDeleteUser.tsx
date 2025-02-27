import { TrashIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Button, IconButton } from '@radix-ui/themes'
import { Dialog } from 'radix-ui'

interface ModalDeleteUserProps {
    label: string
    onDelete: () => void
}

export function ModalDeleteUser({ onDelete, label }: ModalDeleteUserProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <IconButton>
                    <TrashIcon width="18" height="18" />
                </IconButton>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed bg-black inset-0 opacity-75 flex flex-col items-center justify-center" />
                <Dialog.Content className="bg-gray-100 p-6 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[85vh]">
                    <Dialog.Title className="text-violet-800 font-bold">Delete user</Dialog.Title>
                    <Dialog.Description className="pt-8 flex">
                        <label className="">Click confirm to delete user</label>
                        <label className="font-bold pl-1">{label}</label>
                    </Dialog.Description>
                    <div
                        className='flex mt-6 justify-end'
                    >
                        <Dialog.Close asChild>
                            <Button className='hover:cursor-pointer hover:text-violet-800' onClick={onDelete}>Confirm</Button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button className="text-violet-800 absolute top-4 right-4 bg-violet-300 rounded-full p-1" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}