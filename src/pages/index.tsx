import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import styles from '../../styles/pages/Home.module.css'
import HighlightedGames from '../components/HighlightedGame'
import TopSellers from '../components/TopSellers'
import { CardData, SectionsData } from '../types/types'

type GamePlusInformation = {
  randomGameToHeader: CardData,
  gamesData: CardData[],
  sectionsGame: SectionsData[]
}

function Home(props : GamePlusInformation) {  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Game Plus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HighlightedGames cardInformation={props.randomGameToHeader}/>
      {
      props.sectionsGame.map((filter, index)=>{
        if (index < 6) {
          return(
            <TopSellers key={parseInt(filter.valueId)} cardsData={props.gamesData} filterData={filter}/>
          )
        }
      })
      }
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const defaltCardsData = await import('../data/gamesWithDiscounts.json')
  const sections = await import('../data/sectionsGame.json')
  
  return {
      props: {
          randomGameToHeader: defaltCardsData[Math.floor((Math.random()*defaltCardsData.length))],
          gamesData: defaltCardsData.default,
          sectionsGame: sections.default
      }, 
      revalidate: 120
    }
}

export default Home