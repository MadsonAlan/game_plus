import puppeteer from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

/*
Pra executar...
Primeiro, entre no diretório com :  cd ./src/api/lib/
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
async function getPage(){
  if (_page) {
    return _page
  }

  const options = await getOptions()
  const browser = await puppeteer.launch(options)

  _page = await browser.newPage()

  return _page
}

(async (gameURL= 'https://store.steampowered.com/search/?filter=topsellers') => {
        const page = await getPage()
        await page.goto(gameURL);
        await page.evaluate(()=>{

        })
        await page.close();
})()

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