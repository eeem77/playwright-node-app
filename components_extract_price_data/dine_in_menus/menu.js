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

const writeList = async (page) => {
    const buttonsLabel = await page.$$eval('.dropdown-toggle-label', node => node.map(n => n.innerText))
    console.log(buttonsLabel);
    const price = await page.$eval('#price', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}

const writeListTotal = async (form) => {
    const buttonsLabel = await form.$$eval('button.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    const price = await form.$eval('.compute-price-loader.hidden', node => node.innerText)
    const priceSubtotal = await price.replace(',', '')
    const priceTotal = await priceSubtotal.replace('$', '')
    await buttonsLabel.push(priceTotal)
    fs.appendFileSync(`list.txt`, buttonsLabel.toString() + '\n')
}



const changeOptions = async (page, form, button) => {
    const menuBtn = await openList(page, form, button)
    //await page.waitForTimeout(5000)
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
                //await form.waitForSelector('.compute-price-loader.hidden', { state: 'hidden' })
                await page.waitForTimeout(10000)
                console.log('EEEM77')
                await writeList(page)
            break          
            default:
                const menuBtnDefault= await openList(page, form, button)
                await menuBtnDefault[i].click()
                //await form.waitForSelector('.compute-price-loader.hidden', { state: 'hidden' })
                await page.waitForTimeout(5000)
                await writeList(page)
            break
        }
    }
}

const changeOneOptions = async (page, button, option) => {
    const menuBtn = await openList(page, button)
    const optionFinal = menuBtn[option]
    await optionFinal.click()
}

const changeTwoOptions = async (page, form, button, option, buttonTwo, optionTwo) => {
    for (let i = 0; i < 2; i++){
        switch (i) {
            case 0:
                const menuBtn = await openList(form, button)
                await menuBtn[option].click()
                await form.waitForSelector('.compute-price-loader.hidden', { state: 'hidden' })
                //await page.waitForTimeout(5000)
            break;
            case 1:
                const menuBtnElse = await openList(form, buttonTwo)
                await menuBtnElse[optionTwo].click()
                await form.waitForSelector('.compute-price-loader.hidden', { state: 'hidden' })
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
                await form.waitForSelector('.compute-price-loader.hidden', { state: 'hidden' })
                //await page.waitForTimeout(5000)
                break
            case 1:
                const menuBtnTwo = await openList(form, buttonTwo)
                await menuBtnTwo[optionTwo].click()
                await form.waitForSelector('.compute-price-loader.hidden', { state: 'hidden' })
                //await page.waitForTimeout(5000)
                break
            case 2:
                const menuBtnThree = await openList(form, buttonThree)
                await menuBtnThree[optionThree].click()
                await form.waitForSelector('.compute-price-loader.hidden', { state: 'hidden' })
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
    await form.waitForSelector('.compute-price-loader.hidden', { state: 'hidden' })
    return menuBtn.length
}

const dropLinks = async (page, button) => {
    const buttons = await page.$$('.dropdown-toggle-label')
    await buttons[button].click()
    await page.waitForTimeout(1000)
    //await page.waitForSelector('.expanded', { state: 'visible' })
    //await page.screenshot({path:'./eeem77.png'})
    //const menu = await page.$('.site-dropdown.site-dropdown-group.dropdown.expanded')
    //const menu = await page.$('.dropdown-menu.menu-parent')
    const menuBtn = await page.$$('a.attr-value.val-wrap')
    const menuBtnLabel = await page.$$eval('a.attr-value.val-wrap', node => node.map(n => n.innerText))
    console.log('Working');
    // console.log(menuBtn);
    return menuBtn
}

const web = async () => {
    // const browser = await chromium.launch({
    //     proxy: {
    //       server: '80.228.235.6:80'
    //       //username: 'usr',
    //       //password: 'pwd'
    //     }
    // })
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://www.uprinting.com/dine-in-menu-printing.html', {timeout:150000})
    //const form = await page.$('#product_calculator_wrapper')
    // const prueba = await page.$$eval('.dropdown-toggle-label', node => node.map(n => n.innerText))
    // console.log(prueba);
    //await changeOneOptions(form, 0, 1)
    const links = await dropLinks(page, 0)
    await links[2].click()
    await page.waitForTimeout(5000)
    //await page.waitForSelector('#price', { state: 'visible' })
    await writeList(page)
    console.log(links.length);
    // const openClick = open[2]
    // await openClick.click()
    // await page.waitForTimeout(5000)
    //await page.waitForSelector('.compute-price-loader.hidden', { state: 'hidden' })
    // console.log(open.length);
    //await form.screenshot({path:'./eeem77.png'})
    //await changeOneOptions(page, 0, 1)
    //await writeList(page)
 
    //const options = await openList(page, 1)
    // for(let i = 0; i < 5; i++){
    //     await writeList(page)
    //     await changeOneOptions(page, 5, i)
    //     //fs.appendFileSync(`list.txt`, '\n\n\n')
    // }
    // await changeOptions(page, form, 5)


    // for (let i = 0; i < 5; i++){
    //     
    //     
    //     fs.appendFileSync(`list.txt`, '\n\n\n')
    //     console.log('finn de ciclo');
    // }
    //const prueba = await openList(page, form, 0)
    // await form.waitForSelector('.attr-value.val-wrap', { state: 'hidden' })
    // await prueba[1].click()


    //console.log(prueba.length);
    // await changeOneOptions(page, form, 0, 0)
    // console.log('terminado');
    
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
        // for(let a = 0; a <= 4; a++){
        //     await changeOneOptions(page, form, 0, a)
        //     console.log('terminado');
        //     //await changeOptions(page, form, 5)
        //     //await changeOneOptions(page, form, 5, 0)
        //    // fs.appendFileSync(`list.txt`, '\n\n\n')
        // }
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