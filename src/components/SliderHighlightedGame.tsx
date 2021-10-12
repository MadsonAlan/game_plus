
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import { PropsHeaderGames } from "../types/types";
import React, { memo } from "react";
import HighlightedGames from "./HighlightedGame";

function SliderHighlightedGame({ headerGamesInformation }: PropsHeaderGames){
    const settings: Settings = {
        dots: false,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 2000,
        autoplay: true,        
    };
    return(
        <Slider {...settings}>
            {
                headerGamesInformation.map((GameInformation, index)=>{
                    return(
                        <HighlightedGames key={index} cardInformation={GameInformation}/>
                    )
                })
            }
        </Slider>
    )
}

export default memo(SliderHighlightedGame)