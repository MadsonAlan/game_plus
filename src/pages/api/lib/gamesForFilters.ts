import puppeteer from 'puppeteer'
import fs from 'fs';
import { GameData, SectionsData } from '../../../types/types';
import gamesArray from '../../../data/gamesWithDiscounts.json'

export async function gamesForFilter(filterId: SectionsData) {
    let jogosEncontrados: GameData[] = gamesArray
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    })
    const page = await browser.newPage()
    await page.goto(`https://store.steampowered.com/search/?tags=${filterId.valueId}&specials=1&filter=topsellers`, { waitUntil: 'networkidle2' });
    //informações sobre os jogos com descontos
    const dadosJogos = await page.evaluate(() => {
        const dadosDosJogos = []
        const imgDosJogos = []
        document.querySelectorAll('#search_resultsRows a').forEach(tagA => {
            dadosDosJogos.push(tagA)
        })
        document.querySelectorAll('#search_resultsRows a div img').forEach(tagImg => {
            imgDosJogos.push(tagImg)
        })
        // const nodeListComent = document.querySelectorAll('#search_resultsRows a div div span')

        const dadosJogos = dadosDosJogos.map((a, index) => {
            const validarDesconto = a.innerText.split(`\n`)
            if (validarDesconto.length > 4) {
                return {
                    gameId: a.getAttribute('data-ds-appid'),
                    urlGameSteam: a.getAttribute('href'),
                    gameImgURL: imgDosJogos[index].src,
                    gameName: validarDesconto[1],
                    dataCriacao: validarDesconto[3],
                    desconto: validarDesconto[4],
                    precAnterior: validarDesconto[5],
                    precAtual: validarDesconto[6],
                    filters: JSON.parse(a.getAttribute('data-ds-tagids'))
                }
            }
        })
        console.log(dadosJogos);

        return dadosJogos
    })

    const dadosJogosComDescontos = dadosJogos.filter(gamedata => gamedata != undefined ?? gamedata)
    dadosJogosComDescontos.map(item => jogosEncontrados.push(item))
    jogosEncontrados = jogosEncontrados.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))

    fs.writeFile('src/data/gamesWithDiscounts.json', JSON.stringify(jogosEncontrados, null, 2), err => {
        if (err) throw new Error('something went wrong')
        console.log(`well done filter ${filterId.titleIndex}!`);
    })
    await browser.close();
}