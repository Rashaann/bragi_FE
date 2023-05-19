import styles from '@/styles/Home.module.css'
import Link from 'next/link';


export default function dispSeriesPerCat(category:string, articlesList: object[], matches:any){


    let articles:any[] = articlesList.map((el: any, i: number) => {

        if(category === el.category){
          return (
          <Link key={i} href={{pathname:`/[series]/serie`, query: {id: el.id}}} as={`/${el.id}/serie`} passHref>
            {matches?
            <div key={i} className={styles.container}>
              <div className={styles.content}>
                  <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.backgroundImg}></div>       
              </div>
            </div>:
            <div key={i} className={styles.smContainer}>
              <div className={styles.smContent}>
                  <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.smBackgroundImg}></div>       
              </div>
            </div>}
          </Link>)
        } else if (category === 'all'){
          return (
            <Link key={i} href={{pathname:`/[series]/serie`, query: {id: el.id}}} as={`/${el.id}/serie`} passHref>
              {matches?
              <div key={i} className={styles.container}>
                <div className={styles.content}>
                    <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.backgroundImg}></div>       
                </div>
              </div>:
              <div key={i} className={styles.smContainer}>
                <div className={styles.smContent}>
                    <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.smBackgroundImg}></div>       
                </div>
              </div>}
            </Link>)
        }
    }).filter(notUndefined => notUndefined !== undefined).slice(0,10);

    return articles;
}