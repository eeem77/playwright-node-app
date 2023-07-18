import { chromium, firefox, webkit } from 'playwright'
import * as dotenv from 'dotenv'
dotenv.config()

import listPrice from './listPrice.js'

const url = 'https://www.apprinting.com/admin/'
const urlProductUpdatePrice = 'https://www.apprinting.com/admin/product_additionalinfo_price.php?product_id=3716&prod_add_opt_id=96422&sel_product_size=4325'

const qtys = [
    250,
    500,
    1000,
    2500,
    5000,
    10000,
    15000,
    20000,
    25000    
]

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
// txtprice[250_1979588_] txtprice[250_1979592_]
const inputFillToPrice = async (page) => {
    await page.goto(urlProductUpdatePrice, { timeout: 300000 })
    let price = 0
    //let postNumber = 9607838  ${postNumber}
    for (let i = 588; i <= 592; i++){
        for await (const qty of qtys){
            const id = `txtprice[${qty}_1979${i}_]`
            const inputPrice = await page.$(`[id="${id}" ]`)
            await inputPrice.fill(listPrice[price].toString())
            console.log(listPrice[price].toString());
            price++
            //console.log(postNumber);
            //postNumber++ 
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