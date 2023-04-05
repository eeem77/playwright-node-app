import express from 'express'
import path from 'path'
import { chromium, firefox, webkit } from 'playwright'
import { html } from './utils.js'
import fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3000

const login = async (page) => {
  const user = await page.$('#username')
  const pass = await page.$('#password')
  const btn = await page.$('button')
  await user.fill(process.env.LOGIN_USER)
  await pass.fill(process.env.LOGIN_SECRET_KEY)
  await btn.click()
  await page.waitForTimeout(3000)
  console.log('login: OK')
}

const extractIds = async (page) => {
  const html = await page.$$eval('.card-aligned', node => node.map(n => n.innerHTML))
  const body = html[0].split('">')
  const filter = body.filter(data => data.includes('product-box'))
  const ids = filter.map(data => data.slice(-4))
  console.log(ids)
  return ids
}

const seccionFooterPage = async (page, numPage) => {
  let ids = []
  for (var i = 0; i < numPage; i++) {
    if(i === 0){
      ids = await extractIds(page)
    }
    await page.getByText('Next  »').click()
    await page.waitForTimeout(3000)
    await page.waitForLoadState('networkidle')
    const seccionIds = await extractIds(page) 
    ids = ids.concat(seccionIds)
  }
  return ids
}

const updateProducts = async (page, ids) => {
  for await (const id of ids) {
    await page.goto(`https://www.apprinting.com/admin/product_description.php?product_id=${id}`)
    const btnHTML = await page.$('#cke_134')
    await btnHTML.click()
    //await page.waitForTimeout(10000)
    const btnSave = await page.$('#btn-action-save')
    await btnSave.waitForElementState("visible")
    await page.locator('#cke_3_contents').focus()
    await page.locator('#cke_3_contents').click()
    await page.locator('#cke_3_contents').press('Control+a')
    await page.locator('#cke_3_contents').press('Control+x')
    await page.locator('#cke_3_contents').type(html)
    await page.click('#btn-action-save')
    //await page.waitForTimeout(3000)
    fs.writeFileSync('id.txt', id)
    console.log(id)
  }
}

// FUNCTIONS FOR EXTRACT PRICE, UPPRINTING
const numbersButtons = async (menu) => {
  const buttonsArray = await menu.$$('button')
  return buttonsArray
}

const writeTable = async (array, url) => {
  fs.appendFileSync(`${url}.txt`, array.toString() + '\n')
}

// const baseForm = async (page, menu, title) => {
//   let modal = 0
//   const buttonsArray = await numbersButtons(menu)
//   for await (const button of buttonsArray){
//     if (modal < 7){
//       await button.click()
//       const subMenu = await menu.$$('.dropdown-menu') 
//       const linkSubmenu = await subMenu[modal].$$('a')
//       await linkSubmenu[0].click()
//       await button.waitForElementState("visible")
//       console.log(modal)
//       modal++
//     }
//   }
//   await page.waitForTimeout(3000)
//   const menuFormBase = await menu.$$eval('button', node => node.map(n => n.innerText))
//   const priceBaseold = await menu.$eval('.subtotal-price', node => node.innerText)
//   const priceBase = priceBaseold.replace(',','')
//   await menuFormBase.push(priceBase)
//   fs.writeFileSync(`${title}.txt`,'\n')
//   console.log(menuFormBase, Number(priceBase.substring(1)))
//   return Number(priceBase.substring(1))
// }

const baseForm = async (page, menu, title, numDropdown, modalDropdown, clickModal, modalDropdownTwo, clickModalTwo) => {
  let modal = 0
  let click = 0
  const buttonsArray = await numbersButtons(menu)
  for await (const button of buttonsArray){
    if(modal === modalDropdown || modal === modalDropdownTwo){
      if(modal === modalDropdown){
        click = clickModal
      } else {
        click = clickModalTwo
      }
    } else {
      click = 0
    }
    if (modal <= numDropdown){
      await button.click()
      const subMenu = await menu.$$('.dropdown-menu') 
      const linkSubmenu = await subMenu[modal].$$('a')
      await linkSubmenu[click].click()
      await button.waitForElementState("visible")
      console.log(modal)
      modal++
    }
  }
  await page.waitForTimeout(3000)
  const menuFormBase = await menu.$$eval('button', node => node.map(n => n.innerText))
  const priceBaseold = await menu.$eval('.subtotal-price', node => node.innerText)
  const priceBase = priceBaseold.replace(',','')
  await menuFormBase.push(priceBase)
  fs.writeFileSync(`${title}.txt`,'\n')
  console.log(menuFormBase, Number(priceBase.substring(1)))
  return Number(priceBase.substring(1))
}

