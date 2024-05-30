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

  // const urls = [
  //   "https://www.printpapa.com/eshop/pc/Apple-Shape-Magnet-3-x3-1068p15487.htm",
  //   "https://www.printpapa.com/eshop/pc/Cup-Cake-Shape-Magnet-4-x3-75-1068p15492.htm",
  //   "https://www.printpapa.com/eshop/pc/Round-Shape-Magnet-2-Diameter-1068p15493.htm",
  //   "https://www.printpapa.com/eshop/pc/Heart-Shape-Magnet-3-x2-5-1068p15494.htm",
  //   "https://www.printpapa.com/eshop/pc/House-Shape-Magnet-3-5-x2-5-1068p15495.htm",
  //   "https://www.printpapa.com/eshop/pc/Tooth-Shape-Magnet-2-x2-5-1068p15496.htm",
  //   "https://www.printpapa.com/eshop/pc/Van-Shape-Magnet-3-75-x1-75-1068p15497.htm",
  //   "https://www.printpapa.com/eshop/pc/Hand-Shape-Magnets-3-x4-25-1068p15498.htm",
  //   "https://www.printpapa.com/eshop/pc/Cloud-Shape-Magnet-3-5-x2-1068p15537.htm",
  //   "https://www.printpapa.com/eshop/pc/Diamond-Shape-Magnet-3-5-x2-1068p15538.htm",
  //   "https://www.printpapa.com/eshop/pc/Flower-Shape-Magnet-3-x3-1068p15539.htm",
  //   "https://www.printpapa.com/eshop/pc/Ink-Drop-Shape-Magnet-3-5-x2-1068p15540.htm",
  //   "https://www.printpapa.com/eshop/pc/Leaf-Shape-Magnet-3-5-x2-1068p15541.htm",
  //   "https://www.printpapa.com/eshop/pc/Oblong-Shape-Magnet-3-5-x2-1068p15542.htm",
  //   "https://www.printpapa.com/eshop/pc/Octagon-Shape-Magnet-3-x3-1068p15543.htm",
  //   "https://www.printpapa.com/eshop/pc/-Oval-Shape-Magnet-3-5-x2-1068p15544.htm",
  //   "https://www.printpapa.com/eshop/pc/Triangle-Shape-Magnet-3-x3-1068p15545.htm",
  //   "https://www.printpapa.com/eshop/pc/Mask-Shape-Magnet-5-x2-25-1068p15630.htm",
  //   "https://www.printpapa.com/eshop/pc/Ribbon-Shape-Magnet-2-x3-5-1068p15636.htm",
  //   "https://www.printpapa.com/eshop/pc/Star-Shape-Magnet-3-x3-1068p15637.htm",
  //   "https://www.printpapa.com/eshop/pc/Cross-Shape-Magnet-2-5-x3-5-1068p15626.htm",
  //   "https://www.printpapa.com/eshop/pc/Star-Burst-Shape-Magnet-5-x3-75-1068p15661.htm",
  //   "https://www.printpapa.com/eshop/pc/House-Shape-Calendar-Magnet-4-5-W-x-3-75-H-1068p15726.htm",
  //   "https://www.printpapa.com/eshop/pc/Bone-Shape-Magnet-3-75-x1-75-1068p15813.htm",
  //   "https://www.printpapa.com/eshop/pc/Thumbs-Up-Shape-Magnet-3-x4-1068p16330.htm",
  // ];

  const urls = [
    "https://www.printpapa.com/eshop/pc/Any-Shape-Die-Cut-Refrigerator-Magnets-1068p12592.htm",
  ];

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for await (const url of urls) {
    await page.goto(url, {
      timeout: 300000,
    });

    await page.waitForTimeout(3000);
    
    const searchTitle = await page.$(".prod-caption");
    const title = await searchTitle.innerText();

    fs.appendFileSync(`list.txt`, title + "\n");

    const options = [
      '2" x 2" inches',
      '3" x 3" inches',
      '4" x 4" inches',
      '5" x 5" inches',
      '6" x 6" inches',
      '7" x 7" inches',
      '8" x 8" inches',
      '9" x 9" inches',
    ];


    for await (const option of options) {
      //SIZE CUSTOM SQUARE
      const inchesWith = option.substring(0,1);
      const inchesHeigth = option.substring(5,6);
      console.log(inchesWith," =======> ", inchesHeigth);
      const inputWidth = await page.$("#SPLINPDROP_PPLabelWidth");
      await inputWidth.fill(inchesWith);

      const inputHeigth = await page.$("#SPLINPDROP_PPLabelHeight");
      await inputHeigth.fill(inchesHeigth);

      const body = await page.$(".pcBTOmainTableC");
      await body.click();

      await page.waitForTimeout(1000);
    

      //ARTWORK
      //const artwork = await page.$("#CAG150");
      //await artwork.selectOption(option);

      //PROOFING
      const proofing = await page.$("#CAG45");
      await proofing.selectOption("PDF Proof");

      const qty = [
        10, 25, 50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000,
        1500, 2000, 2500,
      ];

      fs.appendFileSync(`list.txt`, option + "\n");

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
  }
  console.log("END");
  await browser.close();
};

web();
