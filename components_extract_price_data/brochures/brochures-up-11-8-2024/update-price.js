import { chromium } from "playwright";
import * as dotenv from "dotenv";

import listPrice from "./listPrice.js";
dotenv.config();

const url = "https://www.apprinting.com/admin/";
const urlProductUpdatePrice =
  "https://www.apprinting.com/admin/product_additionalinfo_price.php?product_id=3676&prod_add_opt_id=122361&sel_product_size=4163";

const qtys = [
  //25, 50, 75, 100, 150, 200,
  250, 500, 1000, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 7500, 8000, 9000,
  10000, 15000, 20000, 25000, 35000, 30000, 40000, 45000, 50000, 55000, 60000,
  65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000,
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
// txtprice[25_2242506_]
const inputFillToPrice = async (page) => {
  await page.goto(urlProductUpdatePrice, { timeout: 300000 });
  let price = 0;
  // let postNumber = 9607838  ${postNumber}
  for (let i = 6; i <= 6; i++) {
    // if (
    //   //PRINTED SIDE
    //   //i === 96  //Front Only
    //   i === 97 || //Front and Back
    //   //i === 98  //Outside Only
    //   i === 99 //Outside and Inside
    //   //FOLDING
    //   //i === 85 || // None
    //   //i === 86 || // Half Fold
    //   //i === 87 || // Tri-Fold/Letter Fold
    //   //i === 88 || //  Z-Fold
    //   //i === 89 || // Gate Fold
    //   //i === 90  // Accordion Fold (4 panels)
    //   //i === 91 || // Double Gate Fold
    //   //i === 92 || // Double Parallel Fold
    //   //i === 93 || // French Fold
    //   //i === 94 // Roll Fold (4 panels)
    //   // i === 95 // Half Fold then Tri-Fold
    // ) {
    for await (const qty of qtys) {
      const id = `txtprice[${qty}_224250${i}_]`;
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
