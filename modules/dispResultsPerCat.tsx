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
    }).filter(notUndefined => notUndefined !== undefined);

    return articles;
}



export function dispChannelsResultsPerCat(searchKey:string, articlesList: object[], matches:any){
    let regex = new RegExp(searchKey, 'i');
    
    let articles:any[] = articlesList.map((el: any, i: number) => {

        if((regex.test(el.title))||(regex.test(el.country))||(regex.test(el.language))||(regex.test(el.category))){
          return (
          <Link key={i} href={{pathname:`/tv`, query: {id: el.id}}} as={`/tv`} passHref>
            {matches?
            <div key={i} style={{ cursor: 'pointer', width: 150, height:150 }}>
                <img src={el.image} width={100} height={100}/>
                <p>{el.title}</p>
            </div>:
            <div key={i} style={{ cursor: 'pointer', width: 150, height:150 }}>
                <img src={el.image} width={100} height={100}/>
                <p>{el.title}</p>
            </div>}
          </Link>)
        }
    }).filter(notUndefined => notUndefined !== undefined);

    return articles;
}