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
  await page.waitForTimeout(3000);
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

const changeOptions = async (page, form, button) => {
  const menuBtn = await openList(page, form, button);
  const container = await page.$(".page-product-container");
  for (let i = 6; i < menuBtn.length; i++) {
    switch (i) {
      case 6:
        await menuBtn[i].click();
        // await form.waitForSelector("#price", {
        //   state: "attached",
        // });
        await container.hover();
        await page.waitForTimeout(3000);
        await writeList(form);
        break;
      default:
        const menuBtnDefault = await openList(page, form, button);
        await menuBtnDefault[i].click();
        // await form.waitForSelector("#price", {
        //   state: "attached",
        // });
        await container.hover();
        await page.waitForTimeout(3000);
        await writeList(form);
        break;
    }
  }
};

const changeOneOptions = async (page, form, button, option) => {
  const menuBtn = await openList(page, form, button);
  await menuBtn[option].click();
  //   await form.waitForSelector("#price", {
  //     state: "attached",
  //   });
  await page.waitForTimeout(3000);
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

  // await changeThreeOptions(page, form, 0, 8, 2, 2, 3, 1)
  await changeOneOptions(page, form, 0, 8);
  // await changeOneOptions(page, form, 4, 3); // 1 none | 3 2-panel | 7-9 3-panel | 17-21 4-panel | 32 6-panel
  await changeOneOptions(page, form, 8, 2);
  await changeOptions(page, form, 9);
  fs.appendFileSync(`list.txt`, "\n\n\n");

  console.log("END");
  await browser.close();
  player().play("./alarm.mp3", (err) => {
    if (err) throw err;
  });
};

web();
