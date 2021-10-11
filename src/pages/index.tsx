import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/pages/Home.module.css'
import HighlightedGames from '../components/HighlightedGame'
import TopSellers from '../components/TopSellers'
import { GameData, SectionsData } from '../types/types'

type GamePlusInformation = {
  randomGameToHeader: GameData,
  gamesData: GameData[],
  sectionsGame: SectionsData[]
}

function Home(props: GamePlusInformation) {
  // props.gamesData[Math.floor((Math.random()*props.gamesData.length))]
  // useState()
  // useEffect(()=>{

  // })
  return (
    <div className={styles.container}>
      <Head>
        <title>Game Plus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HighlightedGames cardInformation={props.randomGameToHeader} />
      {
        props.sectionsGame.map((filter, index) => {
          if (index < 9) {
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

  const defaltCardsData = await import('../data/gamesWithDiscounts.json')
  const sections = await import('../data/sectionsGame.json')
  await fetch(`${process.env.URL_LOCAL}/api/hello`)
  const cardsData: GameData[] = defaltCardsData.default

  for (let index = 0; index < 9; index++) {
    const filterData: SectionsData = sections.default[index]
    const cardsFiltereds = cardsData.filter((card) => {
      if (card.filters.includes(parseInt(filterData.valueId))) {
        return card
      }
    })
    if (cardsFiltereds.length < 10) {
      await fetch(`${process.env.URL_LOCAL}/api/hello`, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: {
          'content-type': 'application/json'
        }
      })
    }

  }
  return {
    props: {
      gamesData: defaltCardsData.default,
      sectionsGame: sections.default
    },
    revalidate: 60 * 60 * 12
    // revalidate: 120
  }
}

export default Home