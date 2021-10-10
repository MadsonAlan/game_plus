import { closeBrowser, getPage } from "./configPuppeteer";
import fs from 'fs';

export async function gamesForFilter(filterId: string) {
    const page = await getPage()
    await page.goto(`https://store.steampowered.com/search/?tags=${filterId}&specials=1&filter=topsellers`, { waitUntil: 'networkidle2' });
    //informações sobre os jogos com descontos
    const dadosJogos = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('#search_resultsRows a')
        const nodeListImg = document.querySelectorAll('#search_resultsRows a div img')
        // const nodeListComent = document.querySelectorAll('#search_resultsRows a div div span')

        const dadosDosJogos = []//[...nodeList] 

        dadosDosJogos.push(nodeList)
        const imgDosJogos = []//[...nodeListImg] 
        imgDosJogos.push(nodeListImg)

        const dadosJogos = dadosDosJogos.map((a, index) => {
            const validarDesconto = a.innerText.split(`\n`)
            if (validarDesconto.length > 4) {
                return {
                    gameId: a.getAttribute('data-ds-appid'),
                    urlGameSteam: a.getAttribute('href'),
                    gameImgURL: imgDosJogos[index].src,
                    extras: a.innerText,
                    // gameName: validarDesconto[1],
                    // dataCriacao: validarDesconto[3],
                    // desconto: validarDesconto[4],
                    // precAnterior: validarDesconto[5],
                    // precAtual: validarDesconto[6],
                    filters: JSON.parse(a.getAttribute('data-ds-tagids'))
                }
            }
        })
        return dadosJogos
    })
    const dadosJogosComDescontos = dadosJogos.filter(gamedata => gamedata != undefined ?? gamedata)

    fs.writeFile(`src/data/${filterId}.json`, JSON.stringify(dadosJogosComDescontos, null, 2), err => {
        if (err) throw new Error('something went wrong')
        console.log('well done!');
    })
    await page.close();
    closeBrowser()
}