import { firefox } from 'playwright'
import { login, updateAndCreateArtwork } from './function_list.js'
import { proxys } from './data.js'

const updateRow = async () => {
  const proxysLen = proxys.length
  const rand = Math.floor(Math.random() * proxysLen)
  const ipProxy = proxys[rand]
  const browser = await firefox.launch({
    proxy: {
      server: ipProxy
      // username: '',
      // password: ''
    }
  })
  // const browser = await firefox.launch()
  const page = await browser.newPage()

  // LOGIN APP
  // if (proxysLen > 0) {
  try {
    await login(page, ipProxy)
    await updateAndCreateArtwork(page, ipProxy)
  } catch (error) {
    console.log(`no connection ---> ${proxysLen}`)
    // const index = proxys.indexOf(ipProxy)
    // proxys.splice(index, 1)
    await browser.close()
    await updateRow()
  }
  // }

  // FUNCTIONS GROUPS
  // await getTitleProduct(page);
  // filterDataListArray("Simple Flat 5x7"); // FUNCTION FILTER DATA LIST.JS

  // await getChangedTitleProductWithArray(page);

  // await getAssociatedCategoryProduct(page);
  // await changeAssociatedCategoryProduct(page);

  // await getMarkUpSchemaProducts(page);
  // await changedSeoData(page);
  // await auditSeoData(page);
  // await getTitleAndChangedTitleImagesGallery(page);
  // await getTitleTitleImagesGallery(page);
  // await setAdditionalMetaTag(page);
  // await checkedAndSetOnUploadArtworkLaterOption(page);
  // await checkedUploadArtworkLaterOption(page);
  // await setMarkUpData(page);

  // await getIdProducts(page);
  // await getUrlProducts(page);
  // await auditActionBtv(page);
  // await auditActionBtvVerify(page);
  // filterPersonalizeBtnActions();
  // await changeActionsBtn(page);
  // await StatusActionsBtn(page);

  // filtersDataListArray("Bilingual"); // FUNCTION FILTERS DATA LIST.JS
  // await inputFillToRow(page);
  // await inputFillToPrice(page);
  // await categoryDefaultSelect(page);
  // await redirectionUrl(page);
  // await getChangedTitleProduct(page);

  // await getStatusCheckboxes(page);

  // await getTitleFilterProduct(page, "Acrylic");
  // await addSetupProductPageDesigner(page);

  console.log('END')
  await browser.close()
}

updateRow()
