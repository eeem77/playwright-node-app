import { chromium, firefox, webkit } from 'playwright'
import fs from 'fs'
import path from 'path'

const formBase = async (page, form) => {
    let clickList = 2
    for (let i = 0; i < 1; i++) {
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
    const buttonsLabel = await page.$$eval('button.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    const price = await page.$eval('.calc-price.subtotal-price', node => node.innerText)
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
    const menuBtn = await menu.$$('a.attr-value.val-wrap')
    console.log('Working');
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
                await page.waitForTimeout(5000)
                //await page.screenshot({ path: './pepa.jpg' })
                await writeList(page)
                break
            default:
                const menuBtnDefault = await openList(page, button)
                await menuBtnDefault[i].click()
                //await page.waitForSelector('#price')
                await page.waitForTimeout(5000)
                await writeList(page)
                break
        }
    }
}

const changeOneOptions = async (page, button, option) => {
    const menuBtn = await openList(page, button)
    await menuBtn[option].click()
    //await page.waitForSelector('#price')
    await page.waitForTimeout(10000)
}

const changeTwoOptions = async (form, button, option, buttonTwo, optionTwo) => {
    for (let i = 0; i < 2; i++) {
        switch (i) {
            case 0:
                const menuBtn = await openList(form, button)
                await menuBtn[option].click()
                //await form.waitForSelector('#price')
                await form.waitForTimeout(5000)
                break;
            case 1:
                const menuBtnElse = await openList(form, buttonTwo)
                await menuBtnElse[optionTwo].click()
                //await form.waitForSelector('#price')
                await page.waitForTimeout(5000)
                break;
        }
    }

    const buttonsLabel = await form.$$eval('button.btn.dropdown-toggle.val-wrap', node => node.map(n => n.innerText))
    console.log(buttonsLabel)
}

const changeThreeOptions = async (page, form, button, option, buttonTwo, optionTwo, buttonThree, optionThree) => {
    for (let i = 0; i <= 2; i++) {
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
    await form.waitForSelector('#price')
    return menuBtn.length
}

const qtyActions = async (page, button) => {
    const btn = await page.$('[name="attr5"]')
    await btn.click()
    const options = await page.$('.dropdown-attr-5')
    const optionsList = await options.$$('a.attr-value.val-wrap')
    await optionsList[button].click()
    await page.waitForSelector('#price')
    await writeList(page)
}

const qtyLength = async (page) => {
    const btn = await page.$('[name="attr5"]')
    await btn.click()
    const options = await page.$('.dropdown-attr-5')
    const optionsList = await options.$$('a.attr-value.val-wrap')
    return optionsList.length
}

const web = async () => {
    // const browser = await firefox.launch({
    //     proxy: {
    //       server: '195.154.184.80:8080'
    //       //username: 'usr',
    //       //password: 'pwd'
    //     }
    // })
    const browser = await firefox.launch()
    const page = await browser.newPage()
    await page.goto('https://www.uprinting.com/yard-signs.html', { timeout: 300000 })

    await page.waitForTimeout(10000)
    //await frame.waitForURL('https://www.uprinting.com/10-envelopes.html')
    //await changeTwoOptions(page, 2, 1, 1, 4)
    await changeOneOptions(page, 2, 1)
    await changeOneOptions(page, 1, 4)
    // const optionsOne = await page.$$eval('.btn.dropdown-toggle.val-wrap ', node => node.map(n => n.innerText))
    // console.log(optionsOne);
    // await changeOneOptions(page, 2, 1)
    // await page.waitForTimeout(10000)
    // console.log("termine primer bloque");
    // await changeOneOptions(page, 1, 4)
    // await page.waitForTimeout(10000)
    // console.log("termine segundo bloque");
    // const optionsTwo = await page.$$eval('.btn.dropdown-toggle.val-wrap ', node => node.map(n => n.innerText))
    // console.log(optionsTwo);
    await changeOptions(page, 6)

    //const inkColor = await page.$('.multi-calc-panel.even')
    //await inkColor.click()
    //await page.waitForSelector('#calculator_15')
    //await page.waitForSelector('.multi-calc-panel.even.active')
    //await page.waitForTimeout(50000)
    //await page.screenshot({path:'./eeem77.jpg'})

    //for (let i = 0; i <= 5; i++) {
        //await changeOneOptions(page, 0, i)

        //const repeat = await searchLen(page, 2)
        // for (let a = 0; a <= 2; a++) {
        //     // if (a === 0 || a === 7 || a === 10) {
        //     //     await changeOneOptions(page, 2, a)
        //     // } else {
        //     //     await changeOneOptions(page, 2, a)
        //     //     await changeOneOptions(page, 1, 1)
        //     // }
        //     //await changeOneOptions(page, 0, 3)
        //     await changeOneOptions(page, 6, a)
        //     const buttons = await page.$$eval('.btn.dropdown-toggle.val-wrap ', node => node.map(n => n.innerText))
        //     console.log(buttons);
        //     await changeOptions(page, 5)
        //     fs.appendFileSync(`list.txt`, '\n\n\n')
        // }
    //}


    //const repeat = await qtyLength(page)
    // for (let i = 0; i < 23; i++) {
    //     const btn = await page.$('[name="attr5"]')
    //     await btn.click()
    //     const options = await page.$('.dropdown-attr-5')
    //     const optionsList = await options.$$('a.attr-value.val-wrap')
    //     await optionsList[i].click()
    //     await page.waitForSelector('#price')
    //     await writeList(page)
    // }
    //const form = await page.$('#product_calculator_form')
    //await page.setViewport({ width: 1080, height: 1024 });
    // await changeOptions(page, 5)

    // const prueba = await page.$$('.site-dropdown.site-dropdown-group.dropdown')
    // await prueba[5].click()
    // const container = await page.$('#attr_container_5')
    // const bloqueEval = await container.$eval('.dropdown-menu.menu-parent', node => node.style.display = 'block')
    // const seleccionada = await container.$eval('.dropdown-menu-item.selected', node => node.classList.remove('selected'))
    // //await seleccionada.evaluate.removeClass('selected')
    // const opcion = await container.$$('.dropdown-menu-item')
    // await opcion[3].click()

    // await writeList(page)
    //console.log(opciones.length);
    // const bloque = await  container.$('.dropdown-menu.menu-parent')
    // const list = await bloque.$$('.attr-value.val-wrap')
    // // await page.waitForSelector('.attr-value.val-wrap ')
    // await list[3].click()
    //console.log(list);
    //console.log(prueba);
    // await prueba.click()

    // const listMenu = await page.$eval('.dropdown-menu', node => node.style('display: block;'))
    //await page.screenshot({ path: './prueba.jpg' })

    //8 const repeat = await openList(page, 5, 5)
    // for (let i = 0; i < 23; i++){
    //     const clic = await openList(page, 5, i)
    //     await clic.click()
    //     console.log('Job');
    // }

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
    // for(let a = 3; a <= 3; a++){
    //     //await changeTwoOptions(page, form, 0, a, 4, 1)
    //     await changeOptions(page, form, 6)
    //     //await changeOneOptions(page, form, 5, 0)
    //     fs.appendFileSync(`list.txt`, '\n\n\n')
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