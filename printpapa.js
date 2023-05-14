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
    //let newButton = button
    const menuBtn = await openList(form, button)
    //console.log(menuBtn.length)
    //if (menuBtn.length > 33){
        for (let i = 0; i < menuBtn.length; i++){
            switch (i) {
                case 0:
                    await menuBtn[i].click()
                    await page.waitForTimeout(5000)
                    await writeList(form)
                    //newButton = button - 1
                break
                // case 1:
                //     const menuBtnElse = await openList(form, newButton)
                //     await menuBtnElse[i].click()
                //     await page.waitForTimeout(5000)
                //     await writeList(form)
                // break
                // case 3:
                //     const menuBtnCase = await openList(form, newButton)
                //     await menuBtnCase[i].click()
                //     await page.waitForTimeout(5000)
                //     await writeList(form)
                // break            
                default:
                    const menuBtnDefault= await openList(form, button)
                    await menuBtnDefault[i].click()
                    await page.waitForTimeout(5000)
                    await writeList(form)
                break
            }
        }
    // }else{
    //     await menuBtn[0].click()
    //     await page.waitForTimeout(5000)
    // }
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
    const browser = await firefox.launch()
    const page = await browser.newPage()
    await page.goto('https://www.printpapa.com/eshop/pc/2-Part-Carbonless-Form-Letter-172p3771.htm')
    const form = await page.$('.product-details')


    const options = await form.$$eval('.single-prod-optn', node => node.map(n => n.innerText))
    const qty = await form.$('[name="quantity"]')
    const price = await form.$('#txtTotalAfterShip')
    const optionsQty = await qty.$$eval('option', node => node.map(n => n.innerText))
    console.log(options)
    console.log(await qty.inputValue())
    console.log(await price.inputValue())
    console.log(optionsQty)
    // await collapseTrue(form)
    //await formBase(page, form)
    //await bindingElementsOptions(page, form, 2)

    // for (let i = 0; i <= 0; i++){
    //     await changeTwoOptions(page, form, 0, 0, 0, i)
    //     await changeOptions(page, form, 5)
    //     fs.appendFileSync(`list.txt`, '\n\n\n')
    // }

    //await changeTwoOptions(page, form, 2, 1, 3, 1)
    //const menuBtn = await openList(form, button)
    //menuBtn.length
    //for (let i = 2; i <= 2; i++){
    //const ciclo = i
    // let count = 1
    // for (let i = 8; i <= 8; i++){
    //     const ciclo = i
    //     for (let i = 0; i <= count; i++){
    //         switch (i) {
    //             case 0:
    //                 await changeTwoOptions(page, form, 0, ciclo, 6, 0)
    //                 //await changeOptions(page, form, 5)
    //                 const menuBtn = await openList(form, 6)
    //                 await menuBtn[0].click()
    //                 await page.waitForTimeout(5000)
    //                 count = menuBtn.length - 1
    //                 //fs.appendFileSync(`list.txt`, '\n\n\n')
    //             break

    //             case 1:                
    //             break
    //             // case 2:                
    //             // break
    //             // case 3:
    //             // break
    //             // case 4:
    //             // break
    //             // case 5:
    //             // break
    //             // case 6:
    //             // break
    //             // case 7:
    //             // break
    //             // case 8:
    //             // break
            
    //             default:
    //                 await changeOneOptions(page, form, 6, i)
    //                 await changeOptions(page, form, 5)
    //                 fs.appendFileSync(`list.txt`, '\n\n\n') 
    //             break
    //         }
    //     }
    //     count = 1
    // }
    // for (let i = 1; i <= 10; i++){
        
    //     await changeTwoOptions(page, form, 0, 4, 2, i)
    //     await changeOptions(page, form, 6)
    //     fs.appendFileSync(`list.txt`, '\n\n\n')
    
    // }
    //}
    
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

    // await changeTwoOptions(page, form, 0, 0, 2, 1)
    // for (let i = 0; i <= 7; i++){
    //     const ciclo = i
    //     for (let i = 1; i <= 2; i++){
    //         changeOneOptions(page, form, 5, i)
    //         await changeOptions(page, form, 6)
    //         fs.appendFileSync(`list.txt`, '\n\n\n')
    //     }
    // }

    console.log('END')
    await browser.close()
}

web()