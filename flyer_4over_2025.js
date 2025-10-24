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
  await page.waitForSelector("#project_name");
  const nameProject = await page.$("#project_name");
  await nameProject.fill("movie");
  await page.waitForTimeout(3000);

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
    await page.waitForTimeout(3000);
    const sizeSelect = await page.$("#attribute211");
    const paperStock = await page.$("#attribute197");
    const colorspec = await page.$("#attribute204");
    const coating = await page.$("#attribute199");
    const folding = await page.$("#attribute205");
    // await page.waitForSelector("#attribute216");
    await sizeSelect.selectOption(option);
    await page.waitForTimeout(3000);

    await paperStock.selectOption("111");
    await page.waitForTimeout(3000);

    await colorspec.selectOption("18");
    await page.waitForTimeout(3000);

    await coating.selectOption("19");
    await page.waitForTimeout(3000);

    await folding.selectOption("465");
    await page.waitForTimeout(3000);

    // const drillHole = await page.$("#attribute216");
    // await drillHole.selectOption("486");

    const qty = [
      "100",
      "150",
      "200",
      "250",
      "500",
      "1000",
      "2000",
      "2500",
      "3000",
      "4000",
      "5000",
      "6000",
      "7000",
      "8000",
      "9000",
      "10000",
      "15000",
      "20000",
      "25000",
      "30000",
      "35000",
      "40000",
      "45000",
      "50000",
      "55000",
      "60000",
      "65000",
      "70000",
      "75000",
      "80000",
      "85000",
      "90000",
      "95000",
      "100000",
    ];

    await page.waitForSelector(".runsizes_row");
    const rows = await page.$$(".runsizes_row");
    for await (const row of rows) {
      const rowSize = await row.$(".runsize");
      const rowSizeValue = await rowSize.innerText();
      console.log(rowSizeValue);
      if (qty.includes(rowSizeValue)) {
        await row.click();
        // await page.waitForSelector(".turnaround-time-containe");
        const turnaroundTime = await page.$(".turnaround-time-container");
        const twoBusinessDays = await turnaroundTime.$("#tat-2");
        const nextBusinessDay = await turnaroundTime.$("#tat-1");
        const twoBusinessDaysValue = await twoBusinessDays.innerText();
        const nextBusinessDayValue = await nextBusinessDay.innerText();
        fs.appendFileSync(
          "list.txt",
          `${option} ---> ${rowSizeValue} ---> ${twoBusinessDaysValue} ---> ${nextBusinessDayValue}\n`,
        );
      }
    }
  }

  console.log("END");
  await browser.close();
};

web();
