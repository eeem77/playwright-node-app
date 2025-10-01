import { chromium } from "playwright";
import {
  login,
  auditArtwork,
  updateAndCreateArtwork,
  getIdProducts,
  checkAndDeleteArtwork,
  getIdProductsAdmin,
  auditSeoData,
  getMarkUpSchemaProducts,
  setMarkUpData,
  auditUploadArtworkLaterOption,
  setUploadArtworkLaterOption,
  auditProductPageDesign,
  backupProductPageDesign,
  getXmlProducts,
  getTitleTitleImagesGallery,
  getIdUrlClient,
  changeProductConfig,
  auditProductOptions,
  getPricesProducts,
  updatePricesProducts,
  updateOptionsPricesProducts,
  getAttributes,
  getModelPricesProducts,
  getTotalModelPricesProducts,
  getAssociatedCategoryProduct,
  changedSeoData,
  getAuditRulesReport,
  getRedirectionLinksAdmin,
  getLinksActiveClient,
  cleanLinksActiveClient,
  createXmlSiteMap,
  getSizesImages,
  getSizesImagesFinal,
  getUrlProducts,
  getUrlClientProducts,
  getSizesImagesArray,
  filterDataPaperMore,
  downloadAllImages,
  modifyStringRecursiveFiles,
  addSetupProductPageDesigner,
  setLongDescriptionTwo,
} from "./function_list.js";
// import { proxies } from './data.js'
// import fs from 'fs'
import player from "play-sound";

