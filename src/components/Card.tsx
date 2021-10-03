import React, { memo } from 'react'
import { PropsCard } from '../types/types'
import styles from '../styles/components/Card.module.css'


function CardComponent({ options, cardInformation }: PropsCard) {


    
    return (
        <div className={styles.containerCardAplication}  style={{ backgroundImage: `linear-gradient( to top, rgba(var(--primary-purple), 1), transparent), url('/screenshots/${cardInformation.title}.jpeg')` }}>
        <div className={styles.cardAplication} >
            {/* <a href={cardInformation.url} target="_blank"> */}
                <span>{cardInformation.title}</span>
            {/* </a> */}
            {options}
        </div>
        </div>
    )
}

export default memo(CardComponent)