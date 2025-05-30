import fs from "fs";
import * as dotenv from "dotenv";
import listPrice from "./listPrice.js";
import dataProducts from "./list.js";
import seoData from "./seo-data.js";
import {
  idProducts,
  urlsProducts,
  urlProducts,
  titlesProducts,
  url,
  urlProductUpdatePrice,
  indexPrincipalNewPrices,
  qtys,
  qtyFromPrices,
  qtyToPrices,
  inputsPrices5x7,
  inputsPrices4x5,
  inputsPrices3x5,
  designerAddBulk,
  pricesAddBulk,
  printeSidePrice,
  printeSidePrice2,
  printeSidePrice3,
  paperTypePrice,
  paperTypePrice2,
  paperTypePrice3,
  cornerRoundingPrice,
  cornerRoundingPrice2,
  cornerRoundingPrice3,
  artworkPrice,
  envelopePrice,
  envelopePrice2,
  newPrices,
} from "./data.js";
import { log } from "console";
dotenv.config();

export const login = async (page, ipProxy) => {
  await page.goto(url);
  await page.waitForSelector(".login-layout", { state: "visible" });
  const user = await page.$("#username");
  const pass = await page.$("#password");
  const btn = await page.$("button");
  await user.fill(process.env.LOGIN_USER);
  await pass.fill(process.env.LOGIN_SECRET_KEY);
  await btn.click();
  await page.waitForSelector(".login-layout", { state: "hidden" });
  // const report = `${ipProxy}\n`
  // fs.appendFileSync('proxies-secundary.txt', report)
  console.log("login: OK");
};

export const inputFillToPrice = async (page) => {
  await page.goto(urlProductUpdatePrice, { timeout: 300000 });
  let price = 0;
  // let postNumber = 9607838  ${postNumber}
  for (let i = 37; i <= 39; i++) {
    // if( i === 39 || i === 41){
    for await (const qty of qtys) {
      const id = `txtprice[${qty}_20206${i}_]`;
      const inputPrice = await page.$(`[id="${id}" ]`);
      await inputPrice.fill(listPrice[price].toString());
      console.log(listPrice[price].toString());
      price++;
      // console.log(postNumber);
      // postNumber++
    }
    // }
  }
  const btnSave = await page.$("#btn-action-save");
  await btnSave.click();
  await page.waitForTimeout(5000);
};

export const inputFillToRow = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const btn = await page.$("#sort_order");
    await btn.fill("300");
    const btnSave = await page.$("#btn-action-save");
    await btnSave.click();
    await page.waitForTimeout(5000);
    console.log("Working ---> ", id);
  }

  // const products = await page.$$eval(".product-box", (node) =>
  //   node.map((n) => n.className)
  // );
  // console.log(products);
  // const btnSave = await page.$("#btn-action-save");
  // await btnSave.click();
  // await page.waitForTimeout(5000);
};

export const categoryDefaultSelect = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    await page.waitForTimeout(3000);
    const btnCategory = await page.$('[data-id="category_id_1"]');
    await btnCategory.click();
    await page.waitForTimeout(3000);
    const btnCategorySelect = await page.$("#bs-select-2-142");
    await btnCategorySelect.click();
    await page.waitForTimeout(3000);
    const btnSave = await page.$("#btn-action-save");
    await btnSave.click();
    await page.waitForTimeout(3000);
    console.log("Working ---> ", id);
    fs.appendFileSync("list.txt", id.toString() + "\n");
  }
};

export const getAssociatedCategoryProduct = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    // const associatedCategorySelected = await page.$('[id="category_ids_1"]');
    // const innerTextAssociatedCategory = await associatedCategorySelected.innerText();
    const defaultCategory = await page.$('[data-id="category_id_1"]');
    const defaultCategoryValue = await defaultCategory.getAttribute("title");
    const report = `Working ---> ${id} ---> ${defaultCategoryValue} \n`;
    fs.appendFileSync("list.txt", report);
  }
};

export const changeAssociatedCategoryProduct = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const associatedCategorySelected = await page.$(
      ".multiselect.dropdown-toggle"
    );
    await associatedCategorySelected.click();
    const list = await page.$(".multiselect-container.dropdown-menu.show");
    await page.waitForTimeout(2000);
    const valueCheckList = await list.$('[title="Real Estate"]');
    await valueCheckList.click();
    await page.waitForTimeout(2000);
    const btnSave = await page.$("#btn-action-save");
    await btnSave.click();
    await page.waitForTimeout(3000);
    fs.appendFileSync("list.txt", id + "\n");
    console.log("Working ---> ", id);
  }
};

const extractId = async (page, index) => {
  await page.waitForSelector("tbody");
  const table = await page.$("tbody");
  const tr = await table.$$("tr");
  for await (const element of tr) {
    const id = await element.getAttribute("id");
    const idSplit = await id.split(":");
    const nameElement = await element.$(".text-primary");
    const name = await nameElement.innerText();
    const statusElement = await element.$(".change_status");
    const status = await statusElement.getAttribute("value");
    fs.appendFileSync(
      "list-id-admin.txt",
      `${idSplit[1].toString()}, ${name}, ${status}\n`
    );
  }
  if (index) {
    console.log(index);
  }
};

export const getIdProductsAdmin = async (page, url) => {
  await page.goto(url, {
    timeout: 300000,
  });
  await page.waitForSelector(".pagination");
  const opsPagination = await page.$$(".paginate_button.page-item");
  console.log(opsPagination.length);

  if (opsPagination.length > 3) {
    const numberRepeat = opsPagination.length - 1;
    for (let index = 1; index < numberRepeat; index++) {
      if (index > 1) {
        try {
          await page.waitForSelector(".pagination");
          const opsPagination = await page.$$(".paginate_button.page-item");
          await opsPagination[index].click();
          await page.waitForSelector("tbody");
        } catch (error) {
          await page.waitForSelector(".pagination");
          const opsPagination = await page.$$(".paginate_button.page-item");
          const tablePagination = await page.$(".table_pagination");
          await tablePagination.scrollIntoViewIfNeeded();
          await opsPagination[index].click();
          await page.waitForSelector("tbody");
        }
        await extractId(page, index);
      }
    }
    await extractId(page);
  } else {
    await extractId(page);
  }
};

export const getIdProducts = async (page) => {
  await page.goto(
    "https://www.apprinting.com/en/welcome-signs/products/",
    {
      timeout: 300000,
    }
  );
  const products = await page.$$eval(".product-box", (node) =>
    node.map((n) => n.className)
  );
  fs.appendFileSync("list.txt", products.toString() + ",\n");
  console.log(products);
};

export const redirectionUrl = async (page) => {
  for await (const urlProduct of urlsProducts) {
    await page.goto(
      "https://www.apprinting.com/admin/url_redirection_action.php",
      { timeout: 300000 }
    );

    const oldUrlInput = await page.$("#old_url");
    const newUrlInput = await page.$("#new_url");
    const btnSave = await page.$("#btn-action-save");

    await oldUrlInput.fill(urlProduct);
    await newUrlInput.fill("https://www.apprinting.com/");
    await btnSave.click();
    await page.waitForTimeout(3000);
    console.log("Working ---> ", urlProduct);
  }
};

export const getChangedTitleProductWithArray = async (page) => {
  let indexTitle = 0;
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const responsePromise = page.waitForResponse(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`
    );
    const btnSave = await page.$("#btn-action-save");
    const title = await page.$("#products_title_1");
    const valueInput = await title.inputValue();
    const newTitle = titlesProducts[indexTitle];
    await title.fill(newTitle);
    await btnSave.click();
    // await page.waitForTimeout(3000);
    await responsePromise;
    indexTitle++;
    const report = `Working ---> ${id} Old Title ---> ${valueInput} New Title ---> ${newTitle} index title -----> ${indexTitle}`;
    fs.appendFileSync("list.txt", report + "\n");
    console.log(report);
  }
};

export const auditSeoData = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_metatags.php?product_id=${id}`,
      { timeout: 300000 }
    );

    await page.waitForSelector(".page-header");
    const productPageHeader = await page.$(".page-header");
    const productLabelTitle = await productPageHeader.$("small");
    const productTitle = await productLabelTitle.innerText();
    const productTitleSplit = productTitle.split(" ");

    const pageTitle = await page.$("#seo_page_title_1");
    const metaDescription = await page.$("#seo_page_description_1");
    const markUp = await page.$("#schema_markup_1");
    // const metaAdditional = await page.$("#seo_page_metatags1");

    let equalsTrue = 0;
    let equalsFalse = 0;
    let dateNull = false;

    const date = [
      id,
      await pageTitle.inputValue(),
      await metaDescription.inputValue(),
      await markUp.inputValue(),
      // await metaAdditional.inputValue(),
    ];

    for await (const element of productTitleSplit) {
      date[1].includes(element) === true ? equalsTrue++ : equalsFalse++;
    }

    // console.log(`equalsTrue = ${equalsTrue}`);
    // console.log(`equalsFalse = ${equalsFalse}`);

    for await (const input of date) {
      if (input === "") dateNull = true;
    }

    const markUpImageAudit = date[3].includes(`"image":`);
    // const markUpImageEmptyAudit = date[3].includes(`"image": []`);

    if (
      dateNull === true ||
      equalsTrue < 2 ||
      date[3] === "" ||
      markUpImageAudit === false
      // markUpImageEmptyAudit === true
    ) {
      fs.appendFileSync(
        "list.txt",
        `${date[0]};${productTitle};${date[1]};${date[2]};${date[3]} \n`
      );
    }

    console.log(`Working ---> ${id}`);
  }
};

