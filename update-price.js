import { chromium } from 'playwright'
import * as dotenv from 'dotenv'

import listPrice from './listPrice.js'
dotenv.config()

const url = 'https://www.apprinting.com/admin/'
const urlProductUpdatePrice =
  'https://www.apprinting.com/admin/product_additionalinfo_price.php?product_id=5611&prod_add_opt_id=112363&sel_product_size=11216'

const qtys = [250, 500, 1000, 2500, 5000, 10000, 15000, 20000, 25000]

const login = async (page) => {
  await page.goto(url, { timeout: 300000 })
  const user = await page.$('#username')
  const pass = await page.$('#password')
  const btn = await page.$('button')
  await user.fill(process.env.LOGIN_USER)
  await pass.fill(process.env.LOGIN_SECRET_KEY)
  await btn.click()
  await page.waitForTimeout(5000)
  console.log('login: OK')
}
// txtprice[250_2159042_]   txtprice[250_2159046_]
const inputFillToPrice = async (page) => {
  await page.goto(urlProductUpdatePrice, { timeout: 300000 })
  let price = 0
  // let postNumber = 9607838  ${postNumber}
  for (let i = 49; i <= 58; i++) {
    if (i === 49 || i === 50 || i === 51 || i === 58) {
      for await (const qty of qtys) {
        const id = `txtprice[${qty}_21590${i}_]`
        const inputPrice = await page.$(`[id="${id}" ]`)
        await inputPrice.fill(listPrice[price].toString())
        console.log(listPrice[price].toString())
        price++
        // console.log(postNumber);
        // postNumber++
      }
    }
  }
  const btnSave = await page.$('#btn-action-save')
  await btnSave.click()
  await page.waitForTimeout(5000)
}

const updatePrice = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await login(page)
  await inputFillToPrice(page)
  console.log('END')
  await browser.close()
}

updatePrice()
