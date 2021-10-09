import React, { memo } from 'react'
import { PropsCard } from '../types/types'
import styles from '../../styles/components/Card.module.css'


function CardComponent({ cardInformation }: PropsCard) {



    return (
        <div className={styles.containerCardAplication} style={{ backgroundImage: `linear-gradient( to top, var(--background) 25%, transparent 75%), url('${cardInformation.gameImgURL.replace('capsule_sm_120', 'header')}')` }}>
            <span>{cardInformation.desconto}</span>
            <div className={styles.cardAplication} >
                <a href={cardInformation.urlGameSteam} target="_blank" rel="noreferrer">
                    <div className={styles.informationGame}>
                        <p style={{ fontSize: '0.8rem' }}>{cardInformation.gameName}</p>
                    </div>
                    <div className={styles.price}>
                        <span style={{ textDecoration: 'line-through', fontSize: '0.7rem' }}>{cardInformation.precAnterior}</span>
                        <span style={{ fontSize: '1rem' }}>{cardInformation.precAtual}</span>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default memo(CardComponent)