import { chromium, firefox, webkit } from 'playwright'
import fs from 'fs'
import path from 'path'

const formBase = async (page, form) => {
    for (let i = 0; i <= 1; i++){
        const buttons = await form.$$('button.btn.dropdown-toggle.val-wrap')
        await buttons[i].click()
        const buttonListActive = await form.$('div.site-dropdown.dropdown.expanded')
        const listActive = await buttonListActive.$$('a.val-wrap.ng-scope')
        await listActive[0].click()
        console.log(await buttons[i].innerText())
        await page.waitForTimeout(3000)
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

const openList = async (page, form, button) => {
    const buttons = await form.$$('button')
    await buttons[button].click()
    const menu = await form.$('div.site-dropdown.dropdown.expanded')
    const menuBtn = await menu.$$('a.val-wrap.ng-scope') 
    console.log('working');
    return menuBtn
}

const changeOptions = async (page, form, button) => {
    const menuBtn = await openList(page, form, button)
    for (let i = 0; i < menuBtn.length; i++){
        if (i === 0) {
            await menuBtn[i].click()
            await page.waitForTimeout(7000)
            await writeList(form)
        } else {
            const menuBtnElse = await openList(page, form, button)
            await menuBtnElse[i].click()
            await page.waitForTimeout(7000)
            await writeList(form)
        }
    }
}

const changeTwoOptions = async (page, form, button, option, buttonTwo, optionTwo) => {
    for (let i = 0; i < 2; i++){
        if (i === 0) {
            const menuBtn = await openList(page, form, button)
            await menuBtn[option].click()
            await page.waitForTimeout(7000)
        } else {
            const menuBtnElse = await openList(page, form, buttonTwo)
            await menuBtnElse[optionTwo].click()
            await page.waitForTimeout(7000)
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
                await page.waitForTimeout(7000)
                break
            case 1:
                const menuBtnTwo = await openList(form, buttonTwo)
                await menuBtnTwo[optionTwo].click()
                await page.waitForTimeout(7000)
                break
            case 2:
                const menuBtnThree = await openList(form, buttonThree)
                await menuBtnThree[optionThree].click()
                await page.waitForTimeout(7000)
                break
        }
    }
    await writeListTotal(form)
}

const bindingElementsOptions = async (page, form, option) => {
    const bindingElements = await form.$$('.custom-control.custom-radio.element_class')
    await bindingElements[option].click()
    await page.waitForTimeout(7000)
}

const web = async () => {
    const browser = await firefox.launch()
    const page = await browser.newPage()
    await page.goto('https://www.uprinting.com/brochure-printing.html')
    const form = await page.$('#product_calculator_form')
    // await collapseTrue(form)
    await formBase(page, form)
    //await bindingElementsOptions(page, form, 2)

    for (let i = 3; i <= 8; i++){
        const ciclo = i
        for (let i = 1; i <= 1; i++){
            await changeTwoOptions(page, form, 0, ciclo, 2, i)
            await changeOptions(page, form, 6)
            fs.appendFileSync(`list.txt`, '\n\n\n')
        }
    }
    
    // for (let i = 1; i <= 12; i++){
    //     const cicloPapel = i
    //     for (let i = 1; i <= 1; i++){
    //         const ciclo = i
    //         for (let i = 0; i <= 3; i++){
    //             await changeThreeOptions(page, form, 0, cicloPapel, 1, i, 12, ciclo)
    //             //await changeOptions(page, form, 1)
    //             //fs.appendFileSync(`list.txt`, '\n\n\n')
    //         }
    //         fs.appendFileSync(`list.txt`, '\n\n\n')
    //     }
    // }

    // for (let i = 0; i <= 8; i++){
    //     await changeTwoOptions(page, form, 0, 0, 0, i)
    //     await changeOptions(page, form, 5)
    //     fs.appendFileSync(`list.txt`, '\n\n\n')
    // }

    // for (let i = 1; i <= 1; i++){
    //     const ciclo = i
    //     for (let i = 0; i <= 0; i++){
    //         await changeTwoOptions(page, form, 0, ciclo, 12, i)
    //         await changeOptions(page, form, 1)
    //         fs.appendFileSync(`list.txt`, '\n\n\n')
    //     }
    // }

    console.log('END')
    await browser.close()
}

web()