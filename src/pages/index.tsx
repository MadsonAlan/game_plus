import Head from 'next/head'
import styles from '../../styles/pages/Home.module.css'
import TopSellers from '../components/TopSellers'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopSellers/>
    </div>
  )
}
