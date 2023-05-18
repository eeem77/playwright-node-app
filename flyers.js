import { chromium, firefox, webkit } from 'playwright'
import fs from 'fs'
import path from 'path'

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
    const buttonsLabel = await form.$$eval('button.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    const price = await form.$eval('.ng-binding.subtotal-price', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}

const writeListTotal = async (form) => {
    const buttonsLabel = await form.$$eval('button.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    const price = await form.$eval('.ng-binding.subtotal-price', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}

const openList = async (form, button) => {
    const buttons = await form.$$('button.btn.dropdown-toggle')
    await buttons[button].click()
    const menu = await form.$('div.site-dropdown.dropdown.expanded')
    const menuBtn = await menu.$$('a.val-wrap.ng-scope')
    console.log('Working');
    return menuBtn
}

const changeOptions = async (page, form, button) => {
    const menuBtn = await openList(form, button)
    for (let i = 3; i < menuBtn.length; i++){
        switch (i) {
            case 3:
                await menuBtn[i].click()
                await form.waitForSelector('.ng-binding.subtotal-price', { state: 'attached' })
                //await page.waitForTimeout(5000)
                await writeList(form)
            break          
            default:
                const menuBtnDefault= await openList(form, button)
                await menuBtnDefault[i].click()
                await form.waitForSelector('.ng-binding.subtotal-price', { state: 'attached' })
                //await page.waitForTimeout(5000)
                await writeList(form)
            break
        }
    }
}

const changeOneOptions = async (page, form, button, option) => {
    const menuBtn = await openList(form, button)
    await menuBtn[option].click()
    await form.waitForSelector('.ng-binding.subtotal-price', { state: 'attached' })
    //await page.waitForTimeout(5000)
}

const changeTwoOptions = async (page, form, button, option, buttonTwo, optionTwo) => {
    if(option === undefined || optionTwo === undefined){
        option = 0
        optionTwo = 0
    }
    for (let i = 0; i < 2; i++){
        switch (i) {
            case 0:
                const menuBtn = await openList(form, button)
                await menuBtn[option].click()
                await form.waitForSelector('.ng-binding.subtotal-price', { state: 'attached' })
                //await page.waitForTimeout(5000)
            break;
            case 1:
                const menuBtnElse = await openList(form, buttonTwo)
                await menuBtnElse[optionTwo].click()
                await form.waitForSelector('.ng-binding.subtotal-price', { state: 'attached' })
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
                await form.waitForSelector('.ng-binding.subtotal-price', { state: 'attached' })
                //await page.waitForTimeout(5000)
                break
            case 1:
                const menuBtnTwo = await openList(form, buttonTwo)
                await menuBtnTwo[optionTwo].click()
                await form.waitForSelector('.ng-binding.subtotal-price', { state: 'attached' })
                //await page.waitForTimeout(5000)
                break
            case 2:
                const menuBtnThree = await openList(form, buttonThree)
                await menuBtnThree[optionThree].click()
                await form.waitForSelector('.ng-binding.subtotal-price', { state: 'attached' })
                //await page.waitForTimeout(5000)
                break
        }
    }
    await writeListTotal(form)
}

const bindingElementsOptions = async (page, form, option) => {
    const bindingElements = await form.$$('.custom-control.custom-radio.element_class')
    await bindingElements[option].click()
    await page.waitForTimeout(5000)
}

const searchLen = async (page, form, option) => {
    const menuBtn = await openList(form, option)
    await menuBtn[0].click()
    await form.waitForSelector('.ng-binding.subtotal-price', { state: 'attached' })
    return menuBtn.length
}

const web = async () => {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://www.uprinting.com/business-flyers-printing.html?aind=prod_up_products&aqid=7bf96f9d338305ea57e1b805dd59a128&aoid=f331c17e6a882f29f01fad7e1f17782493060fd80603ce009d25930af8722460&apos=1&aut=87a96bd2-f4e3-11ed-be23-0242ac110002-1684349358&asrc=results_page&akywd=Flyers&stype=algolia&mdl=products', {timeout:150000})
    const form = await page.$('#product_calculator_form')
    
    
    // for (let index = 10; index <= 10; index++) {
    //     await changeOneOptions(page, form, 2, index)
    //     let size = await searchLen(page, form, 0)
    //     for (let i = 0; i < size - 1; i++){
    //         await changeOneOptions(page, form, 0, i)
    //         await changeOptions(page, form, 5)
    //         fs.appendFileSync(`list.txt`, '\n\n\n')
    //     }
    // }
    for (let i = 7; i <= 11; i++){
        await changeTwoOptions(page, form, 0, i, 3, 1)
        await changeOptions(page, form, 5)
        fs.appendFileSync(`list.txt`, '\n\n\n')
    }
    
 
    console.log('END')
    await browser.close()
}

web()