export const auditUploadArtworkLaterOption = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_settings.php?product_id=${id}`,
      { timeout: 300000 }
    );
    await page.waitForSelector("#tab_uploadsettings");
    const uploadSettingsBtn = await page.$("#tab_uploadsettings");
    await uploadSettingsBtn.click();
    await page.waitForSelector("#TabContent_uploadsettings");
    const panel = await page.$("#TabContent_uploadsettings");
    const checkboxes = await panel.$$('[type="checkbox"]');
    const uploadArtworkLaterOption = await checkboxes[0].isChecked();
    if (uploadArtworkLaterOption === false) {
      fs.appendFileSync(
        "list.txt",
        `${id} ---> ${uploadArtworkLaterOption} \n`
      );
    } else {
      fs.appendFileSync(
        "list-power-off-backup.txt",
        `${id} ---> ${uploadArtworkLaterOption} \n`
      );
    }
    console.log(`${id} ---> ${uploadArtworkLaterOption}`);
  }
};

export const setUploadArtworkLaterOption = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_settings.php?product_id=${id}`,
      { timeout: 300000 }
    );
    await page.waitForSelector("#tab_uploadsettings");
    const uploadSettingsBtn = await page.$("#tab_uploadsettings");
    await uploadSettingsBtn.click();
    await page.waitForSelector("#TabContent_uploadsettings");
    const panel = await page.$("#TabContent_uploadsettings");
    const checkboxes = await panel.$$('[type="checkbox"]');
    await checkboxes[0].click();
    const saveBtn = await page.$("#btn-action-save");
    await saveBtn.click();
    await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
      state: "visible",
    });
    fs.appendFileSync("list.txt", `${id}, \n`);
    console.log(`${id}`);
  }
};

export const auditProductPageDesign = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_view_details.php?product_id=${id}`,
      { timeout: 300000 }
    );
    await page.waitForSelector(".profile-user-info.profile-user-info-striped", {
      state: "visible",
    });
    const container = await page.$$(
      ".profile-user-info.profile-user-info-striped"
    );
    const spanEditable = await container[0].$$(".editable");
    const url = await spanEditable[1].innerText();
    const urlFinal = `https://www.apprinting.com/${url}/`;
    await page.goto(urlFinal, { timeout: 300000 });
    await page.waitForSelector("#product-info", {
      state: "visible",
    });
    const productInfo = await page.$("#product-info");
    const productDetailSection = await productInfo.$("#scrollspyHeading1");
    if (productDetailSection) {
      fs.appendFileSync(
        "list-product-page-design-true.txt",
        `${id} ---> ${true} \n`
      );
    } else {
      fs.appendFileSync(
        "list-product-page-design-false.txt",
        `${id} ---> ${false} \n`
      );
    }
    console.log(`${id} ---> Working`);
  }
};

export const backupProductPageDesign = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    await page.waitForSelector("#product_details", {
      state: "visible",
    });
    const productDetailsContainer = await page.$("#product_details");
    const productNameElement = await productDetailsContainer.$(
      "#products_title_1"
    );
    const productName = await productNameElement.inputValue();
    const urlProductElement = await productDetailsContainer.$("#product_url_1");
    const urlProduct = await urlProductElement.inputValue();
    const defaultCategoryProductElement = await productDetailsContainer.$(
      ".filter-option-inner-inner"
    );
    const defaultCategoryProduct =
      await defaultCategoryProductElement.innerText();
    const associatedCategorySelectedElement = await productDetailsContainer.$(
      ".multiselect-selected-text"
    );
    const associatedCategorySelected =
      await associatedCategorySelectedElement.innerText();
    await page.goto(
      `https://www.apprinting.com/admin/product_description.php?product_id=${id}`,
      { timeout: 300000 }
    );
    await page.waitForSelector(".form-horizontal", {
      state: "visible",
    });
    const formHorizontalContainer = await page.$(".form-horizontal");
    const shortDescriptionElementTextArea = await formHorizontalContainer.$(
      "#product_description_1"
    );
    const shortDescriptionTextArea =
      await shortDescriptionElementTextArea.innerText();
    const longDescriptionElementTextArea = await formHorizontalContainer.$(
      "#long_description_1"
    );
    const longDescriptionTextArea =
      await longDescriptionElementTextArea.innerText();
    const longDescriptionTwoElementTextArea = await formHorizontalContainer.$(
      "#long_description_two_1"
    );
    const longDescriptionTwoTextArea =
      await longDescriptionTwoElementTextArea.innerText();
    const uploadCenterDescriptionElementTextArea =
      await formHorizontalContainer.$("#upload_description_1");
    const uploadCenterDescriptionTextArea =
      await uploadCenterDescriptionElementTextArea.innerText();
    const browseDesignDescriptionElementTextArea =
      await formHorizontalContainer.$("#browse_description_1");
    const browseDesignDescriptionTextArea =
      await browseDesignDescriptionElementTextArea.innerText();
    fs.appendFileSync(
      "list-backup-product-false-design.txt",
      `${id} *** ${productName} *** ${urlProduct} *** ${defaultCategoryProduct} *** ${associatedCategorySelected} *** ${shortDescriptionTextArea} *** ${longDescriptionTextArea} *** ${longDescriptionTwoTextArea} *** ${uploadCenterDescriptionTextArea} *** ${browseDesignDescriptionTextArea} \n`
    );
    console.log(`${id}`);
  }
};

export const changedSeoData = async (page) => {
  let i = 0;
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_metatags.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const responsePromise = page.waitForResponse(
      `https://www.apprinting.com/admin/product_metatags.php?product_id=${id}`
    );
    const btnSave = await page.$("#btn-action-save");
    const pageTitle = await page.$("#seo_page_title_1");
    const metaDescription = await page.$("#seo_page_description_1");
    const markUp = await page.$("#schema_markup_1");
    const metaAdditional = await page.$("#seo_page_metatags1");
    await pageTitle.fill(seoData[i][0]);
    await metaDescription.fill(seoData[i][1]);
    await markUp.fill(seoData[i][2]);
    await metaAdditional.fill("");
    await btnSave.click();
    await responsePromise;
    // await page.waitForTimeout(3000);
    fs.appendFileSync("list.txt", id + "\n");
    i = i + 1;
    console.log(`Working ---> ${i}`);
  }
};

export const setMarkUpData = async (page) => {
  let i = 0;
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_metatags.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const responsePromise = page.waitForResponse(
      `https://www.apprinting.com/admin/product_metatags.php?product_id=${id}`
    );
    const btnSave = await page.$("#btn-action-save");
    const markUp = await page.$("#schema_markup_1");
    await markUp.fill(seoData[i]);
    await btnSave.click();
    await responsePromise;
    fs.appendFileSync("list.txt", id + "\n");
    i = i + 1;
    console.log(`Working ---> ${i}`);
  }
};

export const setAdditionalMetaTag = async (page) => {
  let i = 0;
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_metatags.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const responsePromise = page.waitForResponse(
      `https://www.apprinting.com/admin/product_metatags.php?product_id=${id}`
    );
    const btnSave = await page.$("#btn-action-save");
    const metaAdditional = await page.$("#seo_page_metatags1");
    await metaAdditional.fill("");
    await btnSave.click();
    await responsePromise;
    fs.appendFileSync("list.txt", id + "\n");
    i = i + 1;
    console.log(`Working ---> ${i}`);
  }
};

