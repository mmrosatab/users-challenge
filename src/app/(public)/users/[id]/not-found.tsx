import { Button } from '@radix-ui/themes'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-violet-100">
            <div className="p-1 flex flex-col items-center justify-center">
                <div className="">Page not found!</div>
                <div className="pt-4">
                    <Button>
                        <Link href='/'>Go back</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}