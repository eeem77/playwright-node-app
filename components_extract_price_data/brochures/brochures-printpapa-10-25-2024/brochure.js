import { chromium, firefox } from "playwright";
import fs from "fs";

const web = async () => {
  // const browser = await chromium.launch({
  //     proxy: {
  //       server: '80.228.235.6:80'
  //       //username: 'usr',
  //       //password: 'pwd'
  //     }
  // })

  const userDataDir =
    "C:\\Users\\eeem77\\AppData\\Local\\Google\\Chrome\\User Data\\Default";
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false, // Cambia a true si no quieres que se muestre la ventana
    viewport: { width: 1440, height: 870 },
  });

  const page = await browser.newPage();
  await page.goto(
    "https://www.printpapa.com/eshop/pc/Folded-Brochure-15x5-23p17455.htm",
    {
      timeout: 300000,
    }
  );

  await page.waitForTimeout(2000);

  // FORM CONTAINER
  // const productDetails = await page.$(".product-details");

  // PRODUCTS (SIZE)
  let productSize = await page.$('[name="dropdown_productname"]');
  const optionsProductSize = await productSize.$$eval("option", (node) =>
    node.map((n) => n.value)
  );
  // const optionsProductSizeFinal = optionsProductSize.filter((option) => {
  //   if (
  //     option !== "Folded-Brochure-15x5-23p17455.htm" &&
  //     option !== "Folded-Brochure-8-5x5-5-23p10743.htm" &&
  //     option !== "Folded-Brochure-12x9-23p10807.htm" &&
  //     option !== "Folded-Brochure-15x7-23p10707.htm" &&
  //     option !== "Folded-Brochure-17x5-5-23p10673.htm" &&
  //     option !== "Folded-Brochure-18x12-23p10661.htm" &&
  //     option !== "Tri-fold-Brochure-25-5x11-23p7574.htm" &&
  //     option !== "Tri-fold-Brochure-25-5x5-5-23p18303.htm" &&
  //     option !== "Folded-Brochure-Euro-A3-Size-16-54x11-69-23p6850.htm" &&
  //     option !== "Folded-Brochure-Euro-A4-Size-8-27x11-69-23p6846.htm"
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  optionsProductSize.splice(0, 6);
  console.log(optionsProductSize);

  for await (const size of optionsProductSize) {
    productSize = await page.$('[name="dropdown_productname"]');
    await productSize.selectOption(size);
    await page.waitForTimeout(2000);

    // FOLD
    // const productFold = await page.$("#CAG54");
    // const optionsProductFold = await productFold.$$eval("option", (node) =>
    //   node.map((n) => n.value)
    // );
    // const optionsProductFoldFinal = optionsProductFold.filter(
    //   (option) => option !== "5736_-0.012_0_0_0_0_0"
    // );
    // console.log(optionsProductFoldFinal);

    // PAPER
    // const productPaper = await page.$("#CAG132");
    // const optionsProductPaper = await productPaper.$$eval("option", (node) =>
    //   node.map((n) => n.value)
    // );
    // // const optionsProductFoldFinal = optionsProductFold.filter(
    // //   (option) => option !== "5736_-0.012_0_0_0_0_0"
    // // );
    // console.log(optionsProductPaper);

    // PRINTED SIDES/COLOR
    // const productPrinted = await page.$("#CAG26");
    // const optionsProductPrinted = await productPrinted.$$eval("option", (node) =>
    //   node.map((n) => n.value)
    // );
    // // const optionsProductFoldFinal = optionsProductFold.filter(
    // //   (option) => option !== "5736_-0.012_0_0_0_0_0"
    // // );
    // console.log(optionsProductPrinted);

    // SHRINKWRAPPING
    const productShrinkwrapping = await page.$("#CAG203");
    const optionsProductShrinkwrapping = await productShrinkwrapping.$$eval("option", (node) =>
      node.map((n) => n.value)
    );
    // const optionsProductFoldFinal = optionsProductFold.filter(
    //   (option) => option !== "5736_-0.012_0_0_0_0_0"
    // );
    console.log(optionsProductShrinkwrapping);

    for await (const Shrinkwrapping of optionsProductShrinkwrapping) {
      await productShrinkwrapping.selectOption(Shrinkwrapping);
      await page.waitForTimeout(2000);

      // QUANTITY
      const qtySelect = await page.$('[name="quantity"]');
      const optionsQtySelect = await qtySelect.$$eval("option", (node) =>
        node.map((n) => n.value)
      );
      //   console.log(optionsQtySelect);

      for await (const qty of optionsQtySelect) {
        await qtySelect.selectOption(qty);
        await page.waitForTimeout(2000);

        // LIST FORM VALUES
        const selectProductDetails = await page.$$eval("select", (node) =>
          node.map((n) => n.value)
        );
        let selectProductDetailsValues = [];
        for await (const optionSelected of selectProductDetails) {
          const option = await page.$eval(
            `[value="${optionSelected}"]`,
            (node) => node.innerText
          );
          selectProductDetailsValues.push(option);
        }
        //   console.log(selectProductDetailsValues);

        // GET PRICE
        const inputPrice = await page.$("#txtTotalAfterShip");
        const priceValue = await inputPrice.inputValue();
        const priceValueFinal = priceValue.replace("$", "");
        selectProductDetailsValues.push(priceValueFinal);
        fs.appendFileSync(
          `list.txt`,
          selectProductDetailsValues.toString() + "\n"
        );
      }
      fs.appendFileSync(`list.txt`, "\n\n\n");
    }
  }

  console.log("END");
  await browser.close();
};

web();
