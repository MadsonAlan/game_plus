import Head from 'next/head'
import React from 'react'
import styles from '../../styles/pages/Home.module.css'
import HighlightedGames from '../components/HighlightedGame'
import TopSellers from '../components/TopSellers'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Game Plus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HighlightedGames/>
      <TopSellers/>
    </div>
  )
}
