// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { atualizaPromo } from '../lib/initialsData'
import { gamesForFilter } from '../lib/gamesForFilters'
import { jogosGratisAmazon } from '../lib/primeGameData'
import { GameData } from '../../../types/types'

export default async function updateData(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {

      const gameData = await atualizaPromo('https://store.steampowered.com/search/?specials=1&filter=topsellers')
      const gameAmazonData = await jogosGratisAmazon('https://gaming.amazon.com/intro')
      let randomGamesForHeader: GameData[] = []
      for (let index = 0; index < 5; index++) {
        randomGamesForHeader.push(gameData.gamesData[Math.floor((Math.random() * gameData.gamesData.length))])
      }
      return res.json({
        randomGamesForHeader,
        gamesAmazon: gameAmazonData.gamesData,
        gamesData: gameData.gamesData,
        sectionsGame: gameData.sectionsGame
      })
      // {
      //     randomGamesForHeader,
      //     // gamesEpicGames: responseEpic.gamesData,
      //     gamesAmazon: responseAmazon.gamesData,
      //     gamesData: response.gamesData,
      //     sectionsGame: response.sectionsGame
      //   }

    } catch (e) {

      return res.status(500).json({ message: 'Falha ao retornar dados: ' + e })
    }

  } else if (req.method === 'POST') {
    try {
      await gamesForFilter(req.body)
      const gameData = await import('../../../data/gamesWithDiscounts.json')
      const sections = await import('../../../data/sectionsGame.json')
      return res.json({ gamedata: gameData.default })

    } catch (e) {

      return res.status(500).json({ message: 'Falha ao retornar dados: ' + e })
    }
  }
}
