import puppeteer from 'puppeteer'
import fs from 'fs'
import { SectionsData } from "../../../types/types";

export async function atualizaPromo(gameURL: string) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"]
    })
    const page = await browser.newPage()
    await page.goto(gameURL, { waitUntil: 'networkidle2' });
    const dadosDeFiltros: SectionsData[] = await page.evaluate(() => {
      const filterArray = []//[...nodeList]
      document.querySelectorAll('#TagFilter_Container .tab_filter_control_include').forEach(filterGame => {
        filterArray.push({
          valueId: filterGame.getAttribute('data-value'),
          titleIndex: filterGame.getAttribute('data-loc')
        })
      })

      return filterArray
    })

    fs.writeFile('src/data/sectionsGame.json', JSON.stringify(dadosDeFiltros, null, 2), err => {
      if (err) throw new Error('something went wrong')
      console.log('well done!');
    })

    //informações sobre os jogos com descontos
    const dadosJogos = await page.evaluate(() => {
      const dadosDosJogos = []//[...nodeList] 
      const imgDosJogos = []//[...nodeListImg] 
      const nodeList = document.querySelectorAll('#search_resultsRows a').forEach(tagA => {
        dadosDosJogos.push(tagA)
      })
      const nodeListImg = document.querySelectorAll('#search_resultsRows a div img').forEach(tagImg => {
        imgDosJogos.push(tagImg)
      })
      // const nodeListComent = document.querySelectorAll('#search_resultsRows a div div span')

      const dadosJogos = dadosDosJogos.map((a, index) => {
        const validarDesconto = a.innerText.split(`\n`)
        // console.log(validarDesconto);

        if (validarDesconto.length > 4) {
          return {
            gameId: a.getAttribute('data-ds-appid'),
            urlGameSteam: a.getAttribute('href'),
            gameImgURL: imgDosJogos[index].src,
            gameName: validarDesconto[1],
            dataCriacao: validarDesconto[2],
            desconto: validarDesconto[3],
            precAnterior: validarDesconto[4],
            precAtual: validarDesconto[5],
            filters: JSON.parse(a.getAttribute('data-ds-tagids'))
          }
        }
      })

      return dadosJogos
    })

    const dadosJogosComDescontos = dadosJogos.filter(gamedata => gamedata != undefined ?? gamedata)

    fs.writeFile('src/data/gamesWithDiscounts.json', JSON.stringify(dadosJogosComDescontos, null, 2), err => {
      if (err) throw new Error('something went wrong')
      console.log('well done!');
    })
    await browser.close();

    return {
      gamesData: dadosJogosComDescontos,
      sectionsGame: dadosDeFiltros
    }
  } catch (error) {
    console.log({
      error: 'Erro ao recuperar os dados dos jogos da Steam: ' + error
    });

  }
}