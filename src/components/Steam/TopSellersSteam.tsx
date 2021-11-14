import React, { memo } from 'react'
import styles from '../../../styles/components/Steam/TopSellersSteam.module.css'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { GameData, SectionsData } from '../../types/types';
import Slider, { Settings } from 'react-slick';
import CardSteam from './CardSteam';

//https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/First_steps/Useful_string_methods

interface PropsTopSellers {
    filterData: {
        valueId: string;
        titleIndex?: string;
    },
    cardsData: GameData[],
}

function TopSellersSteam({
    filterData,
    cardsData
}: PropsTopSellers) {

    const settings: Settings = {
        dots: false,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 8,
        slidesToScroll: 1,
        speed: 600,
        autoplay: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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
                    slidesToShow: 2,
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
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <MdOutlineArrowBackIosNew className={styles.sliderArrowBack} onClick={onClick} />
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

            <h3>{filterData.titleIndex.toUpperCase()}</h3>
            <Slider {...settings}>
                {
                    filterData.valueId ? validaCard(cardsData).map((cardData, indice) => {
                        return (
                            <CardSteam
                                key={indice}
                                cardInformation={cardData}
                            />
                        )
                    }) : cardsData.map((cardData, indice) => {
                        return (
                            <CardSteam
                                key={indice}
                                cardInformation={cardData}
                            />
                        )
                    })

                }
            </Slider>
        </div>
    )

}


export default memo(TopSellersSteam)