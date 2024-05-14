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

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.printpapa.com/eshop/pc/Save-the-Date-Card-3-5x5-872p12959.htm",
    {
      timeout: 300000,
    }
  );

  await page.waitForTimeout(5000);
  //await page.screenshot({path:"./ejemplo.jpg"});
  // const selectSize = await page.$('[name="dropdown_productname"]');
  // await selectSize.selectOption("Save-the-Date-Card-4x6-872p12961.htm"); //Save the Date Card - 4x6

  // await page.waitForTimeout(5000);
  const papers = [
    "Card Stock: 100lb Matte (11pt)",
    "Card Stock: 90lb White Linen Uncoated (11.5pt)",
    "Card Stock: 110lb Matte (13pt)",
    "Card Stock: 14Pt. Gloss (14pt)",
    "Card Stock: 110lb Pearl ICE (14pt)",
    "Card Stock: 14Pt. Uncoated (15pt)",
    "Card Stock: 16 Pt. Matte (16pt)",
    "Card Stock: 16 Pt. Uncoated (16pt)",
  ];

  for await (const elementPaper of papers) {
    //PRINTED SIDES/COLOR
    const printedSide = await page.$("#CAG26");
    await printedSide.selectOption("Front Side Only (4/0)"); //Front Side Only (4/0)
    //await printedSide.selectOption("Both Sides (4/4)"); //Both Sides (4/4)

    //PAPER
    const paper = await page.$("#CAG132");
    await paper.selectOption(elementPaper); //Card Stock: 100lb Matte (11pt)
    // await paper.selectOption("8157_0.23_0_0.95_0_0_0"); //Card Stock: 90lb White Linen Uncoated (11.5pt)
    // await paper.selectOption("9217_0.02_0_0.74_0_0_0"); //CCard Stock: 110lb Matte (13pt)
    // await paper.selectOption("2697_0.01_0_0.73_0_0_0"); //Card Stock: 14Pt. Gloss (14pt)
    // await paper.selectOption("8145_0.49_0_1.21_0_0_0"); //Card Stock: 110lb Pearl ICE (14pt)
    // await paper.selectOption("2223_0.11_0_0.83_0_0_0"); //Card Stock: 14Pt. Uncoated (15pt)
    // await paper.selectOption("9204_0.1_0_0.82_0_0_0"); //Card Stock: 16 Pt. Matte (16pt)
    // await paper.selectOption("17335_0.12_0_0.84_0_0_0"); //Card Stock: 16 Pt. Uncoated (16pt)

    //UV COATING
    const coating = await page.$("#CAG231");
    //await coating.selectOption("2050_0.00_0_0_0_0_0"); //No UV Coating
    // await coating.selectOption("2216_1.05_0_1.05_0_0_0"); //Gloss UV Coating on Front Only
    // await coating.selectOption("22060_1.05_0_1.05_0_0_0"); //Matte UV Coating on Front Only

    //CORNER ROUNDING
    const corner = await page.$("#CAG262");
    //await corner.selectOption("2314_0.00_0_0_0_0_0"); //No Corner Rounding
    //await corner.selectOption("2350_0.04_0_0.04_0_0_0"); //Round All 4 Corners

    //CORNER ARTWORK
    const artwork = await page.$("#CAG150");
    //await artwork.selectOption("2186_0.00_0_0_0_0_0"); //Upload Print Ready PDF
    // await artwork.selectOption("5137_28_0_28_0_1_0"); //We Check & Fix your art
    // await artwork.selectOption("5136_50_0_50_0_2_0"); //Simple Logo & Text Setup
    // await artwork.selectOption("2877_164_0_164_0_3_0"); //We Design it
    // const x = await page.$('#SPLINPDROP_PPLabelWidth_X')
    // await x.fill("18.00")
    // const y = await page.$('#SPLINPDROP_PPLabelHeight_X')
    // await y.fill("24.00")
    // await page.keyboard.press('Enter');
    //await page.screenshot({path:'./eeem77.jpg'})
    //await page.screenshot({path:'./eeem77.jpg'})    Rectangle ‐ 18"W x 24"H

    const qty = [
      10, 20, 30, 40, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900,
      1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
    ];

    fs.appendFileSync(`list.txt`, elementPaper + "\n");

    for await (const elementQty of qty) {
      let number = elementQty.toString();
      const qtySelect = await page.$('[name="quantity"]');
      await qtySelect.selectOption(number);
      const price = await page.$("#txtTotalAfterShip");
      const priceValue = await price.inputValue();
      const priceValueFinal = priceValue.replace("$", "");
      fs.appendFileSync(`list.txt`, number + "," + priceValueFinal + "\n");
    }

    fs.appendFileSync(`list.txt`, "\n\n\n");
  }
  console.log("END");
  await browser.close();
};

web();
