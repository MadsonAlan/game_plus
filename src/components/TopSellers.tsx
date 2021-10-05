import React, { useRef, useState } from 'react'
import styles from '../../styles/components/TopSellers.module.css'
import CardComponent from './Card'
import defaltCardsData from '../pages/api/lib/gamesWithDiscounts.json'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

export default function TopSellers() {

    const [scrollX, setScrollX] = useState(0)

    const handleClick = (direction: string) =>{
        let x = scrollX + 18 
        let x2 = scrollX - 18
        
        if (direction === "left") {
            if (scrollX > 0) {
                setScrollX(x)
            }
        }
        if (direction === "right") {
            if (scrollX >= 0) {
                setScrollX(x2)
            }
        }
        console.log(scrollX);
        
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
