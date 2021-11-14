
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { PropsHeaderGames } from "../types/types";
import React, { memo } from "react";
import HighlightedGames from "./HighlightedGame";
import styles from '../../styles/components/SliderHighlightedGame.module.css'

function SliderHighlightedGame({ headerGamesInformation }: PropsHeaderGames) {
    const settings: Settings = {
        dots: false,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        fade: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 5000,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: 1,
                    fade: true,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerPadding: '0',
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                    dots: false
                }
            }
        ]
    };
    return (
        <Slider {...settings} className={styles.slider}>
            {
                headerGamesInformation.map((GameInformation, index) => {
                    return (
                        <HighlightedGames key={index} cardInformation={GameInformation} />
                    )
                })
            }
        </Slider>
    )
}

export default memo(SliderHighlightedGame)