// const postBaseForm = async (page, menu, link, buttonModal) => {
//   console.log(link, buttonModal);
//   const buttonsArray = await numbersButtons(menu)
//   await buttonsArray[buttonModal].click()
//   const subMenu = await menu.$$('.dropdown-menu') 
//   const linkSubmenu = await subMenu[buttonModal].$$('a')
//   await linkSubmenu[link].click()
//   await page.waitForTimeout(3000)
// }

const linksUpdate = async (page, button, menu, modal) => {
  //await page.waitForTimeout(3000)
  await button.click()
  const subMenu = await menu.$$('.dropdown-menu')
  const linkSubmenu = await subMenu[modal].$$('a')
  return linkSubmenu
}

// const resetButtons = async(page, menu) => {
//   await page.goto('https://www.uprinting.com/carbonless-form-printing.html?aind=prod_up_products&aqid=60fa4a8065344044df3bfa43231dce50&aoid=e7951be6aec0ef054ca1c41757ee4df6b27a2db46e866d4cccbbcef7fd4cb7c4&apos=1&aut=c30d118e-cf21-11ed-b44b-0242ac110002-1680197943&asrc=results_page&akywd=invoice&stype=algolia&mdl=products')
//   menu = await page.$('#product_calculator_form')
//   const pricebase = await baseForm(page, menu)
// }

const stepByStepForOneButton = async (page, menu, button, pricebase, modal, title, porcent) => {
  const linkSubmenu = await linksUpdate(page, button, menu, modal)
  await linkSubmenu[0].waitForElementState('visible')
  await linkSubmenu[0].click()
  let links = 0
  const repeatForButton = linkSubmenu.length - 1
  for await (const link of linkSubmenu){
    let linkSubmenuNew = await linksUpdate(page, button, menu, modal)
    if(links <= repeatForButton){
      if(await linkSubmenuNew[links].innerText() !== 'Custom Size'){
        await linkSubmenuNew[links].click()
        await page.waitForTimeout(3000)
        const menuForm = await menu.$$eval('button', node => node.map(n => n.innerText))
        const priceOld = await menu.$eval('.subtotal-price', node => node.innerText)
        const price = priceOld.replace(',', '')
        //const priceReduce = Number(price.substring(1)) - pricebase
        //const pricePorcent = porcent * priceReduce / 100
        //const priceTotal = priceReduce + pricePorcent
        await menuForm.push(price)
        //await menuForm.push(priceReduce)
        //await menuForm.push(pricePorcent)
        //await menuForm.push(priceTotal)
        await writeTable(menuForm, title)
        linkSubmenuNew = await linksUpdate(page, button, menu, modal)
        await linkSubmenuNew[0].click()
        await page.waitForTimeout(3000)
        links++
      } else {
        await linkSubmenuNew[0].click()
        await page.waitForTimeout(3000)
      }
    } else {
      await linkSubmenuNew[0].click()
      await page.waitForTimeout(3000)
    }
    console.log('fin bucle step segundo')
  }
}

const stepByStep = async (page, menu, buttonsArray, pricebase) => {
  let modal = 0
  for await (const button of buttonsArray){
    console.log('bucle step principal')
    const linkSubmenu = await linksUpdate(page, button, menu, modal)
    await linkSubmenu[0].waitForElementState('visible')
    await linkSubmenu[0].click()
    //let stepOne = true
    let links = 0
    const repeatForButton = linkSubmenu.length - 1
    for await (const link of linkSubmenu){
      let linkSubmenuNew = await linksUpdate(page, button, menu, modal)
      if(links <= repeatForButton){
        if(await linkSubmenuNew[links].innerText() !== 'Custom Size'){
          await linkSubmenuNew[links].click()
          await page.waitForTimeout(3000)
          const menuForm = await menu.$$eval('button', node => node.map(n => n.innerText))
          const price = await menu.$eval('.subtotal-price', node => node.innerText)
          await menuForm.push(price)
          await menuForm.push(Number(price.substring(1)) - pricebase)
          await writeTable(menuForm)
          linkSubmenuNew = await linksUpdate(page, button, menu, modal)
          await linkSubmenuNew[0].click()
          await page.waitForTimeout(3000)
          links++
        } else {
          await linkSubmenuNew[0].click()
          await page.waitForTimeout(3000)
        }
      } else {
        await linkSubmenuNew[0].click()
        await page.waitForTimeout(3000)
      }
      console.log('bucle step segundo')
    }
    modal++
    links = 0
    // await button.click()
    // await linkSubmenu[0].click()
  }
}

