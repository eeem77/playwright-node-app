import { chromium, firefox, webkit } from 'playwright'
import fs from 'fs'

const formBase = async (page, form) => {
    let clickList = 2
    for (let i = 0; i < 1; i++){
        switch (i) {
            case 2:
                clickList = 1
            break;
            case 3:
                clickList = 1
            break;
        }
        const buttons = await form.$$('button.btn.dropdown-toggle.val-wrap')
        await buttons[i].click()
        const buttonListActive = await form.$('div.site-dropdown.dropdown.expanded')
        const listActive = await buttonListActive.$$('a.val-wrap.ng-scope')
        await listActive[clickList].click()
        console.log(await buttons[i].innerText())
        await page.waitForTimeout(5000)
    }
    const buttonsInnerText = await form.$$eval('button.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    console.log(buttonsInnerText)
}

// const collapseTrue = async (form) => {
//     const collapse = await form.$$('a.group-collapse-button')
//     await collapse[0].click()
//     await collapse[1].click()
//     await collapse[2].click()
// }

const writeList = async (form) => {
    const buttonsLabel = await form.$$eval('.btn.dropdown-toggle.btn-dropdown', node => node.map(n => n.innerText))
    const qty = await form.$('#prdqty')
    const price = await form.$eval('#disp_product_price', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(await qty.inputValue())
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}

const writeListTotal = async (form) => {
    const buttonsLabel = await form.$$eval('button.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    const price = await form.$eval('.div_calculator.ld-over.running', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}

const openList = async (form, button) => {
    const buttons = await form.$$('.btn.dropdown-toggle.btn-dropdown')
    await buttons[button].click()
    const menuBtn = await form.$$('a.dropdown-item')
    console.log('Working')
    return menuBtn
}

const changeOptions = async (page, form, button) => {
    const menuBtn = await openList(form, button)
    for (let i = 0; i < menuBtn.length; i++){
        switch (i) {
            case 0:
            break
            case 1:
            break
            case 2:
            break
            // case 3:
            // break
            // case 4:
            // break
            // case 5:
            // break
            case 3:
                await menuBtn[i].click()
                await form.waitForSelector('.div_calculator.ld-over.running', { state: 'detached' })
                //await page.waitForTimeout(5000)
                await writeList(form)
            break          
            default:
                const menuBtnDefault= await openList(form, button)
                await menuBtnDefault[i].click()
                await form.waitForSelector('.div_calculator.ld-over.running', { state: 'detached' })
                //await page.waitForTimeout(5000)
                await writeList(form)
            break
        }
    }
}

const changeOneOptions = async (form, button, option) => {
    const menuBtn = await openList(form, button)
    await menuBtn[option].click()
    await form.waitForSelector('.div_calculator.ld-over.running', { state: 'detached' })
    //await page.waitForTimeout(5000)
}

const changeTwoOptions = async (page, form, button, option, buttonTwo, optionTwo) => {
    for (let i = 0; i < 2; i++){
        switch (i) {
            case 0:
                const menuBtn = await openList(form, button)
                await menuBtn[option].click()
                await form.waitForSelector('.div_calculator.ld-over.running', { state: 'detached' })
                //await page.waitForTimeout(5000)
            break;
            case 1:
                const menuBtnElse = await openList(form, buttonTwo)
                await menuBtnElse[optionTwo].click()
                await form.waitForSelector('.div_calculator.ld-over.running', { state: 'detached' })
                //await page.waitForTimeout(5000)
            break;
        }
    }
    
    const buttonsLabel = await form.$$eval('button.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    console.log(buttonsLabel)
}

const changeThreeOptions = async (page, form, button, option, buttonTwo, optionTwo, buttonThree, optionThree) => {
    for (let i = 0; i <= 2; i++){
        switch (i) {
            case 0:
                const menuBtn = await openList(form, button)
                await menuBtn[option].click()
                await form.waitForSelector('.div_calculator.ld-over.running', { state: 'detached' })
                //await page.waitForTimeout(5000)
                break
            case 1:
                const menuBtnTwo = await openList(form, buttonTwo)
                await menuBtnTwo[optionTwo].click()
                await form.waitForSelector('.div_calculator.ld-over.running', { state: 'detached' })
                //await page.waitForTimeout(5000)
                break
            case 2:
                const menuBtnThree = await openList(form, buttonThree)
                await menuBtnThree[optionThree].click()
                await form.waitForSelector('.div_calculator.ld-over.running', { state: 'detached' })
                //await page.waitForTimeout(5000)
                break
        }
    }
    //await writeListTotal(form)
}

const bindingElementsOptions = async (page, form, option) => {
    const bindingElements = await form.$$('.custom-control.custom-radio.element_class')
    await bindingElements[option].click()
    await page.waitForTimeout(5000)
}

const searchLen = async (form, option) => {
    const menuBtn = await openList(form, option)
    await menuBtn[0].click()
    await form.waitForSelector('.div_calculator.ld-over.running', { state: 'detached' })
    return menuBtn.length
}

const quantitys = [
    100,
    200,
    300,
    400,
    500,
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
    20000,
    30000,
    40000,
    50000,
    60000,
    70000,
    80000,
    90000,
    100000,
]

const web = async () => {
    const browser = await chromium.launch({
        proxy: {
          server: '5.78.88.41:8080'
          //username: 'usr',
          //password: 'pwd'
        }
    })
    
    //const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://www.rivalbranding.com/rectangle-roll-labels-stock-sizes/', {timeout:150000})
    
    const form = await page.$('#price_calculator')

    const options = await searchLen(form, 1)
    
    await changeOneOptions(form, 0, 8) //size
    //console.log(options)
    for (let i = 1; i < options; i++) {
        await changeOneOptions(form, 1, i)
        for await (const quantity of quantitys) {
            const qty = await form.$('#prdqty')
            await qty.fill(quantity.toString())
            await qty.press('Enter')
            await form.waitForSelector('.div_calculator.ld-over.running', { state: 'detached' })
            await writeList(form)
            console.log(i)
        }
        fs.appendFileSync(`list.txt`, '\n\n\n')
    }  
 
    console.log('END')
    await browser.close()
}

web()