export const getMarkUpSchemaProducts = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );

    const productName = await page.$("#products_title_1");
    const productNameValue = await productName.inputValue();
    const productSku = await page.$("#products_sku");
    const productSkuValue = await productSku.inputValue();
    const images = [];

    await page.goto(
      `https://www.apprinting.com/admin/product_image_gallery_listing.php?product_id=${id}`,
      { timeout: 300000 }
    );

    const imageSection = await page.$("#ops-table_wrapper");
    const imagesHtml = await imageSection.$$("img");
    if (imagesHtml.length !== 0) {
      await imageSection.waitForSelector("img");
      for await (const image of imagesHtml) {
        const imageInnerHtml = await image.getAttribute("src");
        images.push(`"${imageInnerHtml}"`);
      }
    } else {
      await page.goto(
        `https://www.apprinting.com/admin/product_description.php?product_id=${id}`,
        { timeout: 300000 }
      );
      const imageSectionEdit = await page.$(".res-img.res-img-old");
      if (imageSectionEdit !== null) {
        await page.waitForSelector(".res-img.res-img-old");
        const imageHtmlEdit = await imageSectionEdit.$("img");
        const imageEdit = await imageHtmlEdit.getAttribute("src");
        images.push(`"${imageEdit}"`);
      }
    }

    const report = `\`{"@context":"https://schema.org/","@type":"Product","name":"${productNameValue}","image": [${images}],"description":"${productNameValue}. A high-quality product offered by AP PRINTING. Our design team ensures that every detail is perfect to meet our customers' needs.","sku":"${productSkuValue}","brand":{"@type":"Brand","name":"AP PRINTING"},"review":{"@type":"Review","reviewRating":{"@type":"Rating","ratingValue":"4","bestRating":"5"},"author":{"@type":"Person","name":"AP PRINTING DESIGN TEAM"}},"aggregateRating":{"@type":"AggregateRating","ratingValue":"${(
      Math.random() * (5 - 4.1) +
      4.1
    ).toFixed(1)}","reviewCount":"${Math.floor(
      Math.random() * (9000 - 15000) + 9000
    )}"},"offers": {"@type": "Offer","url": "https://www.apprinting.com/blue-flowers-and-leaves-wedding-invitation/","priceCurrency": "USD","price": "85.00","priceValidUntil": "2024-12-24","itemCondition": "https://schema.org/UsedCondition","availability": "https://schema.org/InStock"}}\`],`;

    fs.appendFileSync("list.txt", report + "\n");
    console.log(report);
  }
};

export const getTitleTitleImagesGallery = async (page) => {
  const idArray = [];
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_image_gallery_listing.php?product_id=${id}`,
      { timeout: 300000 }
    );

    const imageSection = await page.$("#ops-table_wrapper");
    await imageSection.waitForSelector("img");
    // const responsePromise = page.waitForResponse(
    //   `https://www.apprinting.com/admin/product_image_gallery_listing.php?product_id=${id}`
    // );
    // const response = await responsePromise;
    const inputsTitle = await page.$$(".form-control.input-medium");
    for await (const input of inputsTitle) {
      const titleImage = await input.inputValue();
      if (titleImage === "") {
        idArray.push(id);
      }
    }
    console.log(id);
  }
  fs.appendFileSync("list.txt", idArray.toString() + "\n");
};

export const getTitleAndChangedTitleImagesGallery = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_image_gallery_listing.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const responsePromise = page.waitForResponse(
      `https://www.apprinting.com/admin/product_image_gallery_listing.php?product_id=${id}`
    );
    // const response = await responsePromise;

    const imageSection = await page.$("#ops-table_wrapper");
    await imageSection.waitForSelector("img");

    const pageHeader = await page.$(".page-header");
    const title = await pageHeader.$("small");
    const titleString = await title.innerText();
    const inputsTitle = await page.$$(".form-control.input-medium");
    if (inputsTitle.length > 1) {
      for await (const input of inputsTitle) {
        await input.fill(titleString);
      }
      const btnEdit = await page.$("#btn-action-edit");
      await btnEdit.click();
      await responsePromise;
    }
    const report = `${id},`;
    fs.appendFileSync("list.txt", report + "\n");
    console.log(report);
  }
};

export const getChangedTitleProduct = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const btnSave = await page.$("#btn-action-save");
    const title = await page.$("#products_title_1");
    const valueInput = await title.inputValue();
    const newTitle = await valueInput.replace("C/E", "");
    // const newTitleAddSection = valueInput + " Flowers";
    // const newTitleTwo = await newTitle.replace("Simple Flat", "");
    // const newTitleThree = await newTitleTwo.replace("Simple Flat 5x7", "");
    // const newTitleFinal = (await newTitleThree) + "Simple Flat 5x7";
    await title.fill(newTitle);
    await btnSave.click();
    await page.waitForTimeout(3000);
    console.log(
      "Working ---> ",
      id,
      " Old Title ---> ",
      valueInput,
      " New Title ---> ",
      newTitle
    );
    // console.log(newTitle);
  }
};

export const filterDataListArray = (filterString) => {
  dataProducts.forEach((product) => {
    // if (
    //   product.title.search(filterString) !== -1
    // ) {
    //   fs.appendFileSync(
    //     `list.txt`,
    //     //product.id.toString() + `---> ${product.title}` + ",\n"
    //     product.id.toString() + ",\n"
    //   );
    // }
    const report = `${product.id}\n`;
    // const report = `${product.title},\n`;
    // const report = `"${product.title}",\n`;
    // const report = `${product.id},\n`;
    // const report = `${product.title},\n`;
    // const report = `"${product.url}",\n`;
    fs.appendFileSync("list.txt", report);
    console.log(report);
  });
};

export const filtersDataListArray = (filterString) => {
  dataProducts.forEach((product) => {
    if (
      product.title.search(filterString) !== -1 &&
      product.title.search("Pocket Invitation Card") === -1
      // &&
      // product.title.search("Sleeve") === -1 &&
      // product.title.search("Square") === -1 &&
      // product.title.search("Cascade") === -1 &&
      // product.title.search("Atlas") === -1 &&
      // product.title.search("Denali") === -1 &&
      // product.title.search("Acrylic") === -1 &&
      // product.title.search("Bilingual") === -1 &&
      // product.title.search("Laser Cut") === -1 &&
      // product.title.search("Fancy Luxury") === -1
    ) {
      fs.appendFileSync(
        "list.txt",
        // product.id.toString() + `---> ${product.title}` + ",\n"
        product.id.toString() + ",\n"
      );
    }
    console.log(product);
  });
};

export const getTitleFilterProduct = async (page, filterString) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const title = await page.$("#products_title_1");
    const valueInput = await title.inputValue();
    if ((await valueInput.search(filterString)) !== -1) {
      fs.appendFileSync("list.txt", id.toString() + ",\n");
    }
    console.log("Working ---> ", id, " ------> ", valueInput);
  }
};

export const getStatusCheckboxes = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    // await page.waitForTimeout(3000)
    const productType = await page.$eval(
      "#product_type_3",
      (node) => node.inputValue
    );
    // const checkBox = await productType.evaluate((element) => {
    // window.getComputedStyle(element).getPropertyValue("background-image")

    // });
    // for await (let checkbox of checkboxes) {
    //   const titleCheckbox = await checkbox.inn
    //   console.log(titleCheckbox);
    // }
    // const report = `{id:${id},url:"https://www.apprinting.com/${urlInput}/"},\n`;
    // const report = `${urlInput}\n`;
    // fs.appendFileSync(`list.txt`, report);
    // console.log(`working ---> ${report}`);
    console.log(productType);
  }
};

export const getUrlProducts = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const url = await page.$("#product_url_1");
    const urlInput = await url.inputValue();
    const report = `{id:${id},url:"https://www.apprinting.com/${urlInput}/"},\n`;
    // const report = `${urlInput}\n`;
    fs.appendFileSync("list.txt", report);
    console.log(`working ---> ${report}`);
  }
};

export const getTitleProduct = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const title = await page.$("#products_title_1");
    const valueInput = await title.inputValue();
    const report = `{id:${id},title:"${valueInput}"},\n`;
    // const report = `${valueInput}\n`;
    fs.appendFileSync("list.txt", report);
    console.log(`working ---> ${report}`);
  }
};

