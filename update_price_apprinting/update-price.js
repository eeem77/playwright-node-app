import { chromium, firefox, webkit } from 'playwright'
import * as dotenv from 'dotenv'
dotenv.config()

import listPrice from './listPrice.js'

const url = 'https://www.apprinting.com/admin/'
const urlProductUpdatePrice = 'https://www.apprinting.com/admin/product_additionalinfo_price.php?product_id=3667&prod_add_opt_id=95769&sel_product_size=4138'

const qtys = [
    100,
    150,
    200,
    250,
    500,
    1000,
    2000,
    2500,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
    15000,
    20000,
    25000,
    30000,
    35000,
    40000,
    45000,
    50000,
    55000,
    60000,
    65000,
    70000,
    75000,
    80000,
    85000,
    90000,
    95000,
    100000
]

const login = async (page) => {
    await page.goto(url, { timeout: 150000 })
    const user = await page.$('#username')
    const pass = await page.$('#password')
    const btn = await page.$('button')
    await user.fill(process.env.LOGIN_USER)
    await pass.fill(process.env.LOGIN_SECRET_KEY)
    await btn.click()
    await page.waitForTimeout(5000)
    console.log('login: OK')
}
// txtprice[100_1971242_9607838]
const inputFillToPrice = async (page) => {
    await page.goto(urlProductUpdatePrice)
    let price = 0
    //let postNumber = 9607838  ${postNumber}
    for (let i = 247; i <= 248; i++){
        for await (const qty of qtys){
            const id = `txtprice[${qty}_1971${i}_]`
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