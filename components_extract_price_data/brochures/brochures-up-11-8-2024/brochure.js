import { chromium, firefox, webkit } from "playwright";
import fs from "fs";
import path from "path";
import player from "play-sound";

const formBase = async (page, form) => {
  let clickList = 2;
  for (let i = 0; i < 1; i++) {
    switch (i) {
      case 2:
        clickList = 1;
        break;
      case 3:
        clickList = 1;
        break;
    }
    const buttons = await form.$$("button.btn.dropdown-toggle.val-wrap");
    await buttons[i].click();
    const buttonListActive = await form.$(
      "div.site-dropdown.dropdown.expanded"
    );
    const listActive = await buttonListActive.$$("a.val-wrap.ng-scope");
    await listActive[clickList].click();
    console.log(await buttons[i].innerText());
    await page.waitForTimeout(3000);
  }
  const buttonsInnerText = await form.$$eval(
    "button.btn.dropdown-toggle.val-wrap",
    (node) => node.map((n) => n.innerText)
  );
  console.log(buttonsInnerText);
};

// const collapseTrue = async (form) => {
//     const collapse = await form.$$('a.group-collapse-button')
//     await collapse[0].click()
//     await collapse[1].click()
//     await collapse[2].click()
// }

const writeList = async (form) => {
  const buttonsLabel = await form.$$eval(
    "button.btn.dropdown-toggle.val-wrap",
    (node) => node.map((n) => n.innerText)
  );
  const price = await form.$eval("#price", (node) => node.innerText);
  const priceSubtotal = await price.replace(",", "");
  const priceTotal = await priceSubtotal.replace("$", "");
  await buttonsLabel.push(priceTotal);
  fs.appendFileSync(`list.txt`, buttonsLabel.toString() + "\n");
};

const writeListTotal = async (form) => {
  const buttonsLabel = await form.$$eval(
    "button.btn.dropdown-toggle.val-wrap",
    (node) => node.map((n) => n.innerText)
  );
  const price = await form.$eval("#price", (node) => node.innerText);
  const priceSubtotal = await price.replace(",", "");
  const priceTotal = await priceSubtotal.replace("$", "");
  await buttonsLabel.push(priceTotal);
  fs.appendFileSync(`list.txt`, buttonsLabel.toString() + "\n");
};

const openList = async (page, form, button) => {
  const buttons = await form.$$("button.btn.dropdown-toggle");
  // const buttonsValues = await form.$$eval(
  //   "button.btn.dropdown-toggle",
  //   (node) => node.map((n) => n.innerText)
  // );
  // console.log(buttonsValues);
  // await buttons[button].scrollIntoViewIfNeeded();
  await buttons[button].click();
  await form.waitForSelector("div.expanded");
  const menu = await form.$("div.expanded");
  const menuBtn = await menu.$$("li.dropdown-menu-item");
  //   const menuBtn = await menu.$$eval("a", (node) =>
  //     node.map((n) => n.innerText)
  //   );
  // console.log(menuBtn);
  console.log("Working");
  return menuBtn;
};

const changeOptions = async (page, form, button, key) => {
  const menuBtn = await openList(page, form, button);
  const container = await page.$(".page-product-container");
  for (let i = key; i < menuBtn.length; i++) {
    switch (i) {
      case key:
        await menuBtn[i].click();
        await container.hover();
        await form.waitForSelector("#compute_price_loader", {
          state: "hidden",
        });
        // await page.waitForTimeout(3000);
        await writeList(form);
        break;
      default:
        const menuBtnDefault = await openList(page, form, button);
        await menuBtnDefault[i].click();
        await container.hover();
        await form.waitForSelector("#compute_price_loader", {
          state: "hidden",
        });
        // await page.waitForTimeout(3000);
        await writeList(form);
        break;
    }
  }
};

const changeOneOptions = async (page, form, button, option) => {
  const menuBtn = await openList(page, form, button);
  await menuBtn[option].click();
  await form.waitForSelector("#compute_price_loader", {
    state: "hidden",
  });
  // await page.waitForTimeout(3000);
};

