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

const web = async () => {
  // const browser = await chromium.launch({
  //     proxy: {
  //       server: '167.86.99.172:8080'
  //       //username: 'usr',
  //       //password: 'pwd'
  //     }
  // })

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://4over.com/flat-flyers-brochures", {
    timeout: 300000,
  });
  await page.waitForSelector(".block.block-login-dropdown", {
    state: "attached",
  });

  await login(page);
  await page.waitForSelector("#product-options-wrapper");
  // await page.waitForTimeout(7000);
  const nameProject = await page.$("#project_name");
  await nameProject.fill("movie");

  const sizeOptions = [
    "458",
    "87",
    "467",
    "200",
    "382",
    "214",
    "214",
    "413",
    "63",
    "55",
    "371",
    "56",
  ];

  for await (const option of sizeOptions) {
    const sizeSelect = await page.$("#attribute211");
    await sizeSelect.selectOption(option);

    const paperStock = await page.$("#attribute197");
    await paperStock.selectOption("111");

    const colorspec = await page.$("#attribute204");
    await colorspec.selectOption("18");

    const coating = await page.$("#attribute199");
    await coating.selectOption("19");

    const folding = await page.$("#attribute205");
    await folding.selectOption("465");

    const drillHole = await page.$("#attribute216");
    await drillHole.selectOption("486");

    const rows = await page.$$("li .runsizes_row");
    for await (const row of rows) {
      const rowSize = await row.$eval(".runsize", (node) =>
        node.map((n) => n.innerText),
      );
      const tirnaroundTime = await page.$(".turnaround-time-container");
    }
  }

  console.log("END");
  await browser.close();
};

web();
