import React, { useState } from 'react'
import styles from '../../styles/components/TopSellers.module.css'
import CardComponent from './Card'
import defaltCardsData from '../../src/data/gamesWithDiscounts.json'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { GameData, SectionsData } from '../types/types';
import Slider, { Settings } from 'react-slick';
//https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/Useful_string_methods

interface PropsTopSellers {
    filterData: SectionsData,
    cardsData: GameData[],
}
export default function TopSellers({
    filterData,
    cardsData
}: PropsTopSellers) {
    const settings: Settings = {
        dots: false,
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        speed: 600,
        autoplay: false,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <MdOutlineArrowForwardIos className={styles.sliderArrowForward} onClick={onClick} />
            //   <div
            //     className={className}
            //     style={{ ...style, display: "block", background: "red" }}
            //     onClick={onClick}
            //   />
            );
        }
        
        function SamplePrevArrow(props) {
            const { className, style, onClick } = props;
            return (
            <MdOutlineArrowBackIosNew className={styles.sliderArrowBack} onClick={onClick} />
        //   <div
        //     className={className}
        //     style={{ ...style, display: "block", background: "green" }}
        //     onClick={onClick}
        //   />
        );
      }
    function validaCard(cardsData: GameData[]) {
        const cardsFiltereds = cardsData.filter((card) => {
            if (card.filters.includes(parseInt(filterData.valueId))) {
                return card
            }
        })
        return cardsFiltereds
    }
    return (
        <div className={styles.main}>
            <h3>Jogos de {filterData.titleIndex}</h3>
            <Slider {...settings}>
                {
                    validaCard(cardsData).map((cardData, indice) => {
                        return (
                            <CardComponent
                                key={indice}
                                cardInformation={cardData}
                            />
                        )
                    })
                }
            </Slider>
            {/* <div className={styles.wrapper}>
                <MdOutlineArrowBackIosNew className={styles.sliderArrowBack} onClick={() => handleClick("left", validaCard(cardsData))} />
                <div className={styles.cardCarroussel} style={{ transform: `translateX(${scrollX}rem)` }}>
                    {
                        validaCard(cardsData).map((cardData, indice) => {
                            return (
                                <CardComponent
                                    key={indice}
                                    cardInformation={cardData}
                                />
                            )
                        })
                    }

                </div>
                <MdOutlineArrowForwardIos className={styles.sliderArrowForward} onClick={() => handleClick("right", validaCard(cardsData))} />
            </div> */}
        </div>
    )
}