export const addSetupProductPageDesigner = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_designer_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const pageName1 = await page.$("#pagename_0");
    await pageName1.fill("English Card");

    const btnAdd = await page.$('[data-tableaddrow="page_table"]');
    await btnAdd.click();
    await page.waitForTimeout(3000);

    const pageName7 = await page.$("#pagename_7");
    await pageName7.fill("Chinese Card");

    const pageSort7 = await page.$("#pagesort_7");
    await pageSort7.fill("15");

    const tablePage = await page.$("#page_table");
    await tablePage.screenshot({ path: "./table-page.jpg" });
    // const title = await page.$("#products_title_1");
    // const valueInput = await title.inputValue();
    // fs.appendFileSync(`list.txt`, `{id:${id},title:"${valueInput}"},\n`);
    // console.log("Working ---> ", id, " ------> ", valueInput);
  }
};

export const auditActionBtv = async (page) => {
  for await (const data of dataProducts) {
    await page.goto(data.url, { timeout: 300000 });
    // await page.waitForTimeout(3000);
    const actionsButtons = await page.$("#action-btn");
    const actions = await actionsButtons.$$eval("a", (node) =>
      node.map((n) => n.innerText)
    );
    for await (const action of actions) {
      if (action === "Personalize") {
        const report = `{id:${data.id},url:${data.url}},\n`;
        fs.appendFileSync("list.txt", report);
        console.log(report);
      }
    }
  }
};

export const auditActionBtvVerify = async (page) => {
  for await (const data of dataProducts) {
    await page.goto(data.url, { timeout: 300000 });
    // await page.waitForTimeout(3000);
    const personalizeBtn = await page.$(".browse_design");
    await personalizeBtn.click();
    await page.waitForTimeout(3000);
    const getUrl = await page.url();
    const report = `{id:${data.id},url:"${data.url}",personalizeGetUrl:"${getUrl}"},\n`;
    fs.appendFileSync("list.txt", report);
    console.log(report);
  }
};

export const filterPersonalizeBtnActions = () => {
  dataProducts.forEach((product) => {
    // const report = `{id:${product.id},url:"${product.url}",personalizeUrl:"${product.personalizeGetUrl}"}\n`;
    const report = `${product.id},\n`;
    if (
      product.personalizeGetUrl.search("product_design_customize.php") === -1
    ) {
      fs.appendFileSync("list.txt", report);
    }
    console.log(report);
  });
};

export const StatusActionsBtn = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const productTypeBrowseDesign = await page.$("#product_type_3");
    const inputBrowseDesign = await productTypeBrowseDesign.$("input");
    const statusBrowseDesign = await inputBrowseDesign.isChecked();
    const productTypeCustomDesign = await page.$("#product_type_1");
    const inputCustomDesign = await productTypeCustomDesign.$("input");
    const statusCustomDesign = await inputCustomDesign.isChecked();
    const report = `{id:${id},statusBrowseDesign:${statusBrowseDesign},statusCustomDesign:${statusCustomDesign}}\n`;
    fs.appendFileSync("list.txt", report);
    console.log(report);
  }
};

export const changeActionsBtn = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const responsePromise = page.waitForResponse(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`
    );
    const btnSave = await page.$("#btn-action-save");
    const productTypeBrowseDesign = await page.$("#product_type_3");
    const inputBrowseDesign = await productTypeBrowseDesign.$("input");
    await inputBrowseDesign.click();
    const productTypeCustomDesign = await page.$("#product_type_1");
    const inputCustomDesign = await productTypeCustomDesign.$("input");
    await inputCustomDesign.click();
    await btnSave.click();
    await responsePromise;
    // await page.waitForTimeout(7000);
    const report = `${id}\n`;
    fs.appendFileSync("list.txt", report);
    console.log(report);
  }
};

export const checkedAndSetOnUploadArtworkLaterOption = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_settings.php?product_id=${id}`,
      { timeout: 300000 }
    );

    const btnSave = await page.$("#btn-action-save");
    const uploadTabContent = await page.$("#tab_uploadsettings");

    await uploadTabContent.click();

    const options = await page.$$(".switchbutton-element");

    const uploadArtworkLaterOption = await options[10].innerHTML();
    const uploadArtworkLaterOptionChecked =
      await uploadArtworkLaterOption.search("checked");

    if (uploadArtworkLaterOptionChecked === -1) {
      const responsePromise = page.waitForResponse(
        `https://www.apprinting.com/admin/product_settings.php?product_id=${id}`
      );
      await options[10].click();
      await btnSave.click();
      await responsePromise;
    }

    const report = `${id}\n`;
    fs.appendFileSync("list.txt", report);
    console.log(report);
  }
};

export const checkedUploadArtworkLaterOption = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_settings.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const report = `${id}\n`;
    const uploadTabContent = await page.$("#tab_uploadsettings");

    await uploadTabContent.click();

    const options = await page.$$(".switchbutton-element");

    const uploadArtworkLaterOption = await options[10].innerHTML();
    const uploadArtworkLaterOptionChecked =
      await uploadArtworkLaterOption.search("checked");

    if (uploadArtworkLaterOptionChecked === -1) {
      fs.appendFileSync("list.txt", report);
    }

    console.log(report);
  }
};

// const insertPrice = async (page, tdInputs, price) => {
//   const inputPrice = []
//   let i = 0
//   for await (const input of tdInputs) {
//     const inputHtml = await input.innerHTML()
//     if (inputHtml.search('calulate_vendor_addoption_price') === -1) {
//       i++
//       if (i === 3) {
//         inputPrice.push(input)
//         i = 0
//       }
//     }
//   }
//   for await (const inputTextPrice of inputPrice) {
//     await inputTextPrice.fill(price)
//   }
// }

const checkPrice = async (tdInputs, price) => {
  const inputPrice = [];
  let i = 0;
  for await (const input of tdInputs) {
    const inputHtml = await input.innerHTML();
    if (inputHtml.search("calulate_vendor_addoption_price") === -1) {
      i++;
      if (i === 3) {
        inputPrice.push(input);
        i = 0;
      }
    }
  }
  for await (const inputTextPrice of inputPrice) {
    const value = await inputTextPrice.inputValue();
    if (value !== price) {
      return false;
    }
  }
  return true;
};

const deleteArtworkOption = async (page, tr) => {
  const actionButton = await tr.$(".dropdown-action-btn");
  await actionButton.click();
  await tr.waitForSelector(".dropdown-menu");
  const dropdownMenu = await tr.$(".dropdown-menu");
  await dropdownMenu.waitForSelector("a.delete.ajax");
  const buttonDelete = await dropdownMenu.$("a.delete.ajax");
  await buttonDelete.click();
  await page.waitForSelector(".modal-open");
  const modalAcceptDelete = await page.$(".modal-open");
  const buttonAccept = await modalAcceptDelete.$(".bootbox-accept");
  await buttonAccept.click();
  // await page.waitForSelector(".modal-open", { state: "hidden" });
  await page.waitForTimeout(20000);
};

