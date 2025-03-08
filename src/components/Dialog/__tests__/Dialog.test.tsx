import { render, screen } from '@testing-library/react'
import { Dialog } from '../Dialog'

describe('Dialog component', () => {

    const setOpenMock = jest.fn()

    test('Should render correctly', async () => {
        render(
            <Dialog
                open={true}
                setOpen={setOpenMock}
                title='My Dialog'
                contentNode={<>Content</>}
                actionNode={<>ActionNode</>}
            />
        )

        expect(screen.getByText('My Dialog')).toBeInTheDocument()
        expect(screen.getByText('Content')).toBeInTheDocument()
        expect(screen.getByText('ActionNode')).toBeInTheDocument()
    })


    test('Should call setOpen when click in close button ', () => {

        render(
            <Dialog
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