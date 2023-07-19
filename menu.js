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
    const price = await form.$eval('#price', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}

const writeListTotal = async (form) => {
    const buttonsLabel = await form.$$eval('button.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    const price = await form.$eval('#price', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}

const openList = async (form, button) => {
    const buttons = await form.$$('.btn.dropdown-toggle')
    //console.log(buttons);
    await buttons[button].click()
    const menu = await form.$('.dropdown-menu.menu-parent')
    const menuBtn = await menu.$$('a.attr-value.val-wrap')
    console.log(menuBtn);
    console.log('Working');
    return menuBtn
}

const changeOptions = async (page, form, button) => {
    const menuBtn = await openList(form, button)
    for (let i = 0; i < menuBtn.length; i++){
        switch (i) {
            // case 0:
            // break
            // case 1:
            // break
            // case 2:
            // break
            // case 3:
            // break
            // case 4:
            // break
            // case 5:
            // break
            case 0:
                await menuBtn[i].click()
                await form.waitForSelector('#price', { state: 'visible' })
                //await page.waitForTimeout(5000)
                await writeList(form)
            break          
            default:
                const menuBtnDefault= await openList(form, button)
                await menuBtnDefault[i].click()
                await form.waitForSelector('#price', { state: 'visible' })
                //await page.waitForTimeout(5000)
                await writeList(form)
            break
        }
    }
}

const changeOneOptions = async (page, form, button, option) => {
    const menuBtn = await openList(form, button)
    await menuBtn[option].click()
    await form.waitForSelector('#price', { state: 'visible' })
    //await page.waitForTimeout(20000)
}

const changeTwoOptions = async (page, form, button, option, buttonTwo, optionTwo) => {
    for (let i = 0; i < 2; i++){
        switch (i) {
            case 0:
                const menuBtn = await openList(form, button)
                await menuBtn[option].click()
                await form.waitForSelector('#price', { state: 'visible' })
                //await page.waitForTimeout(5000)
            break;
            case 1:
                const menuBtnElse = await openList(form, buttonTwo)
                await menuBtnElse[optionTwo].click()
                await form.waitForSelector('#price', { state: 'visible' })
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
                await form.waitForSelector('#price', { state: 'visible' })
                //await page.waitForTimeout(5000)
                break
            case 1:
                const menuBtnTwo = await openList(form, buttonTwo)
                await menuBtnTwo[optionTwo].click()
                await form.waitForSelector('#price', { state: 'visible' })
                //await page.waitForTimeout(5000)
                break
            case 2:
                const menuBtnThree = await openList(form, buttonThree)
                await menuBtnThree[optionThree].click()
                await form.waitForSelector('#price', { state: 'visible' })
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

const searchLen = async (page, form, option) => {
    const menuBtn = await openList(form, option)
    await menuBtn[0].click()
    await form.waitForSelector('#price', { state: 'visible' })
    return menuBtn.length
}

const web = async () => {
    const browser = await firefox.launch()
    const page = await browser.newPage()
    await page.goto('https://www.uprinting.com/dine-in-menu-printing.html?aind=prod_up_products&aqid=9107c71c0158d1a6749385080799b18a&aoid=fc350edfe0a29b0836717f62dc57bf1187a87baef5a0dcde64b3a49b0f6f6d16&apos=1&aut=0a9e66a4-263b-11ee-96b5-0242ac110004-1689774551&asrc=results_page&akywd=menu&stype=algolia&mdl=products', {timeout:150000})
    const form = await page.$('.calculator-product-region')
    
    
    // for (let index = 10; index <= 10; index++) {
    //     await changeOneOptions(page, form, 2, index)
    //     let size = await searchLen(page, form, 0)
    //     for (let i = 0; i < size - 1; i++){
    //         await changeOneOptions(page, form, 0, i)
    //         await changeOptions(page, form, 5)
    //         fs.appendFileSync(`list.txt`, '\n\n\n')
    //     }
    // }
    //await changeOneOptions(page, form, 4, 1)
    //const sizes = [8,9,10,11]
    //const paper = await searchLen(page, form, 1)
    // await changeOneOptions(page, form, 5, 6)
    // const service = await form.$('.checkbox-icon-override')
    // await service.click()
    //for(let i = 6; i <= 8; i++){
        for(let a = 0; a <= 4; a++){
            await changeOneOptions(page, form, 0, a)
            console.log('terminado');
            //await changeOptions(page, form, 5)
            //await changeOneOptions(page, form, 5, 0)
           // fs.appendFileSync(`list.txt`, '\n\n\n')
        }
    //}
    // for (let i = 10; i <= 11; i++){
    //     for( let a = 1; a <= 2; a++){
    //         await changeTwoOptions(page, form, 0, i, 6, a)
    //         await changeOptions(page, form, 5)
    //         fs.appendFileSync(`list.txt`, '\n\n\n')
    //     }
    // }
    
 
    console.log('END')
    await browser.close()
}

web()