const auditCheckArtworkOptions = async (page, tr) => {
  const actionButton = await tr.$(".dropdown-action-btn");
  await actionButton.click();
  await tr.waitForSelector(".dropdown-menu");
  const dropdownMenu = await tr.$(".dropdown-menu");

  const dropdownMenuOptions = await dropdownMenu.$$("a");
  await dropdownMenuOptions[1].click();

  await page.waitForSelector(".table-responsive");
  const attributePriceTable = await page.$$("tbody");
  try {
    const tdInputsOne = await attributePriceTable[2].$$("input");
    const tdInputsTwo = await attributePriceTable[3].$$("input");

    const checkPrice30 = await checkPrice(tdInputsOne, "30");
    const checkPrice75 = await checkPrice(tdInputsTwo, "75");

    if (checkPrice30 === true && checkPrice75 === true) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const checkArtworkOptions = async (page) => {
  const additionalOptionsTable = await page.$("#ops-table");
  const tbody = await additionalOptionsTable.$("tbody");
  const additionalOptionsTrTable = await tbody.$$("tr");
  for await (const tr of additionalOptionsTrTable) {
    const trHtml = await tr.innerHTML();
    if (
      trHtml.includes("Artwork") === true ||
      trHtml.includes("ARTWORK") === true ||
      trHtml.includes("artwork") === true
    ) {
      await deleteArtworkOption(page, tr);
      await checkArtworkOptions(page);
    }
  }
  return false;
};

const checkArtworkOptionsAudit = async (page) => {
  const additionalOptionsTable = await page.$("#ops-table");
  const tbody = await additionalOptionsTable.$("tbody");
  const additionalOptionsTrTable = await tbody.$$("tr");
  let artworkLen = 0;
  for await (const tr of additionalOptionsTrTable) {
    const trHtml = await tr.innerHTML();
    if (
      trHtml.includes("Artwork") === true ||
      trHtml.includes("ARTWORK") === true ||
      trHtml.includes("artwork") === true
    ) {
      artworkLen++;
      // const auditOptionsArtwork = await auditCheckArtworkOptions(page, tr)
      // if (auditOptionsArtwork === true) {
      //   return true
      // } else {
      //   return false
      // }
      return artworkLen;
    }
  }
  return artworkLen;
  // if (artworkLen !== 1) {
  //   return false
  // }
};

const createArtworkOption = async (page, id) => {
  await page.goto(
    `https://www.apprinting.com/admin/product_additionalinfo_action.php?product_id=${id}`
  );
  await page.once("load", () => console.log("Page loaded!"));
  await page.waitForSelector("#frmqadditionalfieldaction");
  // await page.waitForTimeout(7000)
  const titleInput = await page.$("#title1");
  await titleInput.fill("Artwork");
  const dropDownRadio = await page.$("#radio_combo");
  await dropDownRadio.click();
  const sortInput = await page.$("#addition_sort_order");
  await sortInput.fill("1700");
  const addBulkData = await page.$("#addbulkitem");
  await addBulkData.click();
  const addBulkDataContainer = await page.$(".fancybox__container");
  await addBulkDataContainer.waitForSelector("#bulktext_1");
  const addBulkDataInput = await addBulkDataContainer.$("#bulktext_1");
  await addBulkDataInput.fill(
    "Upload Print Ready PDF Files,10,0\nDesign online,20,0\nWe check & adjust your art,30,30\nWe design it,40,75"
  );
  const addBulkDataButton = await addBulkDataContainer.$(
    '[data-textarea="bulktext_1"]'
  );
  await addBulkDataButton.click();

  const priceCalculationType = await page.$('[for="price_calculate_type"]');

  if (priceCalculationType) {
    const priceCalculationTypeSelect = await page.$("#price_calculate_type");
    await priceCalculationTypeSelect.selectOption("Fixed Price");
  }

  await page.waitForSelector("#btn-action-save");

  const btnActionSave = await page.$("#btn-action-save");
  await btnActionSave.click();

  await page.waitForTimeout(20000);

  // await page.waitForSelector('.float-right.action_area')
  // const attributePrice = await page.$('.float-right.action_area')
  // await attributePrice.click()

  // await page.waitForSelector('.table-responsive')
  // const attributePriceTable = await page.$$('tbody')

  // const tdInputsOne = await attributePriceTable[2].$$('input')
  // const tdInputsTwo = await attributePriceTable[3].$$('input')

  // await insertPrice(page, tdInputsOne, '30')
  // await insertPrice(page, tdInputsTwo, '75')

  // const btnActionSaveTwo = await page.$('#btn-action-save')
  // await btnActionSaveTwo.click()
  // await page.waitForSelector('#frmadditionalprice')
  // return true
};

export const getXmlProducts = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );

    await page.waitForSelector("#frmproduct");

    // const visible = await page.$("#visible");
    // const visibleStatus = await visible.isChecked();

    // if (visibleStatus) {
    const productTitle = await page.$("#products_title_1");
    const productTitleValue = await productTitle.inputValue();

    const urlProduct = await page.$("#product_url_1");
    const urlProductValue = await urlProduct.inputValue();

    const skuProduct = await page.$("#products_sku");
    const skuProductValue = await skuProduct.inputValue();

    await page.goto(
      `https://www.apprinting.com/admin/product_description.php?product_id=${id}`,
      { timeout: 300000 }
    );
    let image = "";
    try {
      await page.waitForSelector(".showuploadfile");
      const formHorizontal = await page.$(".res-img");
      const imagesForm = await formHorizontal.$("img");
      image = await imagesForm.getAttribute("src");
    } catch (error) {
      image = "";
    }

    await page.goto(
      `https://www.apprinting.com/admin/product_image_gallery_listing.php?product_id=${id}`,
      { timeout: 300000 }
    );

    await page.waitForSelector(".page-content");
    const imgSection = await page.$$(".gridcell");

    let images = "";

    for await (const img of imgSection) {
      const imgHtml = await img.$("img");
      const imgSrc = await imgHtml.getAttribute("src");
      images += `<g:additional_image_link>${imgSrc}</g:additional_image_link>`;
    }

    // let images = [];

    // for await (const img of imagesForm) {
    //   const imgSrc = await img.getAttribute("src");
    //   images.push(imgSrc);
    // }

    // const image = images.find((img) => img.search(".png" | ".jpg" | ".jpeg") !== -1);

    // const descriptionProduct = await page.$("#product_description_1");
    // const descriptionProductValue = await descriptionProduct.inputValue();
    // const descriptionProductValueFinal = await removeHtmlTags(
    //   descriptionProductValue,
    //   "&nbsp;"
    // );

      await page.goto(`https://www.apprinting.com/en/${urlProductValue}`, {
        timeout: 300000,
      });
      const priceSpan = await page.$("#disp_product_price");
      const priceSpanValue = await priceSpan.innerText();
      const price = await priceSpanValue.replace("$","");

    // await page.goto(
    //   `https://www.apprinting.com/admin/product_price.php?product_id=${id}`,
    //   { timeout: 300000 }
    // );

    // await page.waitForSelector("#frmprice");

    // const priceInput = await page.$('[data-label="Price"]');
    // const price = await priceInput.inputValue();
    //const price = Number(priceTotal/100).toFixed(2);
    // for await (const element of pricesProduct) {
    //   const input = await element.innerHTML();
    //   console.log(input);

    // }

    // const inputPrice = await pricesProduct[3].$("input");

    // const price = await inputPrice.inputValue();
    // let price;
    // if (search === "edit") {
    //    price = await pricesProduct[16].inputValue();
    // } else {
    //   price = await pricesProduct[16].inputValue();
    // }

    // for await (const price of pricesProduct) {
    //   const value = await price.innerHTML();
    //   console.log(value);
    // }

    const item = `https://www.apprinting.com/en/${urlProductValue}/,${productTitleValue},<g:id>${id}</g:id>,<g:link>https://www.apprinting.com/en/${urlProductValue}/</g:link>,<g:image_link>${image}</g:image_link>,${images},<g:availability>in stock</g:availability>,<g:price>${price} USD</g:price>,<g:condition>new</g:condition>,<g:brand>AP PRINTING</g:brand>,<g:sku>${skuProductValue}</g:sku>,<g:adult>no</g:adult>,<g:identifier_exists>no</g:identifier_exists>`;

    // const item = `
    //   <item>
    //     <g:id>${id}</g:id>
    //     <g:title>${productTitleValue}</g:title>
    //     <g:description>${descriptionProductValueFinal}</g:description>
    //     <g:link>https://www.apprinting.com/${urlProductValue}/</g:link>
    //     <g:image_link>${image}</g:image_link>
    //     <g:availability>in stock</g:availability>
    //     <g:price>${price} USD</g:price>
    //     <g:condition>new</g:condition>
    //     <g:brand>AP PRINTING</g:brand>
    //     <g:sku>${skuProductValue}</g:sku>
    //     <g:adult>no</g:adult>
    //     <g:gender>unisex</g:gender>
    //     <g:identifier_exists>no</g:identifier_exists>
    //   </item>
    // `;
    // const item = `https://www.apprinting.com/${urlProductValue}/`;
    fs.appendFileSync("list-test-save-the-date-5-30-2025.xml", `${item}\n`);
    //}
    // console.log(`${id} ---> Working`);

    // console.log(`${id} ---> Working`);
  }
};

export const getIdUrlClient = async (page) => {
  for await (const url of urlProducts) {
    await page.goto(url, { timeout: 300000 });
    const element = await page.$('[class^="col div_product_price_"]');
    const attributeClass = await element.getAttribute("class");
    fs.appendFileSync("list-id-client.txt", `${attributeClass}\n`);
    console.log(attributeClass);
  }
};

const cleanInputsPriceTag = async (page) => {
  const tables = await page.$$(".table-responsive");

  // const qtyFromInputs = await tables[table].$$('[name^="txtqty"]');
  // for await (const element of qtyFromInputs) {
  //   await element.fill();
  //   // const inputValue = await element.inputValue();
  //   // console.log(inputValue);
  // }
  // const qtyToInputs = await tables[table].$$('[name^="totxtqty"]');
  // for await (const element of qtyToInputs) {
  //   await element.fill();
  //   // const inputValue = await element.inputValue();
  //   // console.log(inputValue);
  // }
  for await (const table of tables) {
    const priceInputs = await table.$$('[name^="txtprice"]');
    for await (const element of priceInputs) {
      await element.fill("");
    }
  }

  const saveBtn = await page.$("#btn-action-save");
  await saveBtn.click();
  await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
    state: "visible",
  });
};

