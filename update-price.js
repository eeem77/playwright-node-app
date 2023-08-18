import { chromium, firefox, webkit } from 'playwright'
import * as dotenv from 'dotenv'
dotenv.config()

import listPrice from './listPrice.js'

const url = 'https://www.apprinting.com/admin/'
const urlProductUpdatePrice = 'https://www.apprinting.com/admin/product_additionalinfo_price.php?product_id=24&prod_add_opt_id=96449&sel_product_size=40'

const qtys = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,

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
// txtprice[1_1979957_]
const inputFillToPrice = async (page) => {
    await page.goto(urlProductUpdatePrice, { timeout: 300000 })
    let price = 0
    //let postNumber = 9607838  ${postNumber}
    for (let i = 959; i <= 959; i++) {
        for await (const qty of qtys) {
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