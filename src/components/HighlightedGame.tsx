import styles from '../../styles/components/HighlightedGames.module.css'
import defaltCardsData from '../../src/data/gamesWithDiscounts.json'
import axios from 'axios'
export default function HighlightedGames(){
    const gameRandom = defaltCardsData[Math.floor((Math.random()*defaltCardsData.length))]
    return(
        <section className={styles.featured} style={{backgroundImage: `linear-gradient( to top, rgba(var(--primary-purple), 1), transparent), url('${gameRandom.gameImgURL.replace('capsule_sm_120','header')}')`}}>
            <div className={styles.featuredVertical}>
                <div className={styles.featuredHorizontal}>
                <div className={styles.featuredName}>

                {gameRandom.gameName}
                <span>{gameRandom.dataCriacao}</span>
                </div>
                <div className={styles.featuredInfo}>
                    <div className={styles.discountPercentage}>{gameRandom.desconto}</div>
                    <div>{gameRandom.precAnterior}</div>
                    <div>{gameRandom.precAtual}</div>
                    
                </div>
                <div>
                    <a href={gameRandom.urlGameSteam}>
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