import { firefox } from 'playwright'
import { login, updateAndCreateArtwork } from './function_list.js'

const updateRow = async () => {
  // const browser = await firefox.launch({
  //   proxy: {
  //     server: '185.162.231.207:80'
  //     // username: 'usr',
  //     // password: 'pwd'
  //   }
  // })
  const browser = await firefox.launch()
  const page = await browser.newPage()

  // LOGIN APP
  await login(page)

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
  await updateAndCreateArtwork(page)

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
