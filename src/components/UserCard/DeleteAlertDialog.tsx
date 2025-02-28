import { TrashIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Button, IconButton } from '@radix-ui/themes'
import { AlertDialog } from 'radix-ui'

interface DeleteAlertDialogProps {
    label: string
    onDelete: () => void
}

export function DeleteAlertDialog({ onDelete, label }: DeleteAlertDialogProps) {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <IconButton>
                    <TrashIcon width="18" height="18" />
                </IconButton>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed bg-black inset-0 opacity-75 flex flex-col items-center justify-center" />
                <AlertDialog.Content className="bg-gray-100 p-6 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[85vh]">
                    <AlertDialog.Title className="text-violet-800 font-bold">Delete user</AlertDialog.Title>
                    <AlertDialog.Description className="pt-8 flex">
                        <label className="">Click confirm to delete user</label>
                        <label className="font-bold pl-1">{label}</label>
                    </AlertDialog.Description>
                    <div
                        className='flex mt-6 justify-end'
                    >
                        <AlertDialog.Action asChild>
                            <Button className='hover:cursor-pointer hover:text-violet-800' onClick={onDelete}>Confirm</Button>
                        </AlertDialog.Action>
                    </div>
                    <AlertDialog.Cancel asChild>
                        <button className="text-violet-800 absolute top-4 right-4 bg-violet-300 rounded-full p-1" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}