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
    for (let i = 0; i < menuBtn.length; i++){
        switch (i) {
            case 0:
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
    await page.waitForTimeout(5000)
}

const changeTwoOptions = async (page, form, button, option, buttonTwo, optionTwo) => {
    
    for (let i = 0; i < 2; i++){
        switch (i) {
            case 0:
                const menuBtn = await openList(form, button)
                await menuBtn[option].click()
                await page.waitForTimeout(5000)
            break;
            case 1:
                const menuBtnElse = await openList(form, buttonTwo)
                await menuBtnElse[optionTwo].click()
                await page.waitForTimeout(5000)
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

const web = async () => {
    const browser = await firefox.launch()
    const page = await browser.newPage()
    await page.goto('https://www.uprinting.com/brochure-printing.html')
    const form = await page.$('#product_calculator_form')

    await changeThreeOptions(page, form, 0, 8, 2, 2, 3, 1)
    await changeOptions(page, form, 6)
    fs.appendFileSync(`list.txt`, '\n\n\n')
 
    console.log('END')
    await browser.close()
}

web()