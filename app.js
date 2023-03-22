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

const extractIds = async (page) => {
  //await page.goto(url)
  
  const html = await page.$$eval('.card-aligned', node => node.map(n => n.innerHTML))
  const body = html[0].split('">')
  const filter = body.filter(data => data.includes('product-box'))
  const ids = filter.map(data => data.slice(-4))
  return ids
}

const web = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  // const ids = await extractIds(page, 'https://www.apprinting.com/simple-flat-5x7-wedding-invitations/products/')
  // console.log(ids)
  await page.goto('https://www.apprinting.com/simple-flat-5x7-wedding-invitations/products/')
  //const buttonNext = await page.$('.page-link').getByText('Next  »')
  const page1 = await extractIds(page)
  await page.getByText('Next  »').click()
  await page.waitForLoadState('networkidle')
  const page2 = await extractIds(page) 
  const ids = page1.concat(page2)
  console.log(ids)
  // await page.locator('tag=a').getByText().click()
  //await page.screenshot({path: 'uno.png'})
  await browser.close()
}

web()