const web = async (url, modal, numDropdown, modalDropdown, clickModal, modalDropdownTwo, clickModalTwo) => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  // EXTRACT NUM FOOTER PAGE
  // const num = await page.getByRole('link', {class: 'page-link'}).allInnerTexts()
  // const numPage = num.filter(data => data.length === 1).length
  
  // ACTIVATE EXTRACT IDS PRODUCTS
  // await page.goto('https://www.apprinting.com/a7-atlas-pockets-wedding-invitation/products/')
  
  // const ids = [
  //   '1619', '1685', '1689', '1651', '1701', '1707',
  //   '1713', '1718', '1727', '1728', '1732', '1738',
  //   '1740', '1742', '1822', '1824', '1830', '1832',
  //   '1834', '1842', '1845', '1847', '1849', '1869',
  //   '1880', '1891', '1896', '1909', '1924', '1928',
  //   '1939', '1942', '1944', '1946', '1948', '1953',
  //   '1955', '1957', '1959', '1962', '1967', '1968',
  //   '1969', '1972', '1975', '1978', '1982', '1984',
  //   '1989', '1993', '1996', '1997', '2003', '2007',
  //   '2018', '2020', '2042', '2046', '2056', '2062',
  //   '2071', '2077', '2078', '2081', '2084', '2086',
  //   '2089', '2094', '2100', '2102'
  // ]
  
  // await seccionFooterPage(page, 5)
  // fs.writeFileSync('ids.txt', ids.toString())
  // console.log(ids)

  // CHANGE PRICE PRODUCTS
  // await page.goto('https://www.apprinting.com/admin/')
  // await login(page)
  // await updateProducts(page, ids)

  // EXTRACT PRICE UPPRINTING CARBONLESS FORMS PRODUCT
  // await page.goto('https://www.uprinting.com/carbonless-form-printing.html?aind=prod_up_products&aqid=60fa4a8065344044df3bfa43231dce50&aoid=e7951be6aec0ef054ca1c41757ee4df6b27a2db46e866d4cccbbcef7fd4cb7c4&apos=1&aut=c30d118e-cf21-11ed-b44b-0242ac110002-1680197943&asrc=results_page&akywd=invoice&stype=algolia&mdl=products')
  await page.goto(url)
  const menu = await page.$('#product_calculator_form')
  const titleSpaces = await page.$eval('#main_content', node => node.innerText)
  const title = titleSpaces.replace(' ', '_')
  const pricebase = await baseForm(page, menu, title, numDropdown, modalDropdown, clickModal, modalDropdownTwo, clickModalTwo)
  const buttonsArray = await numbersButtons(menu)
  // const postBase = await postBaseForm(page, menu, link, buttonModal)
  await stepByStepForOneButton(page, menu, buttonsArray[modal], pricebase, modal, title)
   
  // const step = await stepByStep(page, menu, buttonsArray, pricebase)

  // await buttonsArray[0].click()
  // const subMenu = await menu.$$('.dropdown-menu')
  // const linkSubmenu = await subMenu[0].$$('a')
  // await linkSubmenu[0].click()
  // await page.waitForTimeout(3000)
  // await page.screenshot({path: 'prueba.jpg'})
  // const menuBase = await menu.$$eval('button', node => node.map(n => n.innerText))
  // const price = await menu.$eval('.subtotal-price', node => node.innerText)

  //const option = await prueba.getByRole('link').allInnerTexts()
  
  // const box = page.getByRole('button').filter({hasText: '8.5" x 11" (Letter Size)'})
  // await box.click()
  // const option = await page.getByRole('link').allInnerTexts()
  //await page.screenshot({path: 'prueba.jpg'})
  // console.log(menuBase);
  // console.log(price);
  // END PROCCESS
  console.log('END')
  await browser.close()
  return `${title}.txt`
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const {pathname: root} = new URL('./views/index.html', import.meta.url)
  //res.sendFile(path.join(__dirname, './views/index.html'))
  res.sendFile(root)
})

app.post('/submit', async (req, res) => {
  // const {pathname: root} = new URL('table.txt', import.meta.url)
  try {
    const title = await web(req.body.url, Number(req.body.modal), Number(req.body.numDropdown), Number(req.body.modalDropdown), Number(req.body.clickModal), Number(req.body.modalDropdownTwo), Number(req.body.clickModalTwo))
    const {pathname: root} = new URL(title, import.meta.url)
    res.sendFile(root)
  } catch (error) {
    res.send('403')
  }
  
  //res.sendFile(root)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// web(7)