import { render, screen } from '@testing-library/react'
import { Dialog } from '../Dialog'

describe('Dialog component', () => {

    const setOpenMock = jest.fn()
    const onClickActionButtonMock = jest.fn()

    test('Should render correctly', () => {
        render(
            <Dialog
                actionButtonLabel='Action'
                open={true}
                setOpen={setOpenMock}
                title='My Dialog'
                contentNode={<>Content</>}
            />
        )

        expect(screen.getByText('Action')).toBeInTheDocument()
        expect(screen.getByText('My Dialog')).toBeInTheDocument()
        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    test('Should call onClickActionButton when click in action button ', () => {

        render(
            <Dialog
                actionButtonLabel='Action'
                open={true}
                setOpen={setOpenMock}
                title='My Dialog'
                contentNode={<>Content</>}
                onClickActionButton={onClickActionButtonMock}
            />
        )

        screen.getByTestId('action-btn').click()
        expect(onClickActionButtonMock).toHaveBeenCalled()
    })

    test('Should call setOpen after click in action button ', () => {
        render(
            <Dialog
                actionButtonLabel='Action'
                open={true}
                setOpen={setOpenMock}
                title='My Dialog'
                contentNode={<>Content</>}
            />
        )

        screen.getByTestId('action-btn').click()
        expect(setOpenMock).toHaveBeenCalled()
    })

    test('Should call setOpen when click in close button ', () => {

        render(
            <Dialog
                actionButtonLabel='Action'
                open={true}
                setOpen={setOpenMock}
                title='My Dialog'
                contentNode={<>Content</>}
            />
        )

        screen.getByTestId('action-close-btn').click()
        expect(setOpenMock).toHaveBeenCalled()
    })
})