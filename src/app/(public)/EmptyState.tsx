import Image from 'next/image'

export const EmptyState: React.FC = () => (
    <div className="w-full h-full flex flex-col items-center justify-center">
        <Image
            className=""
            src="/images/empty-state.svg"
            width={100}
            height={100}
            alt="No data"
            priority={true}
        />
        <div className="pt-4 font-bold">No data to show</div>
    </div>
)