import { chromium, firefox, webkit } from 'playwright'
import fs from 'fs'

const formBase = async (page, form) => {
    const buttons = await form.$$('button.btn.dropdown-toggle.btn-dropdown')
    let btn = 0
    for (let i = 0; i < buttons.length; i++){
        i === 0 ? btn = 1 : btn = 0
        const btns = await form.$$('button.btn.btn-dropdown')
        await btns[i].click()
        const menu = await form.$('div.dropdown-menu.show')
        const menuBtn = await menu.$$('a.dropdown-item')
        await menuBtn[btn].click()
        console.log(await btns[i].innerText())
        await page.waitForTimeout(5000)
    }
}

const collapseTrue = async (form) => {
    const collapse = await form.$$('a.group-collapse-button')
    await collapse[0].click()
    await collapse[1].click()
    await collapse[2].click()
}

const writeList = async (form) => {
    const buttonsLabel = await form.$$eval('button.btn.btn-dropdown', node => node.map(n => n.innerText))
    const price = await form.$eval('#disp_product_price', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}

const writeListTotal = async (form) => {
    const buttonsLabel = await form.$$eval('button.btn.btn-dropdown', node => node.map(n => n.innerText))
    const price = await form.$eval('#disp_printing_price', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}

const openList = async (form, button) => {
    const buttons = await form.$$('button.btn.dropdown-toggle.btn-dropdown')
    await buttons[button].click()
    const menu = await form.$('div.dropdown-menu.show')
    const menuBtn = await menu.$$('a.dropdown-item') 
    return menuBtn
}

const changeOptions = async (page, form, button) => {
    const menuBtn = await openList(form, button)
    for (let i = 0; i < menuBtn.length; i++){
        if (i === 0) {
            await menuBtn[i].click()
            await page.waitForTimeout(5000)
            await writeList(form)
        } else {
            const menuBtnElse = await openList(form, button)
            await menuBtnElse[i].click()
            await page.waitForTimeout(5000)
            await writeList(form)
        }
    }
}

const changeTwoOptions = async (page, form, button, option, buttonTwo, optionTwo) => {
    for (let i = 0; i < 2; i++){
        if (i === 0) {
            const menuBtn = await openList(form, button)
            await menuBtn[option].click()
            await page.waitForTimeout(5000)
        } else {
            const menuBtnElse = await openList(form, buttonTwo)
            await menuBtnElse[optionTwo].click()
            await page.waitForTimeout(5000)
        }
    }
    const buttonsLabel = await form.$$eval('button.btn.btn-dropdown', node => node.map(n => n.innerText))
    console.log(buttonsLabel)
}

const changeThreeOptions = async (page, form, button, option, buttonTwo, optionTwo, buttonThree, optionThree) => {
    for (let i = 0; i <= 2; i++){
        switch (i) {
            case 0:
                const menuBtn = await openList(form, button)
                await menuBtn[option].click()
                await page.waitForTimeout(5000)
                break
            case 1:
                const menuBtnTwo = await openList(form, buttonTwo)
                await menuBtnTwo[optionTwo].click()
                await page.waitForTimeout(5000)
                break
            case 2:
                const menuBtnThree = await openList(form, buttonThree)
                await menuBtnThree[optionThree].click()
                await page.waitForTimeout(5000)
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
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://www.printingcenterusa.com/printing/booklet-printing')
    const form = await page.$('form')
    await collapseTrue(form)
    await formBase(page, form)
    //await bindingElementsOptions(page, form, 2)

    for (let i = 8; i <= 12; i++){
        const ciclo = i
        for (let i = 0; i <= 2; i++){
            await changeTwoOptions(page, form, 0, ciclo, 13, i)
            await changeOptions(page, form, 1)
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

    // for (let i = 1; i <= 1; i++){
    //     await changeTwoOptions(page, form, 0, 1, 12, i)
    //     await changeOptions(page, form, 1)
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