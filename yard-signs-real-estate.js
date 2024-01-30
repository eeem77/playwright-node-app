import { chromium, firefox, webkit } from 'playwright'
import fs from 'fs'
import path from 'path'

const writeList = async (page) => {
    const buttonsLabel = await page.$$eval('.dropdown-toggle-label', node => node.map(n => n.innerText))
    const price = await page.$eval('.calc-price.subtotal-price', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}

const openList = async (page, button) => {
    //console.log('entro en la funcion openList');
    //await page.waitForSelector('button.btn.dropdown-toggle',{state: 'attached'})
    const buttons = await page.$$('[name="attr5"]')
    await buttons[button].click()
    //await page.waitForTimeout(3000)
    //await page.screenshot({path:'./eeem77.jpg'})
    const menu = await page.$('div.site-dropdown.dropdown.expanded')
    const menuBtn = await menu.$$('a.attr-value.val-wrap ')
    const menuBtnText = await menu.$$eval('.dropdown-toggle-label', node => node.map(n => n.innerText))

    console.log('Working');
    console.log(menuBtnText)
    return menuBtn
}

const changeOptions = async (page, button) => {
    const menuBtn = await openList(page, button)
    for (let i = 0; i < menuBtn.length; i++) {
        switch (i) {
            // case 0:
            //     break
            // case 1:
            //     break
            // case 2:
            //     break
            // case 3:
            //     break
            // case 4:
            // break
            // case 5:
            // break
            case 0:
                //console.log(menuBtn.length);
                await menuBtn[i].click()
                //await page.waitForSelector('#price')
                await page.waitForTimeout(10000)
                //await page.screenshot({ path: './pepa.jpg' })
                //await page.waitForSelector('#price',{state: 'attached'})
                await writeList(page)
                break
            default:
                const menuBtnDefault = await openList(page, button)
                await menuBtnDefault[i].click()
                //await page.waitForSelector('#price')
                await page.waitForTimeout(10000)
                //await page.waitForSelector('#price',{state: 'attached'})
                await writeList(page)
                break
        }
    }
}

const changeOneOptions = async (page, button, option) => {
    console.log('entro en la funcion changeOneOptions');
    const menuBtn = await openList(page, button)
    //await page.screenshot({path:'./eeem77.jpg'})
    await menuBtn[option].click()
    await page.waitForSelector('#price')
    //await page.waitForTimeout(3000)
}

const web = async () => {
    // const browser = await firefox.launch({
    //     proxy: {
    //       server: '195.154.184.80:8080'
    //       //username: 'usr',
    //       //password: 'pwd'
    //     }
    // })
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://www.uprinting.com/real-estate-a-frame-signs.html', { timeout: 200000 })


    await page.waitForTimeout(15000)
    // class="multi-calc-button-container ng-scope"
    // [
    //     'Frame + 1 Sign (Single Sided)',
    //     '29.5” x 33”',
    //     'Black',
    //     'Metal Rod A-Frame',
    //     '24" x 18"',
    //     'Front Only',
    //     '3/16" Corrugated Plastic',
    //     'Two grommets on top',
    //     'None',
    //     '1',
    //     '1 Business Day'
    //   ]

    //await btnDisplayOptions.waitForElementState('')

    await page.waitForSelector('div.multi-calc-button.even', { state: 'visible' })
    const btnDisplayOptions = await page.$$('.multi-calc-button-container.ng-scope')
    console.log(btnDisplayOptions.length);
    await btnDisplayOptions[1].click()
    //await page.getByLabel('div.multi-calc-button.even').fill('true');
    await page.waitForTimeout(10000)
    await page.screenshot({ path: './screenshot.png', fullPage: true });
    //const fondo = await page.$('.calculator-shipping-container')
    const price = await page.$$('.accessibility-price.hidden')
    
    console.log(await price[1].$eval('span.calc-price.subtotal-price', node => node.innerText));
    //await page.waitForSelector('#price',{state: 'attached'})
    //    const optionsOne = await page.$$eval('.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    //    console.log(optionsOne);

    //    const prueba = await page.$$('[name="attr5"]')
    //    await prueba[2].click()
    //await page.screenshot({ path: './eeem77.jpg' })
    //[ '1', '', '1', '' ]
    //console.log(prueba);
    //await changeOneOptions(page, 0, 0)
    //await changeOneOptions(page, 0, 1)
    // await changeOneOptions(page, 1, 4)
    // await changeOneOptions(page, 2, 7)
    // await changeOneOptions(page, 5, 2)
    // const optionsOne = await page.$$eval('.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    // console.log(optionsOne);

    //await changeOptions(page, 2)


    console.log('END')
    await browser.close()
}

web()