import { Cross2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { AlertDialog } from 'radix-ui'

interface DialogProps {
    open: boolean
    title: string
    contentNode: React.ReactNode
    onClickActionButton?: () => void
    actionButtonLabel: string
    setOpen: (open: boolean) => void
}

export function Dialog({
    open = false,
    title,
    contentNode,
    actionButtonLabel,
    onClickActionButton,
    setOpen
}: DialogProps) {

    function handleClickConfirm() {

        if (onClickActionButton) {
            onClickActionButton()
        }

        setOpen(false)
    }

    return (
        <AlertDialog.Root open={open}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed bg-black inset-0 opacity-10 flex flex-col items-center justify-center" />
                <AlertDialog.Content className="bg-gray-100 p-6 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[85vh]">
                    <AlertDialog.Title className="text-violet-800 font-bold">{title}</AlertDialog.Title>
                    <AlertDialog.Description className="pt-8 flex">
                        {contentNode}
                    </AlertDialog.Description>
                    <div
                        className='flex mt-6 justify-end'
                    >
                        <AlertDialog.Action asChild>
                            <Button data-testid="action-btn" className='hover:cursor-pointer hover:text-violet-800' onClick={handleClickConfirm}>{actionButtonLabel}</Button>
                        </AlertDialog.Action>
                    </div>
                    <AlertDialog.Cancel asChild>
                        <button
                            data-testid="action-close-btn"
                            className="text-violet-800 absolute top-4 right-4 bg-violet-300 rounded-full p-1"
                            aria-label="Close"
                            onClick={() => setOpen(false)}
                        >
                            <Cross2Icon />
                        </button>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}