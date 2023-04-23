import { chromium, firefox, webkit } from 'playwright'
import * as dotenv from 'dotenv'
dotenv.config()

import listPrice from './listPrice.js'

const url = 'https://www.apprinting.com/admin/'
const urlProductUpdatePrice = 'https://www.apprinting.com/admin/product_additionalinfo_price.php?product_id=3201&prod_add_opt_id=90734&sel_product_size=3463'

const qtys = [10,25,50,100,250,500,750,1000,1500,2000,2500,3000,4000,5000,6000,7000]

const login = async (page) => {
    await page.goto(url)
    const user = await page.$('#username')
    const pass = await page.$('#password')
    const btn = await page.$('button')
    await user.fill(process.env.LOGIN_USER)
    await pass.fill(process.env.LOGIN_SECRET_KEY)
    await btn.click()
    await page.waitForTimeout(3000)
    console.log('login: OK')
}
//txtprice[10_1902629_] txtprice[10_1902633_] txtprice[10_1902629_]
const inputFillToPrice = async (page) => {
    await page.goto(urlProductUpdatePrice)
    let price = 0
    for (let i = 29; i <= 33; i++){
        for await (const qty of qtys){
            const id = `txtprice[${qty}_19026${i}_]`
            const inputPrice = await page.$(`[id="${id}" ]`)
            await inputPrice.fill(listPrice[price].toString())
            console.log(listPrice[price].toString());
            price++
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