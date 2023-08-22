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



const changeOptions = async (page, button) => {
    const menuBtn = await openList(page, button)
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
                console.log(menuBtn.length);
                await menuBtn[i].click()
                //await page.waitForSelector('#price', { state: 'visible' })
                //await page.waitForTimeout(5000)
                await page.screenshot({path:'./pepa.jpg'})
                await writeList(page)
            break          
            default:
                const menuBtnDefault= await openList(page, button)
                await menuBtnDefault[i].click()
                //await page.waitForSelector('#price', { state: 'attached' })
                await page.waitForTimeout(5000)
                await writeList(page)
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
    await form.waitForSelector('.ng-binding.subtotal-price', { state: 'attached' })
    return menuBtn.length
}

const openList = async (page, button, i) => {
    //const prueba = await page.$$eval('.selected-addon-price')
    //console.log(prueba);



    // const btn = await page.$('[name="attr5"]')
    // await page.waitForSelector('[name="attr5"]', { state: 'attached'})
    // await btn.click()
    // const exp = await page.$('#attr_container_5')
    // //const list = await exp.$$eval('.dropdown-menu-item', node => node.map(n => n.innerText))
    // const list = await exp.$$('.dropdown-menu-item')
    // await page.waitForSelector('.dropdown-menu-item', { state: 'attached'})
    // await list[2].click()
    // //await btn.click()
    // // const option = await page.$('#attr_container_5_label')
    // // const enlace = await option.$$eval('a', node => node.map(n => n.innerText))
    // // await btn[5].click()
    // console.log(list);

    

    // const btns = await page.$$('button.btn.dropdown-toggle')
    // const allList = await page.$$('.dropdown-menu.menu-parent')
    // await btns[5].click()
    // //const buttons = await page.$$('.dropdown')
    // await allList[5].evaluate(e => e.style.display = 'block')
    // const listOption = await allList[5].$$('a.attr-value.val-wrap')
    // await listOption[20].click()
    // await page.waitForSelector('#price', { state: 'attached' })
    //await page.waitForTimeout(10000)
    //await page.screenshot({path:'./prueba.jpg'})
    //const menuBtn = await menu[button].$$('a.attr-value.val-wrap')
    //await menuBtn[1].click()
    //const menuFinal = menuBtn[i]
    //await menuFinal.click()
    //await page.waitForTimeout(5000)
    //await page.waitForSelector('#price', { state: 'attached' })
    await page.screenshot({path:'./prueba.jpg'})
    //await writeList(page)
    //console.log(prueba);
    // console.log('Working');
    //return menuBtn[i]
}

const web = async () => {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://www.uprinting.com/letterhead-printing.html')

    await page.waitForTimeout(10000)
    const btn = await page.$('[name="attr5"]')
    await btn.click()
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
    await page.screenshot({path:'./prueba.jpg'})

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