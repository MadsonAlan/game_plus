import styles from '../../styles/components/HighlightedGames.module.css'
import { GetStaticProps } from 'next'
import { PropsCard } from '../types/types'
import axios from 'axios';

function HighlightedGames({cardInformation}:PropsCard){   
    
    return(
        <section className={styles.featured} style={{backgroundImage: `linear-gradient( to top, rgba(var(--primary-purple), 1), transparent), url('${cardInformation.gameImgURL.replace('capsule_sm_120','header')}')`}}>
            <div className={styles.featuredVertical}>
                <div className={styles.featuredHorizontal}>
                <div className={styles.featuredName}>

                {cardInformation.gameName}
                <span>{cardInformation.dataCriacao}</span>
                </div>
                <div className={styles.featuredInfo}>
                    <div className={styles.discountPercentage}>{cardInformation.desconto}</div>
                    <div>{cardInformation.precAnterior}</div>
                    <div>{cardInformation.precAtual}</div>
                    
                </div>
                <div>
                    <a href={cardInformation.urlGameSteam}>
                        comprar
                    </a>
                </div>
                <div>
                    <p>
                        teste de noticias
                    </p>
                </div>
                </div>
            </div>
        </section>
    )
}

export default HighlightedGames