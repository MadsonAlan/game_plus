import React, { memo } from 'react'
import { PropsCard } from '../../types/types'
import styles from '../../styles/components/CardEpic.module.css'


function CardEpic({ cardInformation }: PropsCard) {



    return (
        <a href={cardInformation.urlGameSteam} target="_blank" rel="noreferrer">
            <div className={styles.containerCardAplication} style={{ backgroundImage: `url('${cardInformation.gameImgURL?.replace('capsule_sm_120', 'header')}')` }}>
                {cardInformation.desconto ? <span>{cardInformation.desconto}</span> : <></>}
                <div className={styles.cardAplication} >
                    <div className={styles.price}>
                        <span style={{ textDecoration: 'line-through', fontSize: '0.7rem' }}>{cardInformation.precAnterior}</span>
                        <span style={{ fontSize: '1rem' }}>{cardInformation.precAtual}</span>
                    </div>
                </div>
            </div>
            <div className={styles.informationGame}>
                <p style={{ fontSize: '0.8rem' }}>{cardInformation.gameName}</p>
            </div>
        </a>
    )
}

export default memo(CardEpic)