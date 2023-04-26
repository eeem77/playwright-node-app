import { chromium, firefox, webkit } from 'playwright'
import * as dotenv from 'dotenv'
dotenv.config()

import listPrice from './listPrice.js'

const url = 'https://www.apprinting.com/admin/'
const urlProductUpdatePrice = 'https://www.apprinting.com/admin/product_additionalinfo_price.php?product_id=3201&prod_add_opt_id=86046&sel_product_size=3463'

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
// txtprice[10_1829044_9384514]
const inputFillToPrice = async (page) => {
    await page.goto(urlProductUpdatePrice)
    let price = 0
    let postNumber = 9386866
    for (let i = 44; i <= 64; i++){
        for await (const qty of qtys){
            const id = `txtprice[${qty}_18290${i}_${postNumber}]`
            const inputPrice = await page.$(`[id="${id}" ]`)
            await inputPrice.fill(listPrice[price].toString())
            console.log(listPrice[price].toString());
            console.log(postNumber);
            price++
            postNumber++ 
            // if(postNumber === 9332248){
            //     postNumber = 9332744
            // }else if(postNumber === 9332759) {
            //     postNumber = 9332914
            // } else if(postNumber === 9333073) {
            //     postNumber = 9333083
            // } else if(postNumber === 9333114) {
            //     postNumber = 9333151
            // } else {
            //     postNumber++ 
            // }
        }
    }
    const btnSave = await page.$('#btn-action-save')
    await btnSave.click()
    await page.waitForTimeout(5000)
}

// const resetPrice = async (page) => {
//     const inputs = await page.$$eval('#txtprice', node => node.map(n => n.innerHTML))
//     console.log(inputs)
// }

const updatePrice = async () => {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await login(page)
    //await resetPrice(page)
    await inputFillToPrice(page)
    console.log('END')
    await browser.close()
}

updatePrice()