const changeTwoOptions = async (
  page,
  form,
  button,
  option,
  buttonTwo,
  optionTwo
) => {
  for (let i = 0; i < 2; i++) {
    switch (i) {
      case 0:
        const menuBtn = await openList(form, button);
        await menuBtn[option].click();
        await page.waitForTimeout(3000);
        break;
      case 1:
        const menuBtnElse = await openList(form, buttonTwo);
        await menuBtnElse[optionTwo].click();
        await page.waitForTimeout(3000);
        break;
    }
  }

  const buttonsLabel = await form.$$eval(
    "button.btn.dropdown-toggle.val-wrap",
    (node) => node.map((n) => n.innerText)
  );
  console.log(buttonsLabel);
};

const changeThreeOptions = async (
  page,
  form,
  button,
  option,
  buttonTwo,
  optionTwo,
  buttonThree,
  optionThree
) => {
  for (let i = 0; i <= 2; i++) {
    switch (i) {
      case 0:
        const menuBtn = await openList(form, button);
        await menuBtn[option].click();
        await form.waitForSelector("#price", {
          state: "attached",
        });
        //await page.waitForTimeout(5000)
        break;
      case 1:
        const menuBtnTwo = await openList(form, buttonTwo);
        await menuBtnTwo[optionTwo].click();
        await form.waitForSelector("#price", {
          state: "attached",
        });
        //await page.waitForTimeout(5000)
        break;
      case 2:
        const menuBtnThree = await openList(form, buttonThree);
        await menuBtnThree[optionThree].click();
        await form.waitForSelector("#price", {
          state: "attached",
        });
        //await page.waitForTimeout(5000)
        break;
    }
  }
  await writeListTotal(form);
};

const bindingElementsOptions = async (page, form, option) => {
  const bindingElements = await form.$$(
    ".custom-control.custom-radio.element_class"
  );
  await bindingElements[option].click();
  await page.waitForTimeout(3000);
};

