import { afterEach } from 'node:test'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { UserCard } from '@/components/UserCard'
import { User } from '@/services'

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

describe('UserCard component', () => {

    const pushMock = jest.fn()

    const user: User = {
        id: '1',
        name: 'Jane',
        email: 'janedevoe@gmail.com',
        phone: '123456789',
        username: 'janedevoe',
        website: 'janedevoeee.com.br',
        company: {
            bs: '',
            catchPhrase: '',
            name: 'Forbes'
        },
        address: {
            city: 'New York',
            geo: {
                lat: '1',
                lng: '1'
            },
            street: 'Garden',
            suite: '',
            zipcode: '123456789'
        }
    }

    afterEach(() => {
        jest.resetAllMocks()
    })

    test('Should render correctly', () => {
        render(
            <UserCard
                user={user}
            />
        )

        expect(screen.getByText('Jane')).toBeInTheDocument()
        expect(screen.getByText('janedevoe')).toBeInTheDocument()
        expect(screen.getByText('janedevoe@gmail.com')).toBeInTheDocument()
        expect(screen.getByText('123456789')).toBeInTheDocument()
        expect(screen.getByText('janedevoeee.com.br')).toBeInTheDocument()
    })


    test('Should render actionsNode', async () => {


        render(
            <UserCard
                user={user}
                actionsNode={(
                    <div>ActionNode</div>
                )}
            />
        )
        expect(screen.getByText('ActionNode')).toBeInTheDocument()
    })


    test('Should mount link to redirect correctly', async () => {

        (useRouter as jest.Mock).mockReturnValue({ push: pushMock })

        render(
            <UserCard
                user={user}
            />
        )
        const link = screen.getByRole('link', { name: /see details/i })
        expect(link).toHaveAttribute('href', '/users/1')
    })
})