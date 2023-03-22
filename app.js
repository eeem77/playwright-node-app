const { chromium, firefox, webkit } = require('playwright')
require('dotenv').config()

const login = async (page) => {
  const user = await page.$('#username')
  const pass = await page.$('#password')
  const btn = await page.$('button')
  await user.fill(process.env.LOGIN_USER)
  await pass.fill(process.env.LOGIN_SECRET_KEY)
  await btn.click()
  
  console.log('login: OK')
}

const extractIds = async (page, url) => {
  await page.goto(url)
  const html = await page.$$eval('.card-aligned', node => node.map(n => n.innerHTML))
  const body = html[0].split('">')
  const filter = body.filter(data => data.includes('product-box'))
  const ids = filter.map(data => data.slice(-4))
  return ids
}

const web = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const ids = await extractIds(page, 'https://www.apprinting.com/simple-flat-5x7-wedding-invitations/products/')
  console.log(ids, process.env)
  await browser.close()
}

web()