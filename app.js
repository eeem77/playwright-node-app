const { chromium, firefox, webkit } = require('playwright')
require('dotenv').config()

const html =`
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" rel="stylesheet" />
<link href="https://dl.dropboxusercontent.com/s/t6l3o59zesl1wi4/style.css?dl=0" rel="stylesheet" />
<div class="body-content-product justify-content-center">
<!-- menu template dl.dropboxusercontent.com -->
<div class="text-center d-none d-sm-none d-md-none d-lg-block d-xl-block" id="nav-scrollspy-product">
  <hr />
  <ul id="menuItem" class="nav justify-content-center"></ul>
  <hr />
</div>

<!-- product details -->
<!-- <div class="card text-center" id="scrollspyHeading1" style="border: none"></div> -->
<div class="card-body">
  <span class="titleBody">PRODUCT DETAILS</span>
  <p class="card-text pt-3">eeem77</p>
</div>

<!-- paper and material -->
<div id="paper-material" class="row align-items-center justify-content-center pt-4"></div>

<div id="paper-material-splide"></div>

<!-- ENCLOSURE CARDS -->
<!-- <div id="enclosure-cards-title" class="row align-items-center justify-content-center pt-4"></div>

<div id="enclosure-cards-content" class="row justify-content-center"></div> -->

<!-- ENVELOPE UPGRADE OPTIONS -->
<!-- <div id="envelope-upgrade-options-title" class="row align-items-center justify-content-center pt-5"></div>

<div id="envelope-upgrade-options" class="row pt-5">
  <div id="envelope-upgrade-options-content-one" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
  </div>
  <div id="envelope-upgrade-options-content-two" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
  </div>
</div> -->

<!-- ADD OPTIONAL CUSTOM MATCHING ENVELOPE LINERS -->
<!-- <div id="add-optional-title" class="row align-items-center justify-content-center pt-5"></div>

<div id="add-optional" class="row row-cols-auto justify-content-center pt-5"></div>

<div id="optional-add-ons-title" class="row align-items-center justify-content-center pt-5"></div>

<div id="belly-bands" class="row align-items-center justify-content-center pt-4"></div>

<div id="belly-bands-content-one" class="row row-cols-auto justify-content-center"></div>

<div id="belly-bands-content-two" class="row row-cols-auto justify-content-center"></div>

<div id="belly-bands-content-three" class="row align-items-center justify-content-center pt-5"></div> -->

<!-- SIZING CHART -->
<!-- <div id="img-sizing-chart-title" class="row align-items-center justify-content-center pt-5"></div>

<div id="img-sizing-chart-content" class="row align-items-center justify-content-center pt-5"></div> -->

<!-- DO IT YOURSELF TEMPLATES -->
<div class="row align-items-center justify-content-center pt-5" id="scrollspyHeading6"></div>

<div id="diy-templates" class="row align-items-center justify-content-center pt-5"></div>

<div id="modals-template"></div>

<!-- PRICING -->
<div id="pricing-title" class="row align-items-center justify-content-center pt-5"></div>

<div id="pricing-content" class="row align-items-center justify-content-center pt-5"></div>

<!-- TO ORDER -->
<div id="to-order-title" class="row align-items-center justify-content-center pt-5"></div>

<div id="to-order-content" class="row row-cols-auto justify-content-center align-items-center pt-5"></div>

<!-- TIMELINES &amp; PROCESS -->
<div id="timelines-title" class="row align-items-center justify-content-center pt-5"></div>

<div class="timeline pt-5" id="accordionExample"></div>

</div>

<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
<script type="text/javascript" src="https://dl.dropboxusercontent.com/s/rlwsq8uyp1giha9/index.js?dl=0"></script>
`

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
  //await page.goto(url)
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
    await page.waitForTimeout(5000)
    await page.waitForLoadState('networkidle')
    const seccionIds = await extractIds(page) 
    ids = ids.concat(seccionIds)
  }
  return ids
}

const web = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  // const ids = await extractIds(page, 'https://www.apprinting.com/simple-flat-5x7-wedding-invitations/products/')
  // console.log(ids)
  
  
  // EXTRACT NUM FOOTER PAGE
  // const num = await page.getByRole('link', {class: 'page-link'}).allInnerTexts()
  // const numPage = num.filter(data => data.length === 1).length
  
  // ACTIVATE EXTRACT IDS PRODUCTS
  // await page.goto('https://www.apprinting.com/simple-flat-5x7-wedding-invitations/products/')
  // const ids = await seccionFooterPage(page, 31)

  // CHANGE PRICE PRODUCTS
  await page.goto('https://www.apprinting.com/admin/')
  await login(page)

  const idProduct = '1138'
  await page.goto(`https://www.apprinting.com/admin/product_description.php?product_id=${idProduct}`)
  const btnHTML = await page.$('#cke_134')
  await btnHTML.click()
  await page.waitForTimeout(3000)
  await page.locator('#cke_3_contents').focus()
  await page.locator('#cke_3_contents').click()
  await page.locator('#cke_3_contents').press('Control+a')
  await page.locator('#cke_3_contents').press('Control+x')
  await page.locator('#cke_3_contents').type(html)
  await page.screenshot({path:'one.png'})
  await page.click('#btn-action-save')
  await page.waitForTimeout(3000)
  

  console.log('end')
  
  // const idPrice = await page.$eval('#size_id', node => node.getAttribute('value'))
  // const variable = await page.$(`[id="txtqty[${idPrice}][0]"]`, node => node.fill(77))
  // await variable.fill(77)
  // const prueba = await variable.getAttribute('value')
  // console.log(variable)
  // for (let index = 0; index < 21; index++) {
  //   const variable = await page.$(`[id="txtqty[${idPrice}][${index}]"]`) // page.$(`#txtqty[${idPrice}][${index}]`)
  //   variable.value = 77
  // }
  // await page.$('#txtqty[3098][0]').fill(77)
  // await page.$('#btn-action-save').click()
  // await page.waitForTimeout(3000)
  // console.log(idPrice)

  await browser.close()
}

web()

// https://www.apprinting.com/admin/product_price.php?product_id=1653