const web = async () => {
  const userDataDir =
    "C:\\Users\\eeem77\\AppData\\Local\\Google\\Chrome\\User Data\\Default";
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false, // Cambia a true si no quieres que se muestre la ventana
    viewport: { width: 1440, height: 870 },
  });

  // const context = await browser.newContext({
  //   viewport: { width: 1920, height: 1080 } // Ajusta el tamaño según tus necesidades
  // });

  // const page = await context.newPage();
  // const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://www.uprinting.com/brochure-printing.html");
  const form = await page.$("#calc_4_tradpricegroup");

  //SIZE
  for (let index = 0; index <= 8; index++) {
    await changeOneOptions(page, form, 0, index);
    await changeOneOptions(page, form, 3, 0);
    await changeOneOptions(page, form, 4, 1);
    await changeOneOptions(page, form, 5, 0);
    if (index === 8) {
      await changeOptions(page, form, 9, 6);
    } else {
      await changeOptions(page, form, 9, 0);
    }
    fs.appendFileSync(`list.txt`, "\n\n\n");
  }

  //PRINTING TIME
  // for (let index = 0; index <= 8; index++) {
  //   await changeOneOptions(page, form, 0, index);
  //   await changeOneOptions(page, form, 3, 0);
  //   await changeOneOptions(page, form, 4, 1);
  //   await changeOneOptions(page, form, 5, 0);
  //   for (let Y = 0; Y <= 1; Y++) {
  //     await changeOneOptions(page, form, 10, Y);
  //     if (index === 8) {
  //       await changeOptions(page, form, 9, 6);
  //     } else {
  //       await changeOptions(page, form, 9, 0);
  //     }
  //     fs.appendFileSync(`list.txt`, "\n\n\n");
  //   }
  // }

  //TABBING
  // for (let index = 0; index <= 8; index++) {
  //   await changeOneOptions(page, form, 0, index);
  //   await changeOneOptions(page, form, 3, 0);
  //   if (index === 8) {
  //     await changeOneOptions(page, form, 4, 7);
  //   } else {
  //     await changeOneOptions(page, form, 4, 3);
  //   }
  //   await changeOneOptions(page, form, 5, 2);
  //   for (let Y = 0; Y <= 2; Y++) {
  //     await changeOneOptions(page, form, 8, Y);
  //     if (index === 8) {
  //       await changeOptions(page, form, 9, 6);
  //     } else {
  //       await changeOptions(page, form, 9, 0);
  //     }
  //     fs.appendFileSync(`list.txt`, "\n\n\n");
  //   }
  // }

  //BUNDLING
  // for (let index = 0; index <= 8; index++) {
  //   await changeOneOptions(page, form, 0, index);
  //   await changeOneOptions(page, form, 3, 0);
  //   await changeOneOptions(page, form, 4, 1);
  //   await changeOneOptions(page, form, 5, 0);
  //   for (let Y = 0; Y <= 1; Y++) {
  //     await changeOneOptions(page, form, 6, Y);
  //     if (index === 8) {
  //       await changeOptions(page, form, 9, 6);
  //     } else {
  //       await changeOptions(page, form, 9, 0);
  //     }
  //     fs.appendFileSync(`list.txt`, "\n\n\n");
  //   }
  // }

  // PRINTED SIDE
  // for (let index = 8; index <= 8; index++) {
  //   await changeOneOptions(page, form, 0, index);
  //   await changeOneOptions(page, form, 3, 0);
  //   await changeOneOptions(page, form, 4, 1);
  //   for (let Y = 0; Y <= 1; Y++) {
  //     await changeOneOptions(page, form, 5, Y);
  //     if (index === 8) {
  //       await changeOptions(page, form, 9, 6);
  //     } else {
  //       await changeOptions(page, form, 9, 0);
  //     }
  //     fs.appendFileSync(`list.txt`, "\n\n\n");
  //   }
  // }

  // FOLDING
  // for (let index = 8; index <= 8; index++) {
  //   await changeOneOptions(page, form, 0, index);
  //   await changeOneOptions(page, form, 3, 0);
  //   let folding = [];
  //   if (index === 0) folding = [1, 3];
  //   if (index === 1) folding = [1, 3, 7, 8];
  //   if (index === 2) folding = [1, 3, 7, 8, 17, 21];
  //   if (index === 3) folding = [1, 3];
  //   if (index === 4) folding = [1, 3, 7, 8, 9, 17, 18, 19, 20, 21];
  //   if (index === 5) folding = [1, 3, 7, 8, 9, 17, 18, 19, 20, 21];
  //   if (index === 6) folding = [1, 3, 7, 8, 9, 17, 18, 19, 20, 21];
  //   if (index === 7) folding = [1, 3, 7, 8, 9, 17, 18, 19, 20, 21];
  //   if (index === 8) folding = [1, 7, 8, 17];
  //   for await (const fol of folding) {
  //     await changeOneOptions(page, form, 4, fol);
  //     if (fol === 1) {
  //       await changeOneOptions(page, form, 5, 0);
  //     } else {
  //       await changeOneOptions(page, form, 5, 2);
  //     }
  //     if (index !== 8) {
  //       await changeOptions(page, form, 9, 0);
  //     } else {
  //       await changeOptions(page, form, 9, 6);
  //     }
  //     fs.appendFileSync(`list.txt`, "\n\n\n");
  //   }
  // }

  /*
  [
  '8.5" x 11"',
  '5.5"',
  '4"',
  '100 lb. Paper Gloss',
  'Tri-Fold/Letter Fold',
  'Outside and Inside',
  'None',
  '25',
  'None',
  '500',
  '3 Business Days'
  ]
  await changeOneOptions(page, form, 4, 3);
  ---  2-panel ---
  3 Half Fold
  4 Half Fold (with scoring)
  5 Half Fold (scored only)
  --- 3-panel ---
  7 Tri-Fold/Letter Fold
  8 Z-Fold
  9 Gate Fold
  10 Trifold/Letter Fold (with scoring)
  11 Z-Fold (with scoring)
  12 Gate Fold (with scoring)
  13 Trifold/Letter Fold (scored only)
  14 Z-Fold (scored only)
  15 Gate Fold (scored only)
  --- 4-Panel ---
  17 Accordion Fold (4 panels)
  18 Double Gate Fold
  19 Double Parallel Fold
  20 French Fold
  21 Roll Fold (4 panels)
  22 Accordion Fold (4 panels, with scoring)
  23 Double Gate (with scoring)
  24 Double Parallel (with scoring)
  25 French Fold (with scoring)
  26 Roll Fold (4 panels, with scoring)
  27 Accordion Fold (4 panels, scored only)
  28 Double Gate (scored only)
  29 Double Parallel (scored only)
  30 Roll Fold (4 panels, scored only)
  --- 6-Panel ---
  32 Half Fold then Tri-Fold
  */
  // await changeOneOptions(page, form, 8, 2);

  console.log("END");
  await browser.close();
  player().play("./alarm.mp3", (err) => {
    if (err) throw err;
  });
};

web();
