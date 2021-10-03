import React, { memo } from 'react'
import { PropsCard } from '../types/types'
import styles from '../../styles/components/Card.module.css'


function CardComponent({cardInformation }: PropsCard) {


    
    return (
        <div className={styles.containerCardAplication}  style={{ backgroundImage: `linear-gradient( to top, rgba(var(--primary-purple), 1), transparent), url('${cardInformation.gameImgURL}')` }}>
        <div className={styles.cardAplication} >
            <a href={cardInformation.urlGameSteam} target="_blank" rel="noreferrer">
                <span>{cardInformation.gameName}</span>
            </a>
        </div>
        </div>
    )
}

export default memo(CardComponent)