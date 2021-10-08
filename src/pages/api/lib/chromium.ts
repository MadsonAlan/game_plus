import puppeteer from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'
import fs from 'fs'
// const puppeteer = require('puppeteer-core')
// const chrome = require('chrome-aws-lambda')
// const fs = require("fs")
/*
Pra executar...
Primeiro, entre no diretório com :  cd ./src/pages/api/lib/
Depois execute o arquivo com: node chromium.js
*/

async function getOptions() {
  const isDev = !process.env.AWS_REGION
  let options;

  const chromeExecPaths = {
    // win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    linux: '/usr/bin/google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }

  const exePath = chromeExecPaths[process.platform]

  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true
    }
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    }
  }

  return options
}

let _page
async function getPage() {
  if (_page) {
    return _page
  }

  const options = await getOptions()
  const browser = await puppeteer.launch(options)

  _page = await browser.newPage()

  return _page
}
async function closeBrowser() {
  
  const options = await getOptions()
  const browser = await puppeteer.launch(options)

  await browser.close()
}
export async function atualizaPromo(gameURL:string) {
  const page = await getPage()
  await page.goto(gameURL, { waitUntil: 'networkidle2' });
  const dadosDeFiltros = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('#TagFilter_Container .tab_filter_control_include')

    const filterArray = [...nodeList]

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

    const dadosDosJogos = [...nodeList]
    const imgDosJogos = [...nodeListImg]

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
          precAtual: validarDesconto[6]
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

/*
https://developer.valvesoftware.com/wiki/Steam_Web_API#GetNewsForApp_.28v0002.29
https://wiki.teamfortress.com/w/index.php?title=WebAPI/GetAppList&action=edit
https://www.freetogame.com/api-doc

https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=292030&format=json
https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=292030&format=json
https://steamdb.info/
https://steamdb.info/app/292030/
https://www.freetogame.com/api/games?platform=pc

*/

//https://www.maujor.com/tutorial/css3-gradientes-lineares.php