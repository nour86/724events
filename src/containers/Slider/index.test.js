import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Slider from './index'
import { api, DataProvider } from '../../contexts/DataContext'

const data = {
    focus: [
        {
            title: 'World aconomic forum',
            description:
                'Oeuvre à la coopération entre le secteur public et le privé.',
            date: '2022-02-29T20:28:45.744Z',
            cover: '/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png',
        },
        {
            title: 'World Gaming Day',
            description: 'Evenement mondial autour du gaming',
            date: '2022-03-29T20:28:45.744Z',
            cover: '/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png',
        },
        {
            title: 'World Farming Day',
            description: 'Evenement mondial autour de la ferme',
            date: '2022-01-29T20:28:45.744Z',
            cover: '/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png',
        },
    ],
}

describe('When slider is created', () => {
    it('a list card is displayed', async () => {
        act(() => {
            api.loadData = jest.fn().mockReturnValue(data)
            window.console.error = jest.fn()
            render(
                <DataProvider>
                    <Slider />
                </DataProvider>
            )
        })

        // testing a different field for each object supposed to render

        // title :

        const titleDisplayed = await screen.findByText('World aconomic forum')
        expect(titleDisplayed).toBeInTheDocument()

        // date :

        const dateDisplayed = await screen.findByText('janvier')
        expect(dateDisplayed).toBeInTheDocument()

        // description :

        const infoDisplayed = await screen.findByText(
            'Evenement mondial autour de la ferme'
        )
        expect(infoDisplayed).toBeInTheDocument()
    })
})
