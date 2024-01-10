import { useEffect, useState, useMemo } from 'react'
import { useData } from '../../contexts/DataContext'
import { getMonth } from '../../helpers/Date'

import './style.scss'

const Slider = () => {
    const { data } = useData()
    const [index, setIndex] = useState(0)

    // byDateDesc runs only once

    const byDateDesc = useMemo(
        () =>
            data &&
            [...data.focus].sort((evtA, evtB) =>
                new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
            ),
        [data]
    )

    useEffect(() => {
        const nextCard = setInterval(() => {
            setIndex(index < byDateDesc.length - 1 ? index + 1 : 0)
        }, 5000)
        return () => clearInterval(nextCard)
    })

    // old version :

    // const nextCard = () => {
    //     setTimeout(
    //         () => setIndex(index < byDateDesc.length ? index + 1 : 0),
    //         5000
    //     )
    // }
    // useEffect(() => {
    //     nextCard()
    // })

    return (
        <div className="SlideCardList">
            {byDateDesc?.map((event, idx) => (
                <div
                    key={event.title}
                    className={`SlideCard SlideCard--${
                        index === idx ? 'display' : 'hide'
                    }`}
                >
                    <img src={event.cover} alt="forum" />
                    <div className="SlideCard__descriptionContainer">
                        <div className="SlideCard__description">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <div>{getMonth(new Date(event.date))}</div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="SlideCard__paginationContainer">
                <div className="SlideCard__pagination">
                    {/* radioIdx */}
                    {byDateDesc?.map((_, radioIdx) => (
                        <input
                            key={`input-${radioIdx + 1}-${_.title}`}
                            type="radio"
                            name="radio-button"
                            checked={index === radioIdx}
                            readOnly
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slider
