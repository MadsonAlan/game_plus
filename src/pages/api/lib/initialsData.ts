import { closeBrowser, getPage } from "./configPuppeteer";
import fs from 'fs'

export async function atualizaPromo(gameURL:string) {
    const page = await getPage()
    await page.goto(gameURL, { waitUntil: 'networkidle2' });
    const dadosDeFiltros = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('#TagFilter_Container .tab_filter_control_include')
  
      const filterArray = []//[...nodeList]
      filterArray.push(nodeList)
  
      const dadosDeFiltros = filterArray.map(d =>{
        return {
          valueId: d.getAttribute('data-value'),
          titleIndex: d.getAttribute('data-loc')
        }
      })
  
      return dadosDeFiltros
    })
  
    fs.writeFile('src/data/sectionsGame.json', JSON.stringify(dadosDeFiltros, null, 2), err =>{
      if(err) throw new Error('something went wrong')
      console.log('well done!');
    })
  
    //informações sobre os jogos com descontos
    const dadosJogos = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('#search_resultsRows a')
      const nodeListImg = document.querySelectorAll('#search_resultsRows a div img')
      // const nodeListComent = document.querySelectorAll('#search_resultsRows a div div span')
  
      const dadosDosJogos = []//[...nodeList] 
      
      dadosDosJogos.push(nodeList)
      const imgDosJogos = []//[...nodeListImg] 
      imgDosJogos.push(nodeListImg)
  
      const dadosJogos = dadosDosJogos.map((a,index) => {
        const validarDesconto = a.innerText.split(`\n`)
        if(validarDesconto.length > 4){
          return {
            gameId: a.getAttribute('data-ds-appid'),
            urlGameSteam: a.getAttribute('href'),
            gameImgURL:imgDosJogos[index].src,
            gameName: validarDesconto[1],
            dataCriacao: validarDesconto[3],
            desconto: validarDesconto[4],
            precAnterior: validarDesconto[5],
            precAtual: validarDesconto[6],
            filters: JSON.parse(a.getAttribute('data-ds-tagids'))
          }
        }
      })
      return dadosJogos
    })
  
    const dadosJogosComDescontos = dadosJogos.filter(gamedata => gamedata!=undefined??gamedata)
  
    fs.writeFile('src/data/gamesWithDiscounts.json', JSON.stringify(dadosJogosComDescontos, null, 2), err =>{
      if(err) throw new Error('something went wrong')
      console.log('well done!');
    })
    await page.close();
    closeBrowser()
  }