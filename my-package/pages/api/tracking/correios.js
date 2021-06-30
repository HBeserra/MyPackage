// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { rastrearEncomendas } = require('correios-brasil');

export default (req, res) => {
  var timestamp = new Date()
  


  if (typeof req?.body?.codes == Array) rastrearEncomendas([...req?.body?.codes]).then((e) => res.status(200).json({ timestamp: timestamp.toLocaleDateString(), e }))
  return res.json({ date: timestamp.toLocaleDateString(), time: timestamp.toTimeString(),  tracking: [] })
}