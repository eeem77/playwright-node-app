import { chromium } from "playwright";
import * as dotenv from "dotenv";

import listPrice from "./listPrice.js";
dotenv.config();

const url = "https://www.apprinting.com/admin/";
const urlProductUpdatePrice =
  "https://www.apprinting.com/admin/product_additionalinfo_price.php?product_id=5915&prod_add_opt_id=122407&sel_product_size=0";

const qtys = [
  50, 75, 100, 125, 150, 175, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800,
  900, 1000, 1250, 1500, 1750, 2000,
];

const login = async (page) => {
  await page.goto(url, { timeout: 300000 });
  const user = await page.$("#username");
  const pass = await page.$("#password");
  const btn = await page.$("button");
  await user.fill(process.env.LOGIN_USER);
  await pass.fill(process.env.LOGIN_SECRET_KEY);
  await btn.click();
  await page.waitForTimeout(5000);
  console.log("login: OK");
};
// txtprice[50_2242542_]
const inputFillToPrice = async (page) => {
  await page.goto(urlProductUpdatePrice, { timeout: 300000 });
  let price = 0;
  // let postNumber = 9607838  ${postNumber}
  for (let i = 36; i <= 37; i++) {
    // if (
    //   i === 11 ||
    //   i === 12 ||
    //   i === 27 ||
    //   i === 28 ||
    //   i === 29 ||
    //   i === 30 ||
    //   i === 31
    // ) {
    for await (const qty of qtys) {
      const id = `txtprice[${qty}_22426${i}_]`;
      const inputPrice = await page.$(`[id="${id}" ]`);
      await inputPrice.fill(listPrice[price].toString());
      console.log(listPrice[price].toString());
      price++;
      // console.log(postNumber);
      // postNumber++
    }
    //}
  }
  const btnSave = await page.$("#btn-action-save");
  await btnSave.click();
  await page.waitForTimeout(5000);
};

const updatePrice = async () => {
  const userDataDir =
    "C:\\Users\\eeem77\\AppData\\Local\\Google\\Chrome\\User Data\\Default";
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false, // Cambia a true si no quieres que se muestre la ventana
    viewport: { width: 1440, height: 870 },
  });
  const page = await browser.newPage();
  await login(page);
  await inputFillToPrice(page);
  console.log("END");
  await browser.close();
};

updatePrice();
