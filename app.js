import { chromium, firefox, webkit } from 'playwright'
import { html } from './utils.js'
import fs from 'fs'
import * as dotenv from 'dotenv'
dotenv.config()

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
    await page.waitForTimeout(7000)
    await page.locator('#cke_3_contents').focus()
    await page.locator('#cke_3_contents').click()
    await page.locator('#cke_3_contents').press('Control+a')
    await page.locator('#cke_3_contents').press('Control+x')
    await page.locator('#cke_3_contents').type(html)
    await page.click('#btn-action-save')
    await page.waitForTimeout(3000)
    fs.writeFileSync('id.txt', id)
    console.log(id)
  }
}

const web = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()  
  
  // EXTRACT NUM FOOTER PAGE
  // const num = await page.getByRole('link', {class: 'page-link'}).allInnerTexts()
  // const numPage = num.filter(data => data.length === 1).length
  
  // ACTIVATE EXTRACT IDS PRODUCTS
  await page.goto('https://www.apprinting.com/a7-himalaya-pockets-wedding-invitation/products/')
  const ids = [
    '1642', '1654', '1655', '1656', '1666', '1668',
    '1670', '1671', '1672', '1675', '1677', '1678', '1679',
    '1681', '1683', '1684', '1686', '1688', '1691', '1693',
    '1695', '1697', '1721', '1724', '3097', '1729', '1731',
    '1734', '1736', '1739', '1719', '1741', '1835', '1838',
    '1839', '1840', '1841', '1843', '1844', '1846', '1848',
    '1850', '1851', '1854', '1856', '1858', '1859', '1860',
    '1862', '1863', '1864', '1865', '1866', '1867', '1868',
    '1870', '1871', '1872', '1873', '1874', '1875', '1876',
    '1877', '1879', '1881', '1882', '1883', '1885', '1887',
    '1888', '1890', '1898', '1901', '1904', '1905', '1908',
    '1910', '1912', '1914', '1915', '1918', '1925', '1927',
    '1929', '1934', '1937', '1940', '3082', '3083', '3084',
    '3085', '3086', '3087'
  ]
  // await seccionFooterPage(page, 7)
  console.log(ids)

  // CHANGE PRICE PRODUCTS
  await page.goto('https://www.apprinting.com/admin/')
  await login(page)
  await updateProducts(page, ids)
  
  // END PROCCESS
  console.log('END')
  await browser.close()
}

web()