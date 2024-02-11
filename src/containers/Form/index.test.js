import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Form from './index'
import Field from '../../components/Field'

describe('When Form is created', () => {
    it('a list of fields is displayed', async () => {
        render(<Form />)
        await screen.findByText('Email')
        await screen.findByText('Nom')
        await screen.findByText('Prénom')
        await screen.findByText('Personel / Entreprise')
    })

    describe('and a click is triggered on the submit button', () => {
        it('the success action is called', async () => {
            const onSuccess = jest.fn()
            render(<Form onSuccess={onSuccess} />)
            fireEvent(
                await screen.findByTestId('button-test-id'),
                new MouseEvent('click', {
                    cancelable: true,
                    bubbles: true,
                })
            )
            await screen.findByText('En cours')
            await waitFor(() => screen.findByText('Envoyer'), { timeout: 2000 })
            expect(onSuccess).toHaveBeenCalled()
        })
    })

    describe('and a click is triggered on the submit button', () => {
        it('the Form fields are emptied', async () => {
            const onSuccess = jest.fn()
            render(
                <Form onSuccess={onSuccess}>
                    <Field label="message" value="ceci est un message" />
                </Form>
            )
            fireEvent(
                await screen.findByTestId('button-test-id'),
                new MouseEvent('click', {
                    cancelable: true,
                    bubbles: true,
                })
            )
            expect(
                screen.queryByText('ceci est un messsage')
            ).not.toBeInTheDocument()
        })
    })
})
