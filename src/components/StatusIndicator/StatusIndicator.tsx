import { ReloadIcon, BoxIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'

export enum Status {
    Loading = 'Loading',
    Error = 'Error',
    Empty = 'Empty'
}

interface StatusIndicatorProps {
    status: Status
    label: string
}

interface IndicatorProps {
    label: string
}

const Loading: React.FC<IndicatorProps> = ({ label }) => (
    <div className="">
        <ReloadIcon />
        <p className="mt-2 text-sm">{label}</p>
    </div>
)

const Error: React.FC<IndicatorProps> = ({ label }) => (
    <div className="">
        <ExclamationTriangleIcon className="" />
        <p className="mt-2 text-sm">{label}</p>
    </div>
)

const Empty: React.FC<IndicatorProps> = ({ label }) => (
    <div className="">
        <BoxIcon className="" />
        <p className="mt-2 text-sm">{label}</p>
    </div>
)

const indicatorComponents: Record<Status, React.FC<IndicatorProps>> = {
    [Status.Loading]: Loading,
    [Status.Error]: Error,
    [Status.Empty]: Empty
}

export function StatusIndicator({ status, label }: StatusIndicatorProps) {
    const Indicator = indicatorComponents[status]

    if (!Indicator) return null

    return (
        <div className="">
            <Indicator label={label} />
        </div>
    )
}
