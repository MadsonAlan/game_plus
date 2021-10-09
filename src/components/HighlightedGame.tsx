import styles from '../../styles/components/HighlightedGames.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { PropsCard } from '../types/types'

function HighlightedGames({ cardInformation }: PropsCard) {

    return (
        <section className={styles.featured} style={{ backgroundImage: `linear-gradient( to top, rgba(var(--primary-purple), 1), transparent), url('${cardInformation.gameImgURL.replace('capsule_sm_120', 'header')}')` }}>
        {/* // <section className={styles.featured} style={{ backgroundImage: `linear-gradient( to top, rgba(var(--primary-purple), 1), transparent), url('https://cdn.akamai.steamstatic.com/steam/apps/${cardInformation.gameId}/page_bg_generated_v6b.jpg')` }}> */}
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
                    <div className={styles.featuredBuyButton}>
                        <a href={cardInformation.urlGameSteam} target="_blank" rel="noreferrer">
                            comprar
                        </a>
                    </div>
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