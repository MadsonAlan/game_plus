import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import styles from '../../styles/pages/Home.module.css'
import SliderHighlightedGame from '../components/SliderHighlightedGame'
import TopSellers from '../components/TopSellers'
import { GameData, SectionsData } from '../types/types'

type GamePlusInformation = {
  randomGameToHeader: GameData[],
  gamesData: GameData[],
  sectionsGame: SectionsData[]
}
const fetcher = (url) => fetch(url).then((res) => res.json())
// const updateAddCards = (url, filterData) => fetch(url, {
//   method: 'POST',
//   body: JSON.stringify(filterData),
//   headers: {
//     'content-type': 'application/json'
//   }
// }).then((res) => res.json())

function Home(props) {

  const { data, error } = useSWR('/api/updateData', fetcher)
  const imformationToCards: {
    gamedata: GameData[],
    sections: SectionsData[]
  } = data
  console.log(data);



  // for (let index = 0; index < 9; index++) {
  //   const filterData: SectionsData = props.sectionsGame[index]
  //   const cardsFiltereds = props.gamesData.filter((card) => {
  //     if (card.filters.includes(parseInt(filterData.valueId))) {
  //       return card
  //     }
  //   })
  //   if (cardsFiltereds.length < 10) {
  //     const resp = fetch('/api/updateData', {
  //       method: 'POST',
  //       body: JSON.stringify(filterData),
  //       headers: {
  //         'content-type': 'application/json'
  //       }
  //     }).then((res) => res.json())

  //   }
  // }

  const [randomGameToHeader, setRandomGameToHeader] = useState<GameData[]>(props.randomGameToHeader)
  setInterval(() => {
    let randomGamesForHeader: GameData[] = []
    for (let index = 0; index < 5; index++) {
      randomGamesForHeader.push(props.gamesData[Math.floor((Math.random() * props.gamesData.length))])
    }
    setRandomGameToHeader(randomGamesForHeader)
  }, 60000)
  return (
    <div className={styles.container}>
      <Head>
        <title>Game Plus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SliderHighlightedGame headerGamesInformation={randomGameToHeader} />
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
  // const fetcher = (url) => fetch(url).then((res) => res.json())
  // const resp = await fetcher('/api/updateData')
  // console.log(resp);

  const defaltCardsData = await import('../data/gamesWithDiscounts.json')
  // await fetch('/api/updateData')
  const cardsData: GameData[] = defaltCardsData.default
  //Jogos aleatórios para o Header
  const gamesHeaderRandom: GameData[] = []

  for (let index = 0; index < 5; index++) {
    gamesHeaderRandom.push(cardsData[Math.floor((Math.random() * cardsData.length))])
  }

  //seções aleatórias do site
  const sections = await import('../data/sectionsGame.json')

  // for (let index = 0; index < 9; index++) {
  //   const filterData: SectionsData = sections.default[index]
  //   const cardsFiltereds = cardsData.filter((card) => {
  //     if (card.filters.includes(parseInt(filterData.valueId))) {
  //       return card
  //     }
  //   })
  //   if (cardsFiltereds.length < 10) {
  //     await fetch('/api/updateData', {
  //       method: 'POST',
  //       body: JSON.stringify(filterData),
  //       headers: {
  //         'content-type': 'application/json'
  //       }
  //     })
  //   }

  // }
  return {
    props: {
      randomGameToHeader: gamesHeaderRandom,
      gamesData: defaltCardsData.default,
      sectionsGame: sections.default
    },
    revalidate: 120
  }
}

export default Home
