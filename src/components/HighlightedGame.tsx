import styles from '../../styles/components/HighlightedGames.module.css'
import { GetStaticProps } from 'next'
import { PropsCard } from '../types/types'
import axios from 'axios';

function HighlightedGames({ cardInformation }: PropsCard) {

    return (
        <section className={styles.featured} style={{ backgroundImage: `linear-gradient( to top, rgba(var(--primary-purple), 1), transparent), url('${cardInformation.gameImgURL.replace('capsule_sm_120', 'header')}')` }}>
            <div className={styles.featuredVertical}>
                <div className={styles.featuredHorizontal}>
                    <div className={styles.featuredName}>

                        {cardInformation.gameName}
                    </div>
                    <div className={styles.featuredInfo}>
                        <div className={styles.featuredLauch}>Lançado em: {cardInformation.dataCriacao}</div>
                        <div className={styles.discountPercentage}>
                            <span>
                                {cardInformation.desconto}
                            </span>
                            <div>
                                <p>
                                    {cardInformation.precAnterior}
                                </p>
                                <span>
                                    {cardInformation.precAtual}
                                </span>
                            </div>
                        </div>


                    </div>
                    <a className={styles.featuredBuyButton} href={cardInformation.urlGameSteam} target="_blank" rel="noreferrer">
                        comprar
                    </a>
                    {/* <div>
                        <p>
                            teste de noticias
                        </p>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default HighlightedGames