import { chromium, firefox, webkit } from 'playwright'
import * as dotenv from 'dotenv'
dotenv.config()

import listPrice from './listPrice.js'

const url = 'https://www.apprinting.com/admin/'
const urlProductUpdatePrice = 'https://www.apprinting.com/admin/product_additionalinfo_price.php?product_id=3147&prod_add_opt_id=96563&sel_product_size=4427'

const qtys = [
    35,
    40,
    50,
    60,
    75,
    100,
    150,
    200,
    250,
    500,
    1000,
    2000,
    5000
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
// txtprice[35_1980256_]   txtprice[5000_1980263_]
const inputFillToPrice = async (page) => {
    await page.goto(urlProductUpdatePrice, { timeout: 300000 })
    let price = 0
    //let postNumber = 9607838  ${postNumber}
    for (let i = 259; i <= 262; i++) {
        //if( i !== 244){
            for await (const qty of qtys) {
                const id = `txtprice[${qty}_1980${i}_]`
                const inputPrice = await page.$(`[id="${id}" ]`)
                await inputPrice.fill(listPrice[price].toString())
                console.log(listPrice[price].toString());
                price++
                //console.log(postNumber);
                //postNumber++ 
            }
        //}
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