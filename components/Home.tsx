import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from './Header'
import Footer from './Footer'



export default function Home() {
  return (
    <>
      <Head>
        <title>Bragi | Free streaming website</title>
        <meta name="description" content="Free streaming website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

        <Header />

      <main className={styles.main}>
        <div className={styles.description}>
          New movies
        </div>
        <div className={styles.description}>
          New series/seasons
        </div>
        <div className={styles.description}>
          Tv channels
        </div>
      </main>

      <Footer />
    </>
  )
}
