import React from 'react'
import styles from '../../styles/components/TopSellers.module.css'
import CardComponent from './Card'
import defaltCardsData from '../pages/api/lib/gamesWithDiscounts.json'

export default function TopSellers() {
    return (
        <div className={styles.main}>
            <h3>Os Mais vendidos</h3>
            <div className={styles.cardCarroussel}>
                {
                    defaltCardsData.map((cardData, indice) => {
                        return (
                            <CardComponent
                                key={indice}
                                cardInformation={cardData}
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}
