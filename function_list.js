import fs from "fs";
import * as dotenv from "dotenv";
import listPrice from "./listPrice.js";
import dataProducts from "./list.js";
import seoData from "./seo-data.js";
import {
  idProducts,
  urlsProducts,
  titlesProducts,
  url,
  urlProductUpdatePrice,
  qtys,
} from "./data.js";
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
    const associatedCategorySelected = await page.$(
      ".multiselect-selected-text"
    );
    const innerTextAssociatedCategory =
      await associatedCategorySelected.innerText();
    if ((await innerTextAssociatedCategory.search("Real Estate")) === -1) {
      fs.appendFileSync("list.txt", id.toString() + ",\n");
    }
    const report = `Working ---> ${id} ---> ${innerTextAssociatedCategory} ---> ${await innerTextAssociatedCategory.search(
      "Real Estate"
    )}`;
    console.log(report);
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

export const getIdProducts = async (page) => {
  await page.goto("https://www.apprinting.com/flowers/products/", {
    timeout: 300000,
  });
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
    const pageTitle = await page.$("#seo_page_title_1");
    const metaDescription = await page.$("#seo_page_description_1");
    const markUp = await page.$("#schema_markup_1");
    // const metaAdditional = await page.$("#seo_page_metatags1");
    const date = [
      await pageTitle.inputValue(),
      await metaDescription.inputValue(),
      await markUp.inputValue(),
      // await metaAdditional.inputValue(),
    ];
    for await (const input of date) {
      if (input === "") fs.appendFileSync("list.txt", id, +"\n");
    }
    console.log(`Working ---> ${id}`);
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
    await imageSection.waitForSelector("img");
    const imagesHtml = await imageSection.$$("img");

    for await (const image of imagesHtml) {
      const imageInnerHtml = await image.getAttribute("src");
      images.push(`"${imageInnerHtml}"`);
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
      trHtml.search("Artwork") !== -1 ||
      trHtml.search("ARTWORK") !== -1 ||
      trHtml.search("artwork") !== -1
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
  //let artworkLen = 0
  for await (const tr of additionalOptionsTrTable) {
    const trHtml = await tr.innerHTML();
    if (
      trHtml.includes("Artwork") === true ||
      trHtml.includes("ARTWORK") === true ||
      trHtml.includes("artwork") === true
    ) {
      // artworkLen++
      // const auditOptionsArtwork = await auditCheckArtworkOptions(page, tr)
      // if (auditOptionsArtwork === true) {
      //   return true
      // } else {
      //   return false
      // }
      return true;
    }
  }
  return false;
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

export const updateAndCreateArtwork = async (page, ipProxy) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`
    );
    // const artworkOption = await checkArtworkOptions(page, id)
    // await checkArtworkOptions(page, id);
    await createArtworkOption(page, id);
    const report = `${id}`;
    // const index = idProducts.indexOf(id);
    // idProducts.splice(index, 1);
    // fs.appendFileSync("artwork-deleted.txt", `${report}\n`);
    fs.appendFileSync("artwork-created-list-id.txt", `${report}\n`);
    console.log(report);
    // if (artworkOption === false) {
    //   const createdProduct = await createArtworkOption(page, id)
    //   if (createdProduct === true) {
    //     report = `${id}\n`
    //     fs.appendFileSync('artwork-created-list-id.txt', report)
    //     // fs.appendFileSync('proxies-primary.txt', `${ipProxy}\n`)
    //     console.log(report)
    //     const index = idProducts.indexOf(id)
    //     idProducts.splice(index, 1)
    //   }
    // }
  }
};

export const auditArtwork = async (page) => {
  for await (const id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_additionalinfo_list.php?product_id=${id}`
    );
    const verifyArtwork = await checkArtworkOptionsAudit(page);
    // if (verifyArtwork === false) {
    //   const report = `${id}\n`
    //   fs.appendFileSync('report-audit-artwork.txt', report)
    // }
    const report = `${id} ---> ${verifyArtwork}\n`;
    fs.appendFileSync("report-audit-artwork-bad-good.txt", report);
    console.log(`${id} ---> ${verifyArtwork}`);
  }
};
