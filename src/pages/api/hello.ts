// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { atualizaPromo } from './lib/chromium';


export default function UpdateData(req: NextApiRequest, res: NextApiResponse) {
  return atualizaPromo('https://store.steampowered.com/search/?specials=1&filter=topsellers').then(
    ()=>res.status(200).json({ message: 'Update Completo' })
  ).catch(
    (e)=>res.status(500).json({ message: 'Falha ao retornar dados: '+e })
  )
}
