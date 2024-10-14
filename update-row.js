import { firefox } from "playwright";
import {
  login,
  auditArtwork,
  updateAndCreateArtwork,
  getIdProducts,
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
  // })

  const browser = await firefox.launch();

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

  // await getIdProducts(page);

  // CREATE AND UPDATE ARTWORK
  // try {
  //   await login(page);
  //   await updateAndCreateArtwork(page);
  // } catch (error) {
  //   player().play("./alarm.mp3", (err) => {
  //     if (err) throw err;
  //   });
  // }

  // AUDIT ARTWORK OPTIONS
  await login(page);
  await auditArtwork(page);
  player().play("./alarm.mp3", (err) => {
    if (err) throw err;
  });

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

  console.log("END");
  await browser.close();
};

updateRow();
