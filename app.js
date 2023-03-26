const { chromium, firefox, webkit } = require('playwright')
const html = require('./utils.js')
require('dotenv').config()

const login = async (page) => {
  const user = await page.$('#username')
  const pass = await page.$('#password')
  const btn = await page.$('button')
  await user.fill(process.env.LOGIN_USER)
  await pass.fill(process.env.LOGIN_SECRET_KEY)
  await btn.click()
  await page.waitForTimeout(3000)
  console.log('login: OK')
}

const extractIds = async (page) => {
  const html = await page.$$eval('.card-aligned', node => node.map(n => n.innerHTML))
  const body = html[0].split('">')
  const filter = body.filter(data => data.includes('product-box'))
  const ids = filter.map(data => data.slice(-4))
  console.log(ids)
  return ids
}

const seccionFooterPage = async (page, numPage) => {
  let ids = []
  for (var i = 0; i < numPage; i++) {
    if(i === 0){
      ids = await extractIds(page)
    }
    await page.getByText('Next  »').click()
    await page.waitForTimeout(3000)
    await page.waitForLoadState('networkidle')
    const seccionIds = await extractIds(page) 
    ids = ids.concat(seccionIds)
  }
  return ids
}

const updateProducts = async (ids) => {
  for await (const id of ids) {
    await page.goto(`https://www.apprinting.com/admin/product_description.php?product_id=${id}`)
    const btnHTML = await page.$('#cke_134')
    await btnHTML.click()
    await page.waitForTimeout(1000)
    await page.locator('#cke_3_contents').focus()
    await page.locator('#cke_3_contents').click()
    await page.locator('#cke_3_contents').press('Control+a')
    await page.locator('#cke_3_contents').press('Control+x')
    await page.locator('#cke_3_contents').type(html)
    await page.click('#btn-action-save')
    await page.waitForTimeout(3000)
    console.log(id)
  }
}

const web = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()  
  
  // EXTRACT NUM FOOTER PAGE
  // const num = await page.getByRole('link', {class: 'page-link'}).allInnerTexts()
  // const numPage = num.filter(data => data.length === 1).length
  
  // ACTIVATE EXTRACT IDS PRODUCTS
  await page.goto('https://www.apprinting.com/boarding-pass-wedding-invitations/products/')
  const ids = await seccionFooterPage(page, 4)
  console.log(ids)

  // CHANGE PRICE PRODUCTS
  await page.goto('https://www.apprinting.com/admin/')
  await login(page)
  await updateProducts(ids)
  
  // END PROCCESS
  console.log('END')
  await browser.close()
}

web()