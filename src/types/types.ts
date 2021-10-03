import { ReactNode } from "react"

export type CardData = {
    title:string,
    url:string
}

export type PropsCard = {
    options: ReactNode,
    cardInformation: CardData,
}
