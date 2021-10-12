// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { atualizaPromo } from '../lib/initialsData'
import { gamesForFilter } from '../lib/gamesForFilters'

export default async function updateData(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await atualizaPromo('https://store.steampowered.com/search/?specials=1&filter=topsellers')
      return res.status(200).json({ message: 'Update Completo' })

    } catch (e) {

      return res.status(500).json({ message: 'Falha ao retornar dados: ' + e })
    }

  } else if (req.method === 'POST') {
    try {
      await gamesForFilter(req.body)
      return res.status(200).json({ message: 'Update Completo' })

    } catch (e) {

      return res.status(500).json({ message: 'Falha ao retornar dados: ' + e })
    }
  }
}