export const changeProductConfig = async (page) => {
  for await (const id of idProducts) {
    // //Price Defining Method
    // await page.goto(
    //   `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
    //   { timeout: 300000 }
    // );
    // await page.waitForSelector("#product_details");
    // const priceDefiningMethodSelect = await page.$("#price_defining_method");
    // const priceDefiningMethodSelectValue =
    //   await priceDefiningMethodSelect.inputValue();
    // if (priceDefiningMethodSelectValue !== "1") {
    //   await priceDefiningMethodSelect.selectOption("1");
    //   const saveBtn = await page.$("#btn-action-save");
    //   await saveBtn.click();
    //   await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
    //     state: "visible",
    //   });
    //   console.log("chague option");
    // } else {
    //   console.log("good option");
    // }

    // Edit Designer Option
    // let clean = false;
    // while (clean === false) {
    await page.goto(
      `https://www.apprinting.com/admin/product_designer_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    // try {
    await page.waitForSelector("#size_table");
    const sizeTable = await page.$("#size_table");
    const sizeTitle = await sizeTable.$$('[type="text"],[id^="sizetitle"]');
    let flagBtnRemoveRow = 0;
    for await (const size of sizeTitle) {
      const sizeTitleValue = await size.inputValue();
      console.log(sizeTitleValue);

      // if (size !== 0) {
      //   await btn.click();
      // }
      // flagBtnRemoveRow++;
    }
    // let saveBtn = await page.$("#btn-action-save");
    // await saveBtn.click();
    // await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
    //   state: "visible",
    // });
    // clean = true
    // } catch (error) {clean = false}
    // }

    // const addBulkDataBtn = await page.$("#addbulkitem");

    // await addBulkDataBtn.click();
    // await page.waitForSelector(".helpcontenthtml.fancybox__content");
    // const section = await page.$(".helpcontenthtml.fancybox__content");
    // const textArea = await section.$('[id^="bulktext"]');
    // await textArea.fill(designerAddBulk[0]);
    // const addBtn = await section.$('[data-textarea="bulktext_1"]');
    // await addBtn.click();
    // await page.waitForSelector(".helpcontenthtml.fancybox__content", {
    //   state: "hidden",
    // });

    // await page.waitForSelector("#btn-action-save", {
    //   state: "attached",
    // });
    // const saveBtn = await page.$("#btn-action-save");
    // await saveBtn.click();
    // await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
    //   state: "visible",
    // });
    // console.log(btnRemoveRow.length);

    // await page.waitForTimeout(3000);
    // const sectionTable = await page.$("tbody");
    // const options = await sectionTable.$$("tr");
    // for await (const option of options) {
    //   try {
    //     const sizeTitleOption = await option.$('[id^="sizetitle_"]');
    //     const sizeTitleOptionValue = await sizeTitleOption.inputValue();
    //     console.log(sizeTitleOptionValue);

    //     if (
    //       sizeTitleOptionValue === '4" x 6"' ||
    //       sizeTitleOptionValue === '4.5" x 6.25"' ||
    //       sizeTitleOptionValue === '5" x 7" (folds to 3.5" x 5")' ||
    //       sizeTitleOptionValue === '6" x 8" (folds to 4" x 6")' ||
    //       sizeTitleOptionValue === '7" x 10" (folds to 5" x 7")' ||
    //       sizeTitleOptionValue === '8.5" x 5.5" (folds to 4.25" x 5.5")' ||
    //       sizeTitleOptionValue === '9" x 6.25" (folds to 4.5" x 6.25")'
    //     ) {
    //       let active = await option.$('[type="checkbox"]');
    //       const isActive = await active.isChecked();
    //       if (isActive === true) {
    //         active = await option.$('[type="checkbox"]');
    //         await active.click();
    //         const saveBtn = await page.$("#btn-action-save");
    //         await saveBtn.click();
    //         await page.waitForTimeout(3000);
    //       }
    //     }
    //   } catch (error) {}
    // }

    // Product Price
    // await page.goto(
    //   `https://www.apprinting.com/admin/product_price.php?product_id=${id}`,
    //   { timeout: 300000 }
    // );
    // await page.waitForSelector("#product_price_content");

    // await cleanInputsPriceTag(page);

    // await page.waitForSelector("#product_price_content");

    // const addBulkDataBtn = await page.$$("#addbulkitem");
    // let flagPrice = 0;
    // for await (const btn of addBulkDataBtn) {
    //   await btn.click();
    //   await page.waitForSelector(".helpcontenthtml.fancybox__content");
    //   const section = await page.$(".helpcontenthtml.fancybox__content");
    //   const textArea = await section.$('[id^="bulktext"]');
    //   await textArea.fill(pricesAddBulk[flagPrice]);
    //   const addBtn = await section.$('[id^="addnewbulkprice"]');
    //   await addBtn.click();
    //   await page.waitForSelector(".helpcontenthtml.fancybox__content", {
    //     state: "hidden",
    //   });
    //   flagPrice++;
    // }
    // await page.waitForSelector("#btn-action-save", {
    //   state: "attached",
    // });
    // const saveBtn = await page.$("#btn-action-save");
    // await saveBtn.click();
    // await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
    //   state: "visible",
    // });

    // // Change Paper Options
    // await page.goto(
    //   `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`,
    //   { timeout: 300000 }
    // );
    // await page.waitForSelector("#ops-table");
    // try {
    //   const sectionProductAddOption = await page.$$('[id^="prod_add_opt_id"]');
    //   for await (const section of sectionProductAddOption) {
    //     const title = await section.$(".text-primary");
    //     const titleValue = await title.innerText();
    //     console.log(titleValue);

    //     if (titleValue === "Paper Type" || titleValue === "Paper") {
    //       await btnMenuAction(page, section, 0);
    //       await page.waitForSelector("#option_table", {
    //         state: "visible",
    //       });

    //       const deleteAttribute = await page.$$(".remove_row");

    //       for await (const deleteBtn of deleteAttribute) {
    //         await deleteBtn.click();
    //       }

    //       const attributeTitle = await page.$$('[id^="attr_label"]');
    //       await attributeTitle[0].fill("Premium White Matte Cardstock");

    //       const addBulkData = await page.$("#addbulkitem");
    //       await addBulkData.click();
    //       const addBulkDataContainer = await page.$(".fancybox__container");
    //       await addBulkDataContainer.waitForSelector("#bulktext_1");
    //       const addBulkDataInput = await addBulkDataContainer.$("#bulktext_1");
    //       await addBulkDataInput.fill(
    //         "Premium White Linen Cardstock - (+$0.10),20,0\nPremium Metallic Shimmer Color Paper - (+$0.20),30,0"
    //       );
    //       const addBulkDataButton = await addBulkDataContainer.$(
    //         '[data-textarea="bulktext_1"]'
    //       );
    //       await addBulkDataButton.click();

    //       const saveBtn = await page.$("#btn-action-save");
    //       await saveBtn.click();
    //       await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
    //         state: "visible",
    //       });
    //     }
    //   }
    // } catch (error) {}

    // // Additional Options
    // await page.goto(
    //   `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`,
    //   { timeout: 300000 }
    // );
    // await page.waitForSelector("#ops-table");

    // const actionBtn = await page.$(".dropdown-action-btn");
    // await actionBtn.click();
    // await page.waitForSelector(".dropdown-menu.dropdown-menu-right.show");
    // const section2 = await page.$("ul.dropdown-menu.dropdown-menu-right.show");
    // const editBtn = await section2.$$("a");
    // await editBtn[1].click();
    // await page.waitForSelector("#sel_product_size");

    // await injectPrice(page, '3.5" x 5"', paperTypePrice);
    // await injectPrice(page, '4.25" x 5.5"', paperTypePrice2);
    // await injectPrice(page, '5" x 7"', paperTypePrice3);

    // let productViewOptions = await page.$("#product_view_options");
    // await productViewOptions.selectOption("Printed Side");
    // await page.waitForSelector("#frmadditionalprice");

    // await injectPrice(page, '3.5" x 5"', printeSidePrice);
    // await injectPrice(page, '4.25" x 5.5"', printeSidePrice2);
    // await injectPrice(page, '5" x 7"', printeSidePrice3);

    // await page.waitForTimeout(3000);
    // productViewOptions = await page.$("#product_view_options");
    // await productViewOptions.selectOption("Envelopes");
    // await page.waitForSelector("#frmadditionalprice");

    // // await injectPrice(page, '3.5" x 5"', envelopePrice);
    // await injectPrice(page, '4.25" x 5.5"', envelopePrice);
    // await injectPrice(page, '5" x 7"', envelopePrice2);

    // await page.waitForTimeout(3000);
    // productViewOptions = await page.$("#product_view_options");
    // await productViewOptions.selectOption("Artwork");
    // await page.waitForSelector("#frmadditionalprice");

    // await injectPrice(page, '3.5" x 5"', artworkPrice);
    // await injectPrice(page, '4.25" x 5.5"', artworkPrice);
    // await injectPrice(page, '5" x 7"', artworkPrice);

    // // Additional Options Change Status
    // await page.goto(
    //   `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`,
    //   { timeout: 300000 }
    // );
    // await page.waitForSelector("#ops-table");

    // let sectionProductAddOption = await page.$$('[id^="prod_add_opt_id"]');
    // for await (const section of sectionProductAddOption) {
    //   const title = await section.$(".text-primary");
    //   const titleValue = await title.innerText();

    //   if (
    //     titleValue !== "Paper Type" &&
    //     titleValue !== "Folding" &&
    //     titleValue !== "Printed Side" &&
    //     titleValue !== "Envelopes" &&
    //     titleValue !== "Artwork"
    //   ) {
    //     const statusBtn = await section.$("#status");
    //     const status = await statusBtn.isChecked();
    //     if (status === true) {
    //       await statusBtn.click();
    //       await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
    //         state: "visible",
    //       });
    //     }
    //   }
    // }
    // const report = `Working ---> ${id}\n`;
    // fs.appendFileSync("list.txt", report);
    // console.log(report);
  }
};

const btnMenuAction = async (page, section, action) => {
  const actionBtn = await section.$(".dropdown-action-btn");
  await actionBtn.click();
  await page.waitForSelector(".dropdown-menu.dropdown-menu-right.show");
  const section2 = await page.$("ul.dropdown-menu.dropdown-menu-right.show");
  const editBtn = await section2.$$("a");
  await editBtn[action].click();
};

const injectPrice = async (page, size, prices) => {
  const selectSize = await page.$("#sel_product_size");
  await selectSize.selectOption(size);
  await page.waitForSelector("#frmadditionalprice");

  const inputPriceAdditionalOption = await page.$$('[name^="txtprice"]');
  let flagPrinteSidePrice = 0;
  for await (const inputOption of inputPriceAdditionalOption) {
    await inputOption.fill(prices[flagPrinteSidePrice]);
    flagPrinteSidePrice++;
  }
  const saveBtn = await page.$("#btn-action-save");
  await saveBtn.click();
  await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
    state: "visible",
  });
};

