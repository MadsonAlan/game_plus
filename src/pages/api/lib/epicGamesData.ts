import puppeteer from 'puppeteer'

export async function jogosEpicGames(gameURL: string) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(gameURL, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.css-lrwy1y')

    //informações sobre os jogos gratis
    const dadosJogosEpic = await page.evaluate(() => {
        const titlecardEpic = []//[...nodeListImg] 
        const discount = []
        const antPrice = []
        const atuPrice = []
        const imgCard = []
        const linkCard = []
        document.querySelectorAll('.css-2ucwu div').forEach(titleGame => {
            titlecardEpic.push(titleGame)
        })
        document.querySelectorAll('.css-b0xoos').forEach(discountGame => {
            discount.push(discountGame)
        })
        document.querySelectorAll('.css-1rcj98u').forEach(antPriceGame => {
            antPrice.push(antPriceGame)
        })
        document.querySelectorAll('.css-1vm3ks .css-1x8w2lj span').forEach(atupriceGame => {
            atuPrice.push(atupriceGame)
        })
        document.querySelectorAll('.css-13vabc5').forEach(titleGame => {
            imgCard.push(titleGame)
        })
        document.querySelectorAll('.css-1jx3eyg').forEach(a => {
            linkCard.push(a)
        })
        console.log(imgCard);

        const dadosJogos = titlecardEpic.map((title, index) => {
            return {
                gameId: index,
                urlGameSteam: linkCard[index].href,
                gameImgURL: imgCard[index].alt == title.text ?? imgCard[index].src,
                gameName: title.text,
                desconto: discount[index].text,
                precAnterior: antPrice[index].text,
                precAtual: atuPrice[index].text,
                filters: [253232628]
            }

        })


        return dadosJogos
    })

    await browser.close();

    return {
        gamesData: dadosJogosEpic
    }
}