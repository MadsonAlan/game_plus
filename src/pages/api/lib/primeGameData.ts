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

  await browser.close();
 
  return  {
    gamesData: dadosJogosAmaz
  }
}