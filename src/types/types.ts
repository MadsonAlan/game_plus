
export type GameData = {
    gameId: string,
    urlGameSteam: string,
    gameImgURL: string,
    gameName: string,
    dataCriacao: string,
    desconto: string,
    precAnterior: string,
    precAtual?: string,
    filters: number[]
}
export type SectionsData = {
    valueId: string,
    titleIndex: string
}
export type PropsCard = {
    cardInformation: GameData,
}
