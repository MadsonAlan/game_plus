import puppeteer from 'puppeteer'
import fs from 'fs'
import { SectionsData } from "../../../types/types";

export async function jogosGratisAmazon(gameURL: string) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"]
    })
    const page = await browser.newPage()
    await page.goto(gameURL, { waitUntil: 'networkidle2' });


    //informações sobre os jogos gratis
    const dadosJogosAmaz = await page.evaluate(() => {
      const cardAmazDosJogos = []//[...nodeListImg] 
      document.querySelectorAll('.needs-scroll-left img').forEach(tagImg => {
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

    return {
      gamesData: dadosJogosAmaz
    }
  } catch (error) {
    console.log({
      error: 'Erro ao recuperar informações da Amazon games: ' + error
    });

  }
}