export const auditProductOptions = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`,
      { timeout: 300000 }
    );
    await page.waitForSelector("#ops-table");
    const options = await page.$$('[id^="prod_add_opt_id"]');
    let attributesOptions = {
      printed: 0,
      paper: 0,
      coating: 0,
      corner: 0,
      artwork: 0,
    };
    for await (const option of options) {
      const titleOption = await option.$(".text-primary");
      const titleOptionValue = await titleOption.innerText();
      if (titleOptionValue === "Printed Sides") {
        const attributes = await option.$$(".badge.badge-info");
        attributesOptions.printed = attributes.length;
      } else if (titleOptionValue === "Paper") {
        const attributes = await option.$$(".badge.badge-info");
        attributesOptions.paper = attributes.length;
      } else if (titleOptionValue === "Coating") {
        const attributes = await option.$$(".badge.badge-info");
        attributesOptions.coating = attributes.length;
      } else if (titleOptionValue === "Corner Rounding") {
        const attributes = await option.$$(".badge.badge-info");
        attributesOptions.corner = attributes.length;
      } else if (titleOptionValue === "Artwork") {
        const attributes = await option.$$(".badge.badge-info");
        attributesOptions.artwork = attributes.length;
      }
    }
    const jsonString = JSON.stringify(attributesOptions, null, 2);
    const report = `Working ---> ${id} ---> ${jsonString}\n`;
    fs.appendFileSync("list.txt", report);
    console.log(report);
  }
};

export const getPricesProducts = async (page) => {
  for await (const id of idProducts) {
    // await page.goto(
    //   `https://www.apprinting.com/admin/product_price.php?product_id=${id}`,
    //   { timeout: 300000 }
    // );
    // const table = await page.$(".table-responsive");
    // const qtyFromInputs = await table.$$('[data-label="Quantity From"]');
    // const prices = await table.$$('[data-label="Price"]');
    // let flag = 0;
    // let pricesTotal = 0;
    // let totalSumPrice = 0;
    let pricesModel = [];
    // fs.appendFileSync("list-audit-prices-6-1-4-square-himalaya.txt", `${id},`);
    // for await (const element of qtyFromInputs) {
    //   // const inputValue = await element.inputValue();
    //   const inputPrice = await prices[flag].inputValue();
    //   flag++;
    //   totalSumPrice = totalSumPrice + Number(inputPrice);
    //   const report = `${totalSumPrice},`;
    //   // fs.appendFileSync("list-audit-prices-foil.txt", report);
    //   // console.log(report);
    // }
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`,
      { timeout: 300000 }
    );

    const sectionGroup = await page.$('[id^="prod_add_opt_id:"]');
    if (sectionGroup) await btnMenuAction(page, sectionGroup, 1);
    await page.waitForTimeout(3000);

    let selectSize = await page.$("#product_view_options");
    const options = await selectSize.$$("option");
    let optionsValue = [];
    for await (const element of options) {
      const value = await element.getAttribute("value");
      optionsValue.push(value);
    }
    for await (const element of optionsValue) {
      try {
        await page.waitForSelector("#product_view_options");
        selectSize = await page.$("#product_view_options");
        await selectSize.selectOption(element);
        await page.waitForSelector(".table-responsive");
        await page.waitForTimeout(3000);
        const prices = await page.$$('[id^="txtprice"]');

        for await (const element of prices) {
          const price = await element.inputValue();
          if (price !== "") {
            // pricesTotal = pricesTotal + Number(price);
            pricesModel.push(price);
            // const report = `${pricesTotal},`;
            // const report = `${pricesModel},`;
            // fs.appendFileSync("list-audit-prices-foil.txt", report);
            // fs.appendFileSync("model-check-simple-flat.txt", report);
            // console.log(report);
          } else {
            // const report = `PRICE NULL`;
            pricesModel.push("0");
            // fs.appendFileSync("list-audit-prices-foil.txt", report);
            // fs.appendFileSync("model-check-simple-flat.txt", report);
            // console.log(report);
          }
        }
      } catch (error) {
        fs.appendFileSync(
          "list-audit-prices-6-1-4-square-himalaya.txt",
          "ERROR PRODUCT OPTIONS"
        );
        // fs.appendFileSync("model-check-simple-flat.txt", "ERROR PRODUCT OPTIONS");
        console.log("ERROR PRODUCT OPTIONS");
      }
    }
    // let report = totalSumPrice + pricesTotal;
    let report = pricesModel.toString();
    fs.appendFileSync("list-audit-prices-6-1-4-square-himalaya.txt", `${report}\n`);
    // fs.appendFileSync("model-check-simple-flat.txt", `\n`);
  }
};

export const getModelPricesProducts = async (page) => {
  for await (const id of idProducts) {
    let pricesModel = [];
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`,
      { timeout: 300000 }
    );

    const sectionGroup = await page.$('[id^="prod_add_opt_id:"]');
    if (sectionGroup) await btnMenuAction(page, sectionGroup, 1);
    await page.waitForTimeout(3000);

    let selectSize = await page.$("#sel_product_size");
    const optionsSize = await selectSize.$$("option");

    let optionsSizeValue = [];
    for await (const size of optionsSize) {
      const value = await size.getAttribute("value");
      if (value !== "Common Price For All Size") {
        optionsSizeValue.push(value);
      }
    }

    let selectOptions = await page.$("#product_view_options");
    const options = await selectOptions.$$("option");
    let optionsValue = [];
    for await (const option of options) {
      const value = await option.getAttribute("value");
      optionsValue.push(value);
    }
    console.log(optionsSizeValue, optionsValue);

    for (let index = 0; index < optionsSizeValue.length; index++) {
      selectSize = await page.$("#sel_product_size");
      await selectSize.selectOption(optionsSizeValue[index]);
      await page.waitForTimeout(3000);
      for await (const element of optionsValue) {
        try {
          await page.waitForSelector("#product_view_options");
          selectSize = await page.$("#product_view_options");

          await selectSize.selectOption(element);
          await page.waitForSelector(".table-responsive");
          await page.waitForTimeout(3000);

          const prices = await page.$$('[id^="txtprice"]');

          for await (const element of prices) {
            const price = await element.inputValue();
            if (price !== "") {
              pricesModel.push(price);
            } else {
              pricesModel.push("0");
            }
          }
        } catch (error) {
          fs.appendFileSync(
            "list-audit-prices-6-1-4-square-himalaya.txt",
            "ERROR PRODUCT OPTIONS"
          );
          console.log("ERROR PRODUCT OPTIONS");
        }
      }
    }
    let report = pricesModel.toString();
    fs.appendFileSync("list-audit-prices-6-1-4-square-himalaya.txt", `${report}\n`);
  }
};

