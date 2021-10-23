import { getOptions } from "./configPuppeteer";
import puppeteer from 'puppeteer-core'
import fs from 'fs'
import { SectionsData } from "../../../types/types";

export async function jogosGratisAmazon(gameURL: string) {
  const options = await getOptions()
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.goto(gameURL, { waitUntil: 'networkidle2' });


  //informações sobre os jogos gratis
  const dadosJogosAmaz = await page.evaluate(() => {
    const cardAmazDosJogos = []//[...nodeListImg] 
    document.querySelectorAll('.needs-scroll-left img').forEach(tagImg =>
      {
        cardAmazDosJogos.push(tagImg)
      })

    const dadosJogos = cardAmazDosJogos.map((img, index) => {
        return {
          gameId: index.toString(),
          gameImgURL: img.getAttribute('src'),
          gameName: img.getAttribute('alt'),
          desconto: 'Grátis com Prime',
          filters: [161966]
        }
      
    })
    
    return dadosJogos
  })

  fs.writeFile('src/data/gamesAmazon.json', JSON.stringify(dadosJogosAmaz, null, 2), err => {
    if (err) throw new Error('something went wrong')
    console.log('well done Amazon Games!');
  })

  await browser.close();
 
  return  {
    gamesData: dadosJogosAmaz
  }
}