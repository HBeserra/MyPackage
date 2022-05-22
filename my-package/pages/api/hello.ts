// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Index, Document, Worker } from "flexsearch";
import cities_data from '@/components/data';
const index = new Document({
  // index: ['uf', 'municipio'],
  // tags: 'uf',
  preset: 'score',
  cache: true,
})

cities_data.forEach((city, i) => {
  index.add({
    id: i,
    uf: city.UF,
    municipio: city.Municipio.normalize('NFD')
  })
})

// console.log(index)

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let list = index.search('São josé')


  // list = list[0].result.map(i => cities_data[i])
  // if(list.length > 1) list = list.filter(i => i.UF == 'SP')
  console.log(list);
  res.status(200).json({ name: 'John Doe' })
}
