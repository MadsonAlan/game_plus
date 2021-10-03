
export type CardData = { 
    gameId: string,
    urlGameSteam: string,
    gameImgURL: string,
    gameName: string,
    dataCriacao: string,
    desconto: string,
    precAnterior: string,
    precAtual?: string }

export type PropsCard = {
    cardInformation: CardData,
}
