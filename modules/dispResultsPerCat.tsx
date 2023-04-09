import styles from '@/styles/Home.module.css'
import Link from 'next/link';

export function dispMoviesResultsPerCat(searchKey:string, articlesList: object[], matches:any){
    let regex = new RegExp(searchKey, 'i');
    
    let articles:any[] = articlesList.map((el: any, i: number) => {

        if((regex.test(el.originalTitle))||(regex.test(el.frenchTitle))||(regex.test(el.overview))){
          return (
          <Link key={i} href={{pathname:`/movies/[movie]`, query: {id: el.id}}} as={`/movies/${el.id}`} passHref>
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
    }).filter(notUndefined => notUndefined !== undefined);

    return articles;
}


export function dispTvShowsResultsPerCat(searchKey:string, articlesList: object[], matches:any){
    let regex = new RegExp(searchKey, 'i');
    
    let articles:any[] = articlesList.map((el: any, i: number) => {

        if((regex.test(el.originalTitle))||(regex.test(el.frenchTitle))||(regex.test(el.overview))){
          return (
          <Link key={i} href={{pathname:`/[serie]/serie`, query: {id: el.id}}} as={`/${el.id}/serie`} passHref>
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
    }).filter(notUndefined => notUndefined !== undefined);

    return articles;
}