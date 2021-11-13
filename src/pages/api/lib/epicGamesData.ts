import puppeteer from 'puppeteer'
import fs from 'fs'

export async function jogosEpicGames(gameURL: string) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox"]
        })
        const page = await browser.newPage()
        await page.goto(gameURL, { waitUntil: 'networkidle2' });
        await page.waitForTimeout(7000)

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
            document.querySelectorAll('.css-13vabc5').forEach(imageGame => {
                imgCard.push({
                    alt: imageGame.getAttribute('alt'),
                    src: imageGame.getAttribute('src')
                })
            })
            document.querySelectorAll('.css-1jx3eyg').forEach(a => {
                linkCard.push(a)
            })


            const dadosJogos = titlecardEpic.map((title, index) => {

                return {
                    gameId: index,
                    urlGameSteam: linkCard[index].href,
                    gameImgURL: imgCard[index].alt ? (imgCard[index].alt == title.textContent ? imgCard[index].src : '#') : '#',
                    gameName: title.textContent,
                    desconto: discount[index].textContent,
                    precAnterior: antPrice[index].textContent,
                    precAtual: atuPrice[index].textContent,
                    filters: [253232628]
                }

            })


            return dadosJogos
        })


        fs.writeFile('src/data/gamesEpicGames.json', JSON.stringify(dadosJogosEpic, null, 2), err => {
            if (err) throw new Error('something went wrong')
            console.log('well done Epic Games!');
        })

        await browser.close();

        return {
            gamesData: dadosJogosEpic
        }
    } catch (error) {
        console.log({
            error: 'Erro da rota get Epic games data: ' + error
        });

    }

}