export const getTotalModelPricesProducts = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_price.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const table = await page.$(".table-responsive");
    const qtyFromInputs = await table.$$('[data-label="Quantity From"]');
    const prices = await table.$$('[data-label="Price"]');
    let flag = 0;
    let pricesTotal = 0;
    let totalSumPrice = 0;
    let pricesModel = [];
    fs.appendFileSync("list-audit-prices-6-1-4-square-himalaya.txt", `${id},`);
    for await (const element of qtyFromInputs) {
      const inputPrice = await prices[flag].inputValue();
      flag++;
      totalSumPrice = totalSumPrice + Number(inputPrice);
      const report = `${totalSumPrice},`;
    }
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`,
      { timeout: 300000 }
    );

    const sectionGroup = await page.$('[id^="prod_add_opt_id:"]');
    if (sectionGroup) await btnMenuAction(page, sectionGroup, 1);
    await page.waitForTimeout(3000);

    let selectSize = await page.$("#sel_product_size");
    const optionsSize = await selectSize.$$("option");

    let optionsSizeValue = [];
    for await (const size of optionsSize) {
      const value = await size.getAttribute("value");
      if (value !== "Common Price For All Size") {
        optionsSizeValue.push(value);
      }
    }

    let selectOptions = await page.$("#product_view_options");
    const options = await selectOptions.$$("option");
    let optionsValue = [];
    for await (const option of options) {
      const value = await option.getAttribute("value");
      optionsValue.push(value);
    }
    console.log(optionsSizeValue, optionsValue);

    for (let index = 0; index < optionsSizeValue.length; index++) {
      selectSize = await page.$("#sel_product_size");
      await selectSize.selectOption(optionsSizeValue[index]);
      await page.waitForTimeout(3000);
      for await (const element of optionsValue) {
        try {
          await page.waitForSelector("#product_view_options");
          selectSize = await page.$("#product_view_options");

          await selectSize.selectOption(element);
          await page.waitForSelector(".table-responsive");
          await page.waitForTimeout(3000);

          const prices = await page.$$('[id^="txtprice"]');

          for await (const element of prices) {
            const price = await element.inputValue();
            if (price !== "") {
              pricesTotal = pricesTotal + Number(price);
              pricesModel.push(price);
            } else {
              pricesModel.push("0");
            }
          }
        } catch (error) {
          fs.appendFileSync(
            "list-audit-prices-6-1-4-square-himalaya.txt",
            "ERROR PRODUCT OPTIONS"
          );
          console.log("ERROR PRODUCT OPTIONS");
        }
      }
    }
    let report = totalSumPrice + pricesTotal;
    fs.appendFileSync("list-audit-prices-6-1-4-square-himalaya.txt", `${report}\n`);
  }
};

export const getAttributes = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`,
      { timeout: 300000 }
    );
    await page.waitForSelector(".table-responsive");
    const table = await page.$(".table-responsive");
    const blocks = await table.$$('[id^="prod_add_opt_id"]');
    fs.appendFileSync("list-audit-prices-6-1-4-square-himalaya.txt", `${id} ---> `);
    for await (const block of blocks) {
      const attributes = await block.$$("span.badge.badge-info");
      const attributesLen = attributes.length;
      fs.appendFileSync(
        "list-audit-prices-6-1-4-square-himalaya.txt",
        `${attributesLen},`
      );
    }
    fs.appendFileSync("list-audit-prices-6-1-4-square-himalaya.txt", `\n`);
  }
};

export const updateOptionsPricesProducts = async (page) => {
  for await (const id of idProducts) {
    let newPriceIndex = 0;
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`,
      { timeout: 300000 }
    );

    const sectionGroup = await page.$('[id^="prod_add_opt_id:"]');
    if (sectionGroup) await btnMenuAction(page, sectionGroup, 1);
    await page.waitForTimeout(3000);

    let selectSize = await page.$("#sel_product_size");
    const optionsSize = await selectSize.$$("option");

    let optionsSizeValue = [];
    for await (const size of optionsSize) {
      const value = await size.getAttribute("value");
      if (value !== "Common Price For All Size") {
        optionsSizeValue.push(value);
      }
    }

    let selectOptions = await page.$("#product_view_options");
    const options = await selectOptions.$$("option");
    let optionsValue = [];
    for await (const option of options) {
      const value = await option.getAttribute("value");
      optionsValue.push(value);
    }
    console.log(optionsSizeValue, optionsValue);

    for (let index = 0; index < optionsSizeValue.length; index++) {
      selectSize = await page.$("#sel_product_size");
      await selectSize.selectOption(optionsSizeValue[index]);
      await page.waitForTimeout(3000);
      for await (const element of optionsValue) {
        try {
          await page.waitForSelector("#product_view_options");
          selectSize = await page.$("#product_view_options");

          await selectSize.selectOption(element);
          await page.waitForSelector(".table-responsive");
          await page.waitForTimeout(3000);

          const prices = await page.$$('[id^="txtprice"]');

          for await (const element of prices) {
            await element.fill(newPrices[newPriceIndex].toString());
            newPriceIndex++;
          }
          const saveBtn = await page.$("#btn-action-save");
          await saveBtn.click();
          await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
            state: "visible",
          });
          await page.waitForTimeout(3000);
        } catch (error) {
          fs.appendFileSync("list-update-prices.txt", "ERROR PRODUCT OPTIONS");
          console.log("ERROR PRODUCT OPTIONS");
        }
      }
    }
    // let report = pricesModel.toString();
    fs.appendFileSync("list-update-prices.txt", `${id}\n`);
  }
};

export const updatePricesProducts = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_price.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const table = await page.$(".table-responsive");
    const prices = await table.$$('[data-label="Price"]');
    let index = 0;
    for await (const inputPrice of prices) {
      await inputPrice.fill(indexPrincipalNewPrices[index].toString());
      index++;
    }
    const saveBtn = await page.$("#btn-action-save");
    await saveBtn.click();
    await page.waitForSelector(".bootstrap-growl.alert.alert-success", {
      state: "visible",
    });
    await page.waitForTimeout(3000);
    fs.appendFileSync("list-update-prices.txt", `${id} \n`);
  }
};

const removeHtmlTags = (str) => {
  // Delete HTML
  let strClean = str.replace(/<\/?[^>]+(>|$)/g, "");
  // Delete line
  strClean = strClean.replace(/\n/g, "");
  // Delete space
  strClean = strClean.replaceAll("&nbsp;", "");
  // Delete &
  strClean = strClean.replaceAll("&", "");
  // Delete Double Space
  strClean = strClean.replaceAll("  ", " ");
  return strClean;
};

export const updateAndCreateArtwork = async (page, ipProxy) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`
    );
    const report = `${id}`;
    await createArtworkOption(page, id);
    fs.appendFileSync("artwork-created-list-id.txt", `${report}\n`);
    console.log(report);
  }
};

export const checkAndDeleteArtwork = async (page, ipProxy) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`
    );
    const report = `${id}`;
    await checkArtworkOptions(page, id);
    fs.appendFileSync("artwork-deleted.txt", `${report}\n`);
    console.log(report);
  }
};

export const auditArtwork = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`
    );
    const verifyArtwork = await checkArtworkOptionsAudit(page);
    let artwork = false;
    if (verifyArtwork > 0) {
      artwork = true;
    }
    const report = `${id} ---> ${artwork} ---> ${verifyArtwork}\n`;
    fs.appendFileSync("report-audit-artwork-bad-good.txt", report);
    console.log(`${id} ---> ${verifyArtwork}`);
  }
};
