import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/pages/Home.module.css'
import SliderHighlightedGame from '../components/SliderHighlightedGame'
import TopSellers from '../components/TopSellers'
import { GameData, SectionsData } from '../types/types'
import { jogosEpicGames } from './api/lib/epicGamesData'
import { atualizaPromo } from './api/lib/initialsData'
import { jogosGratisAmazon } from './api/lib/primeGameData'
import SteamLogo from '../../public/steam-1.svg'
import EpicLogo from '../../public/epic-games-2.svg'


interface PropsHome {
  randomGamesForHeader: GameData[],
  gamesAmazon: GameData[],
  gamesData: GameData[],
  gamesEpicGames: GameData[],
  sectionsGame: SectionsData[]
}
function Home(props: PropsHome) {

  const [randomGameToHeader, setRandomGameToHeader] = useState<GameData[]>(props.randomGamesForHeader)

  useEffect(() => {
    let randomGamesForHeader: GameData[] = []
    for (let index = 0; index < 5; index++) {
      randomGamesForHeader.push(props.gamesData[Math.floor((Math.random() * props.gamesData.length))])
    }
    setRandomGameToHeader(randomGamesForHeader)
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>Game Plus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SliderHighlightedGame headerGamesInformation={randomGameToHeader} />
      <TopSellers cardsData={props.gamesAmazon} filterData={{ titleIndex: 'Jogos Grátis da Amazon', valueId: '161966' }} />
      <TopSellers cardsData={props.gamesEpicGames} filterData={{ titleIndex: 'Jogos em Promoção na Epic Games', valueId: '253232628' }} />
      {
        props.sectionsGame.map((filter, index) => {
          let cardsFiltereds: GameData[] = props.gamesData.filter((card) => {
            if (card.filters.includes(parseInt(filter.valueId))) {
              return card
            }
          })
          if (cardsFiltereds.length > 7) {
            return (
              <TopSellers key={parseInt(filter.valueId)} cardsData={props.gamesData} filterData={filter} />
            )
          }
        })
      }
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response: {
    gamesData: GameData[],
    sectionsGame: SectionsData[]
  } = await atualizaPromo('https://store.steampowered.com/search/?specials=1&filter=topsellers')
  const responseAmazon: {
    gamesData: GameData[]
  } = await jogosGratisAmazon('https://gaming.amazon.com/intro')
  const responseEpic = await jogosEpicGames('https://www.epicgames.com/store/pt-BR/browse?sortBy=relevancy&sortDir=DESC&priceTier=tierDiscouted&count=200&start=0')
  let randomGamesForHeader: GameData[] = []
  for (let index = 0; index < 5; index++) {
    randomGamesForHeader.push(response.gamesData[Math.floor((Math.random() * response.gamesData.length))])
  }

  return {
    props: {
      randomGamesForHeader,
      gamesEpicGames: responseEpic.gamesData,
      gamesAmazon: responseAmazon.gamesData,
      gamesData: response.gamesData,
      sectionsGame: response.sectionsGame
    },
    revalidate: 60 * 60 * 12
  }
}

export default Home
