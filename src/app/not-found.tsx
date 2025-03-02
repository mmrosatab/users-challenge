import Image from 'next/image'

export default function NotFound() {
    return (
        <div className="h-screen w-screen overflow-x-hidden flex flex-col items-center bg-violet-100 pt-4 pb-4">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <Image
                    className=""
                    src="/images/not-found.svg"
                    width={100}
                    height={100}
                    alt="Page not found"
                    priority={true}
                />
                <div className="pt-4 font-bold">No data to show</div>
            </div>
        </div>
    )
}