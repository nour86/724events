import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Home from './index'

describe('When Form is created', () => {
    it('a list of fields card is displayed', async () => {
        render(<Home />)
        await screen.findByText('Email')
        await screen.findByText('Nom')
        await screen.findByText('Prénom')
        await screen.findByText('Personel / Entreprise')
    })

    describe('and a click is triggered on the submit button', () => {
        it('the success message is displayed', async () => {
            render(<Home />)
            fireEvent(
                await screen.findByText('Envoyer'),
                new MouseEvent('click', {
                    cancelable: true,
                    bubbles: true,
                })
            )
            await screen.findByText('En cours')
            await waitFor(() => screen.findByText('Message envoyé !'), {
                timeout: 2000,
            })
        })
    })
})
describe('When a Page is created', () => {
    it('a list of events is displayed', async () => {
        // to implement
        render(<Home />)
        const events = screen.queryAllByTestId('card-image-testid').length
        expect(events).toBeGreaterThan(1)
    })
    it('a list a people is displayed', async () => {
        // to implement
        render(<Home />)
        const people = screen.queryAllByTestId('people-testid').length
        expect(people).toBeGreaterThan(1)
    })
    it('a footer is displayed', async () => {
        // to implement
        render(<Home />)
        await screen.findByTestId('footer-testid')
    })
    it('an event card, with the last event, is displayed', async () => {
        // to implement
        render(<Home />)
        // await(()=>{expect(screen.getByTestId("lastEvent-testid")).toBeInTheDocument();});
        await (() => {
            expect(screen.findByTestId('lastEvent-testid'))
        })
        // await(() => {
        //   expect(screen.getAllByTestId("lastEvent-testid")).toBeInTheDocument();
        // });
    })
})
