import { chromium, firefox, webkit } from "playwright";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const login = async (page) => {
  const email = await page.$("#pdp-login-customer-email");
  const pass = await page.$("#pdp-login-pass");
  const btn = await page.$("#send4");

  await email.fill(process.env.LOGIN_USER_4OVER);
  await pass.fill(process.env.LOGIN_KEY_4OVER);
  await btn.click();

  await page.waitForSelector("#attribute211", { state: "visible" });

  console.log("LOGIN TRUE");
};

let labelArray = [];

const changeOption = async (page, id, label) => {
  const option = await page.$(id);
  await option.selectOption({ label: label });
  labelArray.push(label);
};

const web = async () => {
  // const browser = await chromium.launch({
  //     proxy: {
  //       server: '167.86.99.172:8080'
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

  //const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://4over.com/specialty-folds-brochures", {
    timeout: 300000,
  });

  // await page.waitForSelector(".block.block-login-dropdown", {
  //   state: "attached",
  // });

  //await login(page);

  await page.waitForSelector(".product-add-form", {
    state: "attached",
  });

  const sizes = [
    // '10.5" x 17"',
    // '11" x 17"',
    // '11.5" x 17.5"',
    // '12" x 18"',
    // '17" x 22"',
    // '4" x 10"',
    // '4" x 11"',
    // '4" x 15"',
    // '4.25" x 11"',
    // '4.25" x 12"',
    // '5.5" x 17"',

    // '7" x 8.5"',
    // '7.5" x 8.5"',
    // '8" x 9"',

    // '8" x 10"',
    // '8.5" x 11"',
    // '8.5" x 14"',
    // '9" x 12"',
    '9" x 16"',
  ];

  const stock = [
    "100LB Gloss Book",
    "100LB Matte Book",
    "100LB Dull Book",
    "60LB Premium Opaque",
    "70LB Premium Opaque",
    "80LB Gloss Book",
    "80LB Matte Book",
  ];

  for await (const el of stock) {
    await changeOption(page, "#attribute211", '9" x 16"');
    await page.waitForTimeout(2000);
    await changeOption(page, "#attribute197", el);
    await page.waitForTimeout(2000);
    await changeOption(page, "#attribute204", "4/4 (4 color both sides)");
    await page.waitForTimeout(2000);

    if (el === "100LB Gloss Book" || el === "80LB Gloss Book") {
      await changeOption(page, "#attribute199", "Aqueous Coating");
      await page.waitForTimeout(2000);
    }

    // if (el === "100LB Gloss Book") {
    //   await changeOption(page, "#attribute199", "Aqueous Coating");
    //   await page.waitForTimeout(2000);
    // }

    await changeOption(page, "#attribute205", "Double Parallel Fold");
    // await changeOption(page, "#attribute205", "French Fold");

    await page.waitForTimeout(2000);

    const btnMoore = await page.$(".runsizes-table_actions");
    const btnMooreIsVisible = await btnMoore.isVisible();
    if (btnMooreIsVisible === true) {
      await btnMoore.click();
      await page.waitForTimeout(2000);
    }

    //prices
    const runsize = await page.$$eval(".runsize", (node) =>
      node.map((n) => n.innerText)
    );
    const markupPrice = await page.$$eval(".markup-price", (node) =>
      node.map((n) => n.innerText)
    );
    const markupPriceClean = markupPrice.filter(
      (price) => price != "Markup Price\n%"
    );
    console.log("runsize ---->", runsize, "price ", markupPriceClean);

    // print data
    for (let i = 0; i < runsize.length; i++) {
      let nodo = labelArray;
      let data = [...nodo, runsize[i], markupPriceClean[i].replace(",", "")];
      fs.appendFileSync(`list.txt`, data.toString() + "\n");
    }
    fs.appendFileSync(`list.txt`, "\n\n\n");
    labelArray = [];
    await page.waitForTimeout(2000);
  }

  console.log("END");
  await browser.close();
};

web();