const updateRow = async () => {
  // const proxiesLen = proxies.length
  // const rand = Math.floor(Math.random() * proxiesLen)
  // const ipProxy = proxies[rand]
  // const browser = await firefox.launch({
  //   proxy: {
  //     server: ipProxy
  //     // username: '',
  //     // password: ''
  //   }
  // })    launchPersistentContext

  // const userDataDir =
  //   "C:\\Users\\eeem77\\AppData\\Local\\Google\\Chrome\\User Data\\Default";
  const browser = await chromium.launch({
    headless: false, // Cambia a true si no quieres que se muestre la ventana
    // executablePath: "C:\\Program Files\\Google\\Chrome\\Application",
    // viewport: { width: 1440, height: 870 },
    // acceptDownloads: true,
  });

  // const browser = await chromium.launch();

  const page = await browser.newPage();

  // LOGIN APP
  // CREATE AND UPDATE ARTWORK WITH PROXIES LIST
  // if (proxiesLen >= 1) {
  //   try {
  //     await login(page, ipProxy)
  //     await updateAndCreateArtwork(page, ipProxy)
  //   } catch (error) {
  //     fs.appendFileSync('bad-proxies.txt', `${ipProxy}\n`)
  //     console.log(`no connection ---> ${proxiesLen}`)
  //     const index = proxies.indexOf(ipProxy)
  //     proxies.splice(index, 1)
  //     await browser.close()
  //     await updateRow()
  //   }
  // }

  // GET ID PRODUCTS
  // const table = document.querySelector("tbody");
  // const tr = table.querySelectorAll("tr");
  // tr.forEach(element => console.log(element.getAttribute("id")))
  // await getIdProducts(page);
  // await login(page);
  // await getIdProductsAdmin(
  //   page,
  //   "https://www.apprinting.com/admin/product_listing.php?qfs=eyJzdGFydCI6MCwibGVuZ3RoIjoxMDAsIm9yZGVyIjpbWzQsImFzYyJdXSwic2VhcmNoIjp7InNlYXJjaCI6IiIsInNtYXJ0Ijp0cnVlLCJyZWdleCI6ZmFsc2UsImNhc2VJbnNlbnNpdGl2ZSI6dHJ1ZX0sImNvbHVtbnMiOlt7InZpc2libGUiOnRydWUsInNlYXJjaCI6eyJzZWFyY2giOiJrZXl3b3JkPSZjaWQ9ODgmcHJpY2VfZGVmaW5pbmdfbWV0aG9kPS0xJnByZWRlZmluZWRfcHJvZHVjdF90eXBlPTAiLCJzbWFydCI6dHJ1ZSwicmVnZXgiOmZhbHNlLCJjYXNlSW5zZW5zaXRpdmUiOnRydWV9fV19"
  // );

  // GET PRICES PRODUCTS
  // await login(page);
  // await getAssociatedCategoryProduct(page);
  // await getPricesProducts(page); ---> old version
  // await getModelPricesProducts(page);
  // await getTotalModelPricesProducts(page);
  // await getAttributes(page);
  // await updateOptionsPricesProducts(page);
  // await updatePricesProducts(page)
  // await getIdProducts(page);
  // await getIdProductsAdmin(
  //   page,
  //   "https://www.apprinting.com/admin/product_listing.php?qfs=eyJzdGFydCI6MCwibGVuZ3RoIjoxMDAsIm9yZGVyIjpbWzQsImFzYyJdXSwic2VhcmNoIjp7InNlYXJjaCI6IiIsInNtYXJ0Ijp0cnVlLCJyZWdleCI6ZmFsc2UsImNhc2VJbnNlbnNpdGl2ZSI6dHJ1ZX0sImNvbHVtbnMiOlt7InZpc2libGUiOnRydWUsInNlYXJjaCI6eyJzZWFyY2giOiJrZXl3b3JkPSZjaWQ9MTA4JnByaWNlX2RlZmluaW5nX21ldGhvZD0tMSZwcmVkZWZpbmVkX3Byb2R1Y3RfdHlwZT0wIiwic21hcnQiOnRydWUsInJlZ2V4IjpmYWxzZSwiY2FzZUluc2Vuc2l0aXZlIjp0cnVlfX1dfQ%3D%3D"
  // );

  // CHANGE PRODUCT CONFIG
  // await login(page);
  // await getIdProductsAdmin(
  //   page,
  //   "https://www.apprinting.com/admin/product_listing.php?qfs=eyJzdGFydCI6MCwibGVuZ3RoIjoxMDAsIm9yZGVyIjpbWzQsImFzYyJdXSwic2VhcmNoIjp7InNlYXJjaCI6IiIsInNtYXJ0Ijp0cnVlLCJyZWdleCI6ZmFsc2UsImNhc2VJbnNlbnNpdGl2ZSI6dHJ1ZX0sImNvbHVtbnMiOlt7InZpc2libGUiOnRydWUsInNlYXJjaCI6eyJzZWFyY2giOiJrZXl3b3JkPSZjaWQ9OTMmcHJpY2VfZGVmaW5pbmdfbWV0aG9kPS0xJnByZWRlZmluZWRfcHJvZHVjdF90eXBlPTAiLCJzbWFydCI6dHJ1ZSwicmVnZXgiOmZhbHNlLCJjYXNlSW5zZW5zaXRpdmUiOnRydWV9fV19"
  // );
  // await changeProductConfig(page);
  // await auditProductOptions(page);

  // GET XML PRODUCTS
  // await getIdProducts(page);
  // await login(page);
  // await getXmlProducts(page);

  // GET ID URL'S CLIENT
  // await getIdUrlClient(page);

  // CHECK AND DELETE ARTWORK
  // try {
  //   await login(page);
  //   await checkAndDeleteArtwork(page);
  // } catch (error) {
  //   console.log("Error ---> ", error);
  // }

  // CREATE AND UPDATE ARTWORK
  // try {
  //   // await login(page);
  //   await updateAndCreateArtwork(page);
  // } catch (error) {
  //   console.log("Error ---> ", error);
  // }

  // AUDIT ARTWORK OPTIONS
  // await login(page);
  // await auditArtwork(page);

  // FUNCTIONS GROUPS
  // await getTitleProduct(page);
  // filterDataListArray("Simple Flat 5x7"); // FUNCTION FILTER DATA LIST.JS

  // await getChangedTitleProductWithArray(page);

  // await getAssociatedCategoryProduct(page);
  // await changeAssociatedCategoryProduct(page);

  //FILTER DATA
  // await filterDataPaperMore();

  // Download Images URL'S
  // downloadAllImages()
  //   .then(() => console.log("Proceso completado"))
  //   .catch((error) => console.error("Error general:", error));

  // modifyStringRecursiveFiles().catch(console.error);

  // AUDIT IMAGES SIZES
  // await getSizesImages(page, "https://www.apprinting.com/en/posters/products/");
  // await getUrlClientProducts(
  //   page,
  //   "https://www.apprinting.com/landscaping-contractors/products/"
  // );
  // await getSizesImagesArray(page);
  // await getSizesImagesFinal(page);

  // CHANGE PRODUCT PAGE LONG DESCRIPTION 2
  await login(page);
  await getIdProductsAdmin(
    page,
    "https://www.apprinting.com/admin/product_listing.php?qfs=eyJzdGFydCI6MCwibGVuZ3RoIjoxMDAsIm9yZGVyIjpbWzQsImFzYyJdXSwic2VhcmNoIjp7InNlYXJjaCI6IiIsInNtYXJ0Ijp0cnVlLCJyZWdleCI6ZmFsc2UsImNhc2VJbnNlbnNpdGl2ZSI6dHJ1ZX0sImNvbHVtbnMiOlt7InZpc2libGUiOnRydWUsInNlYXJjaCI6eyJzZWFyY2giOiJrZXl3b3JkPUJyb2NodXJlJmNpZD0xNzgmcHJpY2VfZGVmaW5pbmdfbWV0aG9kPS0xJnByZWRlZmluZWRfcHJvZHVjdF90eXBlPTAiLCJzbWFydCI6dHJ1ZSwicmVnZXgiOmZhbHNlLCJjYXNlSW5zZW5zaXRpdmUiOnRydWV9fV19"
  );
  // await getIdProducts(
  //   page,
  //   "https://www.apprinting.com/landscaping-contractors/products/"
  // );
  // await login(page);
  // await setLongDescriptionTwo (page);

  // AUDIT RULES
  // await login(page);
  // await getIdProducts(
  //   page,
  //   ""
  // );
  // await getIdProductsAdmin(
  //   page,
  //   ""
  // );
  // await getAuditRulesReport(page);

  //SEO GET URL'S ACTIVE CLIENT WEB
  // await getLinksActiveClient(
  //   page,
  //   "https://www.apprinting.com/en/offsite-albums/products/"
  // );
  // await cleanLinksActiveClient();
  // await createXmlSiteMap();

  //SEO GET URL REDIRECTION
  // await getRedirectionLinksAdmin(
  //   page,
  //   "https://www.apprinting.com/admin/url_redirection_listing.php"
  // );

  // SEO
  // await login(page);
  // await getIdProducts(
  //   page,
  //   ""
  // );
  // await getIdProductsAdmin(
  //   page,
  //   ""
  // );
  // await auditSeoData(page);
  // await getMarkUpSchemaProducts(page);
  // await setMarkUpData(page);
  // await changedSeoData(page);
  // await getTitleAndChangedTitleImagesGallery(page);
  // await getTitleTitleImagesGallery(page);
  // await setAdditionalMetaTag(page);
  // await checkedAndSetOnUploadArtworkLaterOption(page);
  // await checkedUploadArtworkLaterOption(page);
  // await auditUploadArtworkLaterOption(page);
  // await setUploadArtworkLaterOption(page);
  // await auditProductPageDesign(page);
  // await backupProductPageDesign(page);

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

  await browser.close();
  console.log("END");
  // player().play("./alarm.mp3", (err) => {
  //   if (err) throw err;
  // });
};

updateRow();
