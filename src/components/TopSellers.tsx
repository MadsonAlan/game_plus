import React, { useState } from 'react'
import styles from '../../styles/components/TopSellers.module.css'
import CardComponent from './Card'
import defaltCardsData from '../../src/data/gamesWithDiscounts.json'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
//https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/Useful_string_methods
export default function TopSellers() {

    const [scrollX, setScrollX] = useState(0)

    const handleClick = (direction: string) =>{
        let x = (scrollX + 27) < 0 ? (scrollX + 27) : 0
        let x2 = ((scrollX - 27)* -1) > ((defaltCardsData.length * 18) - 36) ? ((defaltCardsData.length * 18) - 36)* -1 : (scrollX - 27) 
           
        
        if (direction === "left") {
            if (scrollX < 0) {
                setScrollX(x)
            }
        }
        if (direction === "right") {
            
            if((scrollX * -1) < ((defaltCardsData.length * 18) - 36)){
                setScrollX(x2)
            }    
        }
        
    }
    return (
        <div className={styles.main}>
            <h3>Os Mais vendidos</h3>
            <div className={styles.wrapper}>
            <MdOutlineArrowBackIosNew className={styles.sliderArrowBack} onClick={()=>handleClick("left")}/>
            <div className={styles.cardCarroussel} style={{  transform: `translateX(${scrollX}rem)` }}>
                {
                    defaltCardsData.map((cardData, indice) => {
                        return (
                            <CardComponent
                                key={indice}
                                cardInformation={cardData}
                            />                            
                        )
                    })
                }

            </div>
            <MdOutlineArrowForwardIos className={styles.sliderArrowForward} onClick={()=>handleClick("right")}/>
            </div>
        </div>
    )
}
