import chrome from 'chrome-aws-lambda'
// const puppeteer = require('puppeteer-core')
// const chrome = require('chrome-aws-lambda')
// const fs = require("fs")
/*
Pra executar...
Primeiro, entre no diretório com :  cd ./src/pages/api/lib/
Depois execute o arquivo com: node chromium.js
*/

const isDev = !process.env.AWS_REGION

const chromeExecPaths = {
  // win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  linux: '/usr/bin/google-chrome',
  // linux: '/usr/bin/chromium-browser',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

const exePath = chromeExecPaths[process.platform]

export async function getOptions() {
  let options;


  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
      ignoreDefaultArgs: ['--disable-extensions']
    }
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
      ignoreDefaultArgs: ['--disable-extensions']
    }
  }

  return options
}

// let _page
// export async function getPage() {
//   if (_page) {
//     return _page
//   }

//   const options = await getOptions()
//   const browser = await puppeteer.launch(options)

//   _page = await browser.newPage()

//   return _page
// }
// export async function closeBrowser() {

//   const options = await getOptions()
//   const browser = await puppeteer.launch(options)

//   await browser.close()
// }


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