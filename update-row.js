import { chromium, firefox, webkit } from "playwright";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

import listPrice from "./listPrice.js";
import dataProducts from "./list.js";

const url = "https://www.apprinting.com/admin/";
const urlProductUpdatePrice =
  "https://www.apprinting.com/bilingual-wedding-invitations/products/#category_product_list";
import seoData from "./seo-data.js";
const qtys = [250, 500, 1000, 2500, 5000, 10000, 15000, 20000, 25000];
/*

*/
//-----> OJO
const idProducts = [
  5131, 5133, 5136, 5138, 5139, 5140, 5142, 5144, 5146, 5147, 5151, 5152, 5154,
  5156, 5159, 5164, 5167, 5173, 5174, 5176, 5187, 5193, 5196, 5201, 5204, 5206,
  5211, 5266, 5267, 5269, 5274, 5277, 5299, 5301, 5302, 5304, 5305, 5307, 5308,
  5310, 5312, 5314, 5316, 5317, 5319, 5322, 5323, 5325, 5326, 5328, 5330, 5331,
  5332, 5333, 5334, 5335, 5336, 5337, 5338, 5339, 5341, 5342, 5343, 5345, 5346,
  5348, 5350, 5351, 5352, 5354, 5356, 5360, 5362, 5364, 5365, 5366, 5367, 5368,
  5369, 5370, 5372, 5374, 5375, 5377, 5379, 5380, 5382, 5383, 5385, 5386, 5387,
  5389, 5391, 5393, 5395, 5396, 5398, 5400, 5401, 5402,
];

const titlesProducts = [
  "AP-[I-14] Subtle Sophistication Flowers Wedding Invitation",
  "K778 [I-12] Whispers of Elegance Flowers Wedding Invitation",
  "ART-08250 [I-10] Delicate Elegance Flowers Wedding Invitation",
  "ART-44995 [I-11] Blossom Bells & Flowers Wedding Invitation",
  "ART-41009 [I-11] Charming Bellflowers Wedding Invitation",
  "ART-80494 [I-09] Flowers Wedding Invitation",
  "ART-84044 [I-11] Flowers Wedding Invitation",
  "K1618 [I-11] Timeless Elegance Flowers Wedding Invitation",
  "K2615 [I-10] Flowers Sophistication Wedding Invitation",
  "K8358 [I-12] Lavender Love Flowers Wedding Invitation",
  "K8455 [I-11] Serenade of Flowers Wedding Invitation",
  "Olive Garden Flowers Wedding Invitation",
  "Olive Garden RSVP Cards Flowers Wedding Invitation",
  "Olive Garden Enclosure Cards Flowers Wedding Invitation",
  "K8536 [I-11] Graceful Garden Flowers Wedding Invitation",
  "Olive Garden Seals Flowers Wedding Invitation",
  "K8631 [I-11] Blushing Blooms Flowers Wedding Invitation",
  "K8781 [I-11] Celebration in Flowers Wedding Invitation",
  "K8784 [I-11] Spring Harmony Flowers Wedding Invitation",
  "K9152 [I-11] Harmony in Bloom Flowers Wedding Invitation",
  "K9649 [I-11] Enchanted Petals & Flowers Wedding Invitation",
  "K9659 [I-11] Soulful Blooms Flowers Wedding Invitation",
  "K9995 [I-10] Botanical Elegance Flowers Wedding Invitation",
  "T1402 [I-15] Silk Flowers Beauty Wedding Invitation",
  "K8071 [I-10] Flowers Symphony Wedding Invitation",
  "Deco Art [CC-55] Romantic Petal Cascade Flowers Wedding Invitation",
  "Delicate Blossoms [CC-35] Fresh Flowers Wedding Invitation",
  "[CC-20] Figured Letters Flowers Wedding Invitation",
  "[CC-25] Naturally Sweet Flowers Wedding Invitation",
  "[CC-05] Pearlized Filigree Border Floral Wedding Invitation",
  "[CC-25] Swirling Romance Flowers Wedding Invitation",
  "[CC-20] Swirled in Silver Flowers Wedding Invitation",
  "[CC-15] Bright White Calla Lily Floral Wedding Invitation",
  "[CC-26] Exquisite Poetry Flowers Wedding Invitation",
  "[CC-20] Filigree Splash Flowers Wedding Invitation",
  "[CC-26] Lace Shimmers Flowers Wedding Invitation",
  "[CC-26] Swirl of Gold Flowers Wedding Invitation",
];

const urlsProducts = [
  "https://www.apprinting.com/blue-flowers-and-leaves-wedding-invitation/",
  "https://www.apprinting.com/tropical-leaves-wedding-invitation/",
  "https://www.apprinting.com/pink-flowers-wedding-invitation/",
  "https://www.apprinting.com/watercolor-blue-roses-wedding-invitation/",
  "https://www.apprinting.com/inspirational-pink-flowers-wedding-invitation/",
  "https://www.apprinting.com/blue-flowers-wedding-invitation/",
  "https://www.apprinting.com/coffee-stained-flowers-wedding-invitation/",
  "https://www.apprinting.com/burgundy-leaves-wedding-invitation/",
  "https://www.apprinting.com/multicolored-rose-bouquet-wedding-invitation/",
  "https://www.apprinting.com/blue-and-gold-leaves-wedding-invitation/",
  "https://www.apprinting.com/warm-fall-flowers-wedding-invitation/",
  "https://www.apprinting.com/botanical-yellow-flowers-wedding-invitation/",
  "https://www.apprinting.com/abstract-golden-waves-wedding-invitation/",
  "https://www.apprinting.com/pastel-green-flowers-wedding-invitation/",
  "https://www.apprinting.com/deep-blue-watercolor-wedding-invitation/",
  "https://www.apprinting.com/bright-spring-floral-wedding-invitation/",
  "https://www.apprinting.com/gentle-pink-bouquet-wedding-invitation/",
  "https://www.apprinting.com/floral-soft-pink-wedding-invitation/",
  "https://www.apprinting.com/dusty-roses-delicate-wedding-invitation/",
  "https://www.apprinting.com/pastel-watercolor-wedding-invitation/",
  "https://www.apprinting.com/pink-spring-flowers-wedding-invitation/",
  "https://www.apprinting.com/peach-flowers-wedding-invitation/",
  "https://www.apprinting.com/rustic-floral-wedding-invitation/",
  "https://www.apprinting.com/simple-large-cursive-wedding-invitation/",
  "https://www.apprinting.com/elegant-green-leaves-wedding-invitation/",
  "https://www.apprinting.com/elegant-brown-leaves-wedding-invitation/",
  "https://www.apprinting.com/pink-paint-strokes-wedding-invitation/",
  "https://www.apprinting.com/ashen-gray-flowers-wedding-invitation/",
  "https://www.apprinting.com/handmade-flower-set-wedding-invitation/",
  "https://www.apprinting.com/handmade-flower-silhouettes-wedding-invitation/",
  "https://www.apprinting.com/soft-leaf-border-wedding-invitation/",
  "https://www.apprinting.com/teal-watercolor-wedding-invitation/",
  "https://www.apprinting.com/elegant-leaves-wedding-invitation/",
  "https://www.apprinting.com/showy-spring-flowers-wedding-invitation/",
  "https://www.apprinting.com/green-and-gray-leaves-wedding-invitation/",
  "https://www.apprinting.com/explosive-watercolor-wedding-invitation/",
  "https://www.apprinting.com/fuchsia-lines-wedding-invitation/",
  "https://www.apprinting.com/green-and-roses-wedding-invitation/",
  "https://www.apprinting.com/luxury-indian-frames-wedding-invitation/",
  "https://www.apprinting.com/gold-plated-leaves-wedding-invitation/",
  "https://www.apprinting.com/bright-flowers-wedding-invitation/",
  "https://www.apprinting.com/sparkling-blue-watercolor-wedding-invitation/",
  "https://www.apprinting.com/luxurious-gold-wedding-invitation/",
  "https://www.apprinting.com/gold-frames-wedding-invitation/",
  "https://www.apprinting.com/cloudy-blue-wedding-invitation/",
  "https://www.apprinting.com/golden-flowers-wedding-invitation/",
  "https://www.apprinting.com/simplicity-and-elegance-wedding-invitation/",
  "https://www.apprinting.com/golden-frame-and-leaves-wedding-invitation/",
  "https://www.apprinting.com/aztec-design-wedding-invitation/",
  "https://www.apprinting.com/elegant-frames-wedding-invitation/",
  "https://www.apprinting.com/golden-corner-flowers-wedding-invitation/",
  "https://www.apprinting.com/rustic-green-leaves-wedding-invitation/",
  "https://www.apprinting.com/golden-leaves-wedding-invitation/",
  "https://www.apprinting.com/vintage-golden-flowers-wedding-invitation/",
  "https://www.apprinting.com/classic-wedding-invitation/",
  "https://www.apprinting.com/blue-and-gold-watercolor-wedding-invitation/",
  "https://www.apprinting.com/simple-flowers-gray-wedding-invitation/",
  "https://www.apprinting.com/blue-golden-flowers-wedding-invitation/",
  "https://www.apprinting.com/minimalist-class-wedding-invitation/",
  "https://www.apprinting.com/vintage-geometric-flowers-wedding-invitation/",
  "https://www.apprinting.com/elegant-golden-frame-wedding-invitation/",
  "https://www.apprinting.com/golden-mandala-wedding-invitation/",
  "https://www.apprinting.com/green-tropical-leaves-wedding-invitation/",
  "https://www.apprinting.com/dark-teal-frame-wedding-invitation/",
  "https://www.apprinting.com/elegant-blue-flowers-wedding-invitation/",
  "https://www.apprinting.com/gold-streaked-sandy-wedding-invitation/",
  "https://www.apprinting.com/copper-stroke-wedding-invitation/",
  "https://www.apprinting.com/gold-trim-wedding-invitation/",
  "https://www.apprinting.com/diffused-blue-droplets-wedding-invitation/",
  "https://www.apprinting.com/blue-purple-brushes-wedding-invitation/",
  "https://www.apprinting.com/glittering-desert-wedding-invitation/",
  "https://www.apprinting.com/pink-and-fuchsia-wedding-invitation/",
  "https://www.apprinting.com/golden-elegance-wedding-invitation/",
  "https://www.apprinting.com/noisy-grays-wedding-invitation/",
  "https://www.apprinting.com/faint-green-ombre-wedding-invitation/",
  "https://www.apprinting.com/pink-and-gray-marble-wedding-invitation/",
  "https://www.apprinting.com/deep-fose-tint-wedding-invitation/",
  "https://www.apprinting.com/splash-of-blush-wedding-invitation/",
  "https://www.apprinting.com/abstract-blue-paint-wedding-invitation/",
  "https://www.apprinting.com/simple-red-flowers-wedding-invitation/",
  "https://www.apprinting.com/refined-black-floral-wedding-invitation/",
  "https://www.apprinting.com/watercolor-sea-water-wedding-invitation/",
  "https://www.apprinting.com/watercolor-earth-tones-wedding-invitation/",
  "https://www.apprinting.com/green-watercolor-wedding-invitation/",
  "https://www.apprinting.com/simple-pink-wedding-invitation/",
  "https://www.apprinting.com/golden-leaves-wedding-invitation-2040/",
  "https://www.apprinting.com/classic-gold-edge-wedding-invitation/",
  "https://www.apprinting.com/white-cherry-blossoms-wedding-invitation/",
  "https://www.apprinting.com/pink-and-red-flowers-wedding-invitation/",
  "https://www.apprinting.com/golden-chinese-lamps-wedding-invitation/",
  "https://www.apprinting.com/blue-frame-clouds-wedding-invitation/",
  "https://www.apprinting.com/golden-invitation-clouds-wedding-invitation/",
  "https://www.apprinting.com/bluish-green-bamboo-wedding-invitation/",
  "https://www.apprinting.com/golden-bamboo-stalks-wedding-invitation/",
  "https://www.apprinting.com/festive-chinese-wedding-invitation/",
  "https://www.apprinting.com/blooming-pink-flowers-wedding-invitation/",
  "https://www.apprinting.com/radiating-gold-flowers-wedding-invitation/",
  "https://www.apprinting.com/golden-lanterns-and-branches-wedding-invitation/",
  "https://www.apprinting.com/pink-and-red-falling-wedding-invitation/",
  "https://www.apprinting.com/lanterns-bright-flowers-wedding-invitation/",
  "https://www.apprinting.com/artistic-cloud-borders-wedding-invitation-2639/",
  "https://www.apprinting.com/burgundy-flowers-wedding-invitation/",
  "https://www.apprinting.com/lanterns-and-celebration-flowers-wedding-invitation/",
  "https://www.apprinting.com/soft-golden-bamboo-wedding-invitation/",
  "https://www.apprinting.com/chinese-lamp-wedding-invitation/",
  "https://www.apprinting.com/dark-blue-wedding-invitation/",
  "https://www.apprinting.com/golden-borders-and-tigers-wedding-invitation/",
  "https://www.apprinting.com/faint-palace-and-lanterns-wedding-invitation/",
  "https://www.apprinting.com/ombre-lanterns-wedding-invitation/",
  "https://www.apprinting.com/flowers-and-lanterns-swaying-wedding-invitation/",
  "https://www.apprinting.com/song-hy-and-gold-borders-wedding-invitation/",
  "https://www.apprinting.com/delicate-bamboo-art-wedding-invitation/",
  "https://www.apprinting.com/hanging-lanterns-and-charms-wedding-invitation/",
  "https://www.apprinting.com/fan-and-artistic-flowers-wedding-invitation/",
  "https://www.apprinting.com/red-border-and-clouds-wedding-invitation/",
  "https://www.apprinting.com/printed-corners-and-flowers-wedding-invitation/",
  "https://www.apprinting.com/festive-lanterns-in-a-sky-wedding-invitation/",
  "https://www.apprinting.com/bright-red-and-cloud-scroll-wedding-invitation/",
  "https://www.apprinting.com/white-clouds-on-dark-red-wedding-invitation/",
  "https://www.apprinting.com/chinese-mountain-and-river-wedding-invitation/",
  "https://www.apprinting.com/bright-flower-border-wedding-invitation/",
  "https://www.apprinting.com/round-hanging-lanterns-wedding-invitation/",
  "https://www.apprinting.com/artistic-cloud-borders-wedding-invitation/",
  "https://www.apprinting.com/refined-edge-pattern-wedding-invitation/",
  "https://www.apprinting.com/elegant-bouquet-of-flowers-wedding-invitation/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel/",
  "https://www.apprinting.com/gradient-gold-and-red-wedding-invitation/",
  "https://www.apprinting.com/modern-dragon-valances-wedding-invitation/",
  "https://www.apprinting.com/oriental-patterned-borders-wedding-invitation/",
  "https://www.apprinting.com/minimalist-white-wedding-invitation/",
  "https://www.apprinting.com/beautiful-red-white-gold-wedding-invitation/",
  "https://www.apprinting.com/golden-geometric-corners-wedding-invitation/",
  "https://www.apprinting.com/chinese-lanterns-wedding-invitation/",
  "https://www.apprinting.com/bouquets-of-pink-flowers-wedding-invitation/",
  "https://www.apprinting.com/simple-oriental-wedding-invitation/",
  "https://www.apprinting.com/clouds-and-flowers-environment-wedding-invitation/",
  "https://www.apprinting.com/blue-snow-wedding-invitation/",
  "https://www.apprinting.com/pink-christmas-wedding-invitation/",
  "https://www.apprinting.com/christmas-pineapple-design-wedding-invitation/",
  "https://www.apprinting.com/floral-winter-wedding-invitation/",
  "https://www.apprinting.com/delicate-snow-debris-wedding-invitation/",
  "https://www.apprinting.com/christmas-pine-branches-wedding-invitation/",
  "https://www.apprinting.com/winter-forest-wedding-invitation/",
  "https://www.apprinting.com/christmas-brown-branches-wedding-invitation/",
  "https://www.apprinting.com/cold-and-tender-flowers-wedding-invitation/",
  "https://www.apprinting.com/frame-snowflakes-wedding-invitation/",
  "https://www.apprinting.com/blue-roses-leaves-wedding-invitation/",
  "https://www.apprinting.com/arrangement-of-winter-roses-wedding-invitation/",
  "https://www.apprinting.com/classic-christmas-design-simple-flat-wedding-invitation/",
  "https://www.apprinting.com/christmas-corners-wedding-invitation/",
  "https://www.apprinting.com/realistic-pine-tree-wedding-invitation/",
  "https://www.apprinting.com/blue-christmas-simple-flat-5x7/",
  "https://www.apprinting.com/christmas-decoration-simple-flat-5x7/",
  "https://www.apprinting.com/cold-watercolor-frame-wedding-invitation/",
  "https://www.apprinting.com/roses-mary-wedding-invitation/",
  "https://www.apprinting.com/minimalist-winter-leaves-wedding-invitation/",
  "https://www.apprinting.com/christmas-leaves-wedding-invitation/",
  "https://www.apprinting.com/royal-pine-frame-wedding-invitation/",
  "https://www.apprinting.com/winter-cream-roses-wedding-invitation/",
  "https://www.apprinting.com/elegant-watercolor-leaves-wedding-invitation/",
  "https://www.apprinting.com/winter-festival-wedding-invitation/",
  "https://www.apprinting.com/loving-snowflakes-wedding-invitation/",
  "https://www.apprinting.com/purple-winter-floral-wedding-invitation/",
  "https://www.apprinting.com/winter-roses-and-leaves-wedding-invitation/",
  "https://www.apprinting.com/modest-roses-wedding-invitation/",
  "https://www.apprinting.com/purple-flower-arrangement-wedding-invitation/",
  "https://www.apprinting.com/golden-leaves-wedding-invitation-2747/",
  "https://www.apprinting.com/white-winter-roses-wedding-invitation/",
  "https://www.apprinting.com/winter-leaves-and-gradient-wedding-invitation/",
  "https://www.apprinting.com/hexagonal-roses-arrangement-wedding-invitation/",
  "https://www.apprinting.com/winter-pines-landscape-wedding-invitation/",
  "https://www.apprinting.com/flowers-and-cold-leaves-wedding-invitation/",
  "https://www.apprinting.com/dark-winter-design-wedding-invitation/",
  "https://www.apprinting.com/winter-geometric-arrangement-wedding-invitation/",
  "https://www.apprinting.com/christmas-and-gold-frame-wedding-invitation/",
  "https://www.apprinting.com/modest-white-flowers-wedding-invitation/",
  "https://www.apprinting.com/pine-and-wood-design-wedding-invitation/",
  "https://www.apprinting.com/winter-design-photo-wedding-invitation/",
  "https://www.apprinting.com/black-snowflakes-wedding-invitation/",
  "https://www.apprinting.com/pine-cone-and-roses-wedding-invitation/",
  "https://www.apprinting.com/watercolor-pines-wedding-invitation/",
  "https://www.apprinting.com/dark-invitation-snowflakes-wedding-invitation/",
  "https://www.apprinting.com/geometric-frame-branches-wedding-invitation/",
  "https://www.apprinting.com/dark-invitation-flowers-wedding-invitation/",
  "https://www.apprinting.com/wooden-frame-snowflakes-wedding-invitation/",
  "https://www.apprinting.com/blue-floral-silhouettes-wedding-invitation/",
  "https://www.apprinting.com/brown-and-white-flower-wedding-invitation/",
  "https://www.apprinting.com/simple-pine-branches-wedding-invitation/",
  "https://www.apprinting.com/wood-white-forest-wedding-invitation/",
  "https://www.apprinting.com/purple-flowers-wedding-invitation/",
  "https://www.apprinting.com/subtle-blue-flowers-wedding-invitation/",
  "https://www.apprinting.com/cardboard-design-flowers-wedding-invitation/",
  "https://www.apprinting.com/winter-flowers-and-frame-wedding-invitation/",
  "https://www.apprinting.com/wood-winter-ligths-wedding-invitation/",
  "https://www.apprinting.com/leaves-and-branches-gradient-wedding-invitation/",
  "https://www.apprinting.com/cardboard-white-branches-wedding-invitation/",
  "https://www.apprinting.com/indian-wedding-ganesha-wedding-invitation/",
  "https://www.apprinting.com/boho-arrows-wedding-invitation/",
  "https://www.apprinting.com/golden-waves-wedding-invitation/",
  "https://www.apprinting.com/eucalyptus-flower-wedding-invitation/",
  "https://www.apprinting.com/laser-cut-blue-wedding-invitation/",
  "https://www.apprinting.com/tropical-stationery-in-peach-wedding-invitation/",
  "https://www.apprinting.com/red-invitation-leaves-wedding-invitation/",
  "https://www.apprinting.com/elegant-beige-and-black-wedding-invitation/",
  "https://www.apprinting.com/elegant-golden-mandala-wedding-invitation/",
  "https://www.apprinting.com/elegant-gold-decorations-wedding-invitation/",
  "https://www.apprinting.com/flowers-and-turquoise-watercolor-wedding-invitation/",
  "https://www.apprinting.com/design-boho-photo-wedding-invitation/",
  "https://www.apprinting.com/cream-colored-boho-wedding-invitation/",
  "https://www.apprinting.com/couple-decorative-borders-wedding-invitation/",
  "https://www.apprinting.com/minimalist-pink-border-wedding-invitation/",
  "https://www.apprinting.com/ornamental-invitation-photo-wedding-invitation/",
  "https://www.apprinting.com/beige-abstract-shapes-wedding-invitation/",
  "https://www.apprinting.com/simple-photo-invitation-wedding-invitation/",
  "https://www.apprinting.com/luxury-gradient-photo-wedding-invitation/",
  "https://www.apprinting.com/gatsby-style-in-gold-wedding-invitation/",
  "https://www.apprinting.com/elegant-white-and-flowers-wedding-invitation/",
  "https://www.apprinting.com/elegant-simple-wedding-invitation/",
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
// txtprice[250_2020635_]
const inputFillToPrice = async (page) => {
  await page.goto(urlProductUpdatePrice, { timeout: 300000 });
  let price = 0;
  //let postNumber = 9607838  ${postNumber}
  for (let i = 37; i <= 39; i++) {
    //if( i == 39 || i == 41){
    for await (const qty of qtys) {
      const id = `txtprice[${qty}_20206${i}_]`;
      const inputPrice = await page.$(`[id="${id}" ]`);
      await inputPrice.fill(listPrice[price].toString());
      console.log(listPrice[price].toString());
      price++;
      //console.log(postNumber);
      //postNumber++
    }
    //}
  }
  const btnSave = await page.$("#btn-action-save");
  await btnSave.click();
  await page.waitForTimeout(5000);
};

const inputFillToRow = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const btn = await page.$("#sort_order");
    await btn.fill("300");
    const btnSave = await page.$("#btn-action-save");
    await btnSave.click();
    await page.waitForTimeout(5000);
    console.log("Working ---> ", id);
  }

  // const products = await page.$$eval(".product-box", (node) =>
  //   node.map((n) => n.className)
  // );
  // console.log(products);
  // const btnSave = await page.$("#btn-action-save");
  // await btnSave.click();
  // await page.waitForTimeout(5000);
};

const categoryDefaultSelect = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    await page.waitForTimeout(3000);
    const btnCategory = await page.$('[data-id="category_id_1"]');
    await btnCategory.click();
    await page.waitForTimeout(3000);
    const btnCategorySelect = await page.$("#bs-select-2-142");
    await btnCategorySelect.click();
    await page.waitForTimeout(3000);
    const btnSave = await page.$("#btn-action-save");
    await btnSave.click();
    await page.waitForTimeout(3000);
    console.log("Working ---> ", id);
    fs.appendFileSync(`list.txt`, id.toString() + "\n");
  }
};

const getAssociatedCategoryProduct = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const associatedCategorySelected = await page.$(
      ".multiselect-selected-text"
    );
    const innerTextAssociatedCategory =
      await associatedCategorySelected.innerText();
    if ((await innerTextAssociatedCategory.search("Acrylic")) !== -1)
      fs.appendFileSync(`list.txt`, id.toString() + "\n");
    console.log(await innerTextAssociatedCategory.search("Acrylic"));
    console.log(innerTextAssociatedCategory);
    console.log("Working ---> ", id);
  }
};

const getIdProducts = async (page) => {
  await page.goto(`https://www.apprinting.com/wedding-menu/products/`, {
    timeout: 300000,
  });
  const products = await page.$$eval(".product-box", (node) =>
    node.map((n) => n.className)
  );
  fs.appendFileSync(`list.txt`, products.toString() + ",\n");
  console.log(products);
};

const redirectionUrl = async (page) => {
  for await (let urlProduct of urlsProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/url_redirection_action.php`,
      { timeout: 300000 }
    );

    const oldUrlInput = await page.$("#old_url");
    const newUrlInput = await page.$("#new_url");
    const btnSave = await page.$("#btn-action-save");

    await oldUrlInput.fill(urlProduct);
    await newUrlInput.fill("https://www.apprinting.com/");
    await btnSave.click();
    await page.waitForTimeout(3000);
    console.log("Working ---> ", urlProduct);
  }
};

const getChangedTitleProductWithArray = async (page) => {
  let indexTitle = 0;
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const responsePromise = page.waitForResponse(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`
    );
    const btnSave = await page.$("#btn-action-save");
    const title = await page.$("#products_title_1");
    const valueInput = await title.inputValue();
    const newTitle = titlesProducts[indexTitle];
    await title.fill(newTitle);
    await btnSave.click();
    //await page.waitForTimeout(3000);
    const response = await responsePromise;
    indexTitle++;
    const report = `Working ---> ${id} Old Title ---> ${valueInput} New Title ---> ${newTitle} index title -----> ${indexTitle}`;
    fs.appendFileSync(`list.txt`, report + "\n");
    console.log(report);
  }
};

const auditSeoData = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_metatags.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const pageTitle = await page.$("#seo_page_title_1");
    const metaDescription = await page.$("#seo_page_description_1");
    const markUp = await page.$("#schema_markup_1");
    const metaAdditional = await page.$("#seo_page_metatags1");
    const date = [
      await pageTitle.inputValue(),
      await metaDescription.inputValue(),
      await markUp.inputValue(),
      await metaAdditional.inputValue(),
    ];
    for await (let input of date) {
      if (input == "") fs.appendFileSync(`list.txt`, id, +"\n");
    }
    console.log(`Working ---> ${id}`);
  }
};

const changedSeoData = async (page) => {
  let i = 0;
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_metatags.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const responsePromise = page.waitForResponse(
      `https://www.apprinting.com/admin/product_metatags.php?product_id=${id}`
    );
    const btnSave = await page.$("#btn-action-save");
    const pageTitle = await page.$("#seo_page_title_1");
    const metaDescription = await page.$("#seo_page_description_1");
    const markUp = await page.$("#schema_markup_1");
    const metaAdditional = await page.$("#seo_page_metatags1");
    await pageTitle.fill(seoData[i][0]);
    await metaDescription.fill(seoData[i][1]);
    await markUp.fill(seoData[i][2]);
    await metaAdditional.fill(seoData[i][3]);
    await btnSave.click();
    const response = await responsePromise;
    //await page.waitForTimeout(3000);
    fs.appendFileSync(`list.txt`, id + "\n");
    i = i + 1;
    console.log(`Working ---> ${i}`);
  }
};

const getMarkUpSchemaProducts = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const productName = await page.$("#products_title_1");
    const productNameValue = await productName.inputValue();
    const productSku = await page.$("#products_sku");
    const productSkuValue = await productSku.inputValue();
    const report = `{"@context":"https://schema.org/","@type":"Product","name":"${productNameValue}","description":"${productNameValue}. A high-quality product offered by AP PRINTING. Our design team ensures that every detail is perfect to meet our customers' needs.","sku":"${productSkuValue}","brand":{"@type":"Card","name":"BHGRE Franchise Real Estate"},"review":{"@type":"Review","reviewRating":{"@type":"Rating","ratingValue":"4","bestRating":"5"},"author":{"@type":"Person","name":"AP PRINTING DESIGN TEAM"}},"aggregateRating":{"@type":"AggregateRating","ratingValue":"${(
      Math.random() * (5 - 4.1) +
      4.1
    ).toFixed(1)}","reviewCount":"${Math.floor(
      Math.random() * (9000 - 15000) + 9000
    )}"},"offers": {"@type": "Offer","url": "https://www.apprinting.com/blue-flowers-and-leaves-wedding-invitation/","priceCurrency": "USD","price": "85.00","priceValidUntil": "2024-12-24","itemCondition": "https://schema.org/UsedCondition","availability": "https://schema.org/InStock"}}`;
    fs.appendFileSync(`list.txt`, report + "\n");
    console.log(report);
  }
};

const getTitleTitleImagesGallery = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_image_gallery_listing.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const report = `${id},`;
    const inputsTitle = await page.$$(".form-control.input-medium");
    for await (let input of inputsTitle) {
      const titleImage = await input.inputValue();
      if (titleImage == "") {
        fs.appendFileSync(`list.txt`, report + "\n");
        console.log(`------>`, report);
      }
    }
    console.log(report);
  }
};

const getTitleAndChangedTitleImagesGallery = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_image_gallery_listing.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const responsePromise = page.waitForResponse(
      `https://www.apprinting.com/admin/product_image_gallery_listing.php?product_id=${id}`
    );
    const btnEdit = await page.$("#btn-action-edit");
    const pageHeader = await page.$(".page-header");
    const title = await pageHeader.$("small");
    const titleString = await title.innerText();
    const inputsTitle = await page.$$(".form-control.input-medium");
    for await (let input of inputsTitle) {
      await input.fill(titleString);
    }
    await btnEdit.click();
    const response = await responsePromise;
    //await page.waitForTimeout(3000);
    const report = `${id},`;
    fs.appendFileSync(`list.txt`, report + "\n");
    console.log(report);
  }
};

const getChangedTitleProduct = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const btnSave = await page.$("#btn-action-save");
    const title = await page.$("#products_title_1");
    const valueInput = await title.inputValue();
    const newTitle = await valueInput.replace("C/E", "");
    //const newTitleAddSection = valueInput + " Flowers";
    // const newTitleTwo = await newTitle.replace("Simple Flat", "");
    // const newTitleThree = await newTitleTwo.replace("Simple Flat 5x7", "");
    // const newTitleFinal = (await newTitleThree) + "Simple Flat 5x7";
    await title.fill(newTitle);
    await btnSave.click();
    await page.waitForTimeout(3000);
    console.log(
      "Working ---> ",
      id,
      " Old Title ---> ",
      valueInput,
      " New Title ---> ",
      newTitle
    );
    //console.log(newTitle);
  }
};

const filterDataListArray = (filterString) => {
  dataProducts.forEach((product) => {
    // if (
    //   product.title.search(filterString) !== -1
    // ) {
    //   fs.appendFileSync(
    //     `list.txt`,
    //     //product.id.toString() + `---> ${product.title}` + ",\n"
    //     product.id.toString() + ",\n"
    //   );
    // }
    const report = `${product.id}\n`;
    //const report = `${product.title},\n`;
    //const report = `"${product.title}",\n`;
    //const report = `${product.id},\n`;
    //const report = `${product.title},\n`;
    //const report = `"${product.url}",\n`;
    fs.appendFileSync(`list.txt`, report);
    console.log(report);
  });
};

const filtersDataListArray = (filterString) => {
  dataProducts.forEach((product) => {
    if (
      product.title.search(filterString) !== -1 &&
      product.title.search("Pocket Invitation Card") === -1
      // &&
      // product.title.search("Sleeve") === -1 &&
      // product.title.search("Square") === -1 &&
      // product.title.search("Cascade") === -1 &&
      // product.title.search("Atlas") === -1 &&
      // product.title.search("Denali") === -1 &&
      // product.title.search("Acrylic") === -1 &&
      // product.title.search("Bilingual") === -1 &&
      // product.title.search("Laser Cut") === -1 &&
      // product.title.search("Fancy Luxury") === -1
    ) {
      fs.appendFileSync(
        `list.txt`,
        //product.id.toString() + `---> ${product.title}` + ",\n"
        product.id.toString() + ",\n"
      );
    }
    console.log(product);
  });
};

const getTitleFilterProduct = async (page, filterString) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const title = await page.$("#products_title_1");
    const valueInput = await title.inputValue();
    if ((await valueInput.search(filterString)) !== -1)
      fs.appendFileSync(`list.txt`, id.toString() + ",\n");
    console.log("Working ---> ", id, " ------> ", valueInput);
  }
};

const getStatusCheckboxes = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    //await page.waitForTimeout(3000)
    var productType = await page.$eval(
      "#product_type_3",
      (node) => node.inputValue
    );
    // const checkBox = await productType.evaluate((element) => {
    // window.getComputedStyle(element).getPropertyValue("background-image")

    // });
    // for await (let checkbox of checkboxes) {
    //   const titleCheckbox = await checkbox.inn
    //   console.log(titleCheckbox);
    // }
    // const report = `{id:${id},url:"https://www.apprinting.com/${urlInput}/"},\n`;
    // const report = `${urlInput}\n`;
    // fs.appendFileSync(`list.txt`, report);
    //console.log(`working ---> ${report}`);
    console.log(productType);
  }
};

const getUrlProducts = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const url = await page.$("#product_url_1");
    const urlInput = await url.inputValue();
    const report = `{id:${id},url:"https://www.apprinting.com/${urlInput}/"},\n`;
    // const report = `${urlInput}\n`;
    fs.appendFileSync(`list.txt`, report);
    console.log(`working ---> ${report}`);
  }
};

const getTitleProduct = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const title = await page.$("#products_title_1");
    const valueInput = await title.inputValue();
    const report = `{id:${id},title:"${valueInput}"},\n`;
    // const report = `${valueInput}\n`;
    fs.appendFileSync(`list.txt`, report);
    console.log(`working ---> ${report}`);
  }
};

const addSetupProductPageDesigner = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_designer_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const pageName1 = await page.$("#pagename_0");
    await pageName1.fill("English Card");

    const btnAdd = await page.$('[data-tableaddrow="page_table"]');
    await btnAdd.click();
    await page.waitForTimeout(3000);

    const pageName7 = await page.$("#pagename_7");
    await pageName7.fill("Chinese Card");

    const pageSort7 = await page.$("#pagesort_7");
    await pageSort7.fill("15");

    const tablePage = await page.$("#page_table");
    await tablePage.screenshot({ path: "./table-page.jpg" });
    // const title = await page.$("#products_title_1");
    // const valueInput = await title.inputValue();
    // fs.appendFileSync(`list.txt`, `{id:${id},title:"${valueInput}"},\n`);
    // console.log("Working ---> ", id, " ------> ", valueInput);
  }
};

const auditActionBtv = async (page) => {
  for await (let data of dataProducts) {
    await page.goto(data.url, { timeout: 300000 });
    //await page.waitForTimeout(3000);
    const actionsButtons = await page.$("#action-btn");
    const actions = await actionsButtons.$$eval("a", (node) =>
      node.map((n) => n.innerText)
    );
    for await (let action of actions) {
      if (action == "Personalize") {
        const report = `{id:${data.id},url:${data.url}},\n`;
        fs.appendFileSync(`list.txt`, report);
        console.log(report);
      }
    }
  }
};

const auditActionBtvVerify = async (page) => {
  for await (let data of dataProducts) {
    await page.goto(data.url, { timeout: 300000 });
    //await page.waitForTimeout(3000);
    const personalizeBtn = await page.$(".browse_design");
    await personalizeBtn.click();
    await page.waitForTimeout(3000);
    const getUrl = await page.url();
    const report = `{id:${data.id},url:"${data.url}",personalizeGetUrl:"${getUrl}"},\n`;
    fs.appendFileSync(`list.txt`, report);
    console.log(report);
  }
};

const filterPersonalizeBtnActions = () => {
  dataProducts.forEach((product) => {
    //const report = `{id:${product.id},url:"${product.url}",personalizeUrl:"${product.personalizeGetUrl}"}\n`;
    const report = `${product.id},\n`;
    if (
      product.personalizeGetUrl.search("product_design_customize.php") === -1
    ) {
      fs.appendFileSync(`list.txt`, report);
    }
    console.log(report);
  });
};

const StatusActionsBtn = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const productTypeBrowseDesign = await page.$("#product_type_3");
    const inputBrowseDesign = await productTypeBrowseDesign.$("input");
    const statusBrowseDesign = await inputBrowseDesign.isChecked();
    const productTypeCustomDesign = await page.$("#product_type_1");
    const inputCustomDesign = await productTypeCustomDesign.$("input");
    const statusCustomDesign = await inputCustomDesign.isChecked();
    const report = `{id:${id},statusBrowseDesign:${statusBrowseDesign},statusCustomDesign:${statusCustomDesign}}\n`;
    fs.appendFileSync(`list.txt`, report);
    console.log(report);
  }
};

const changeActionsBtn = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const responsePromise = page.waitForResponse(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`
    );
    const btnSave = await page.$("#btn-action-save");
    const productTypeBrowseDesign = await page.$("#product_type_3");
    const inputBrowseDesign = await productTypeBrowseDesign.$("input");
    await inputBrowseDesign.click();
    const productTypeCustomDesign = await page.$("#product_type_1");
    const inputCustomDesign = await productTypeCustomDesign.$("input");
    await inputCustomDesign.click();
    await btnSave.click();
    const response = await responsePromise;
    //await page.waitForTimeout(7000);
    const report = `${id}\n`;
    fs.appendFileSync(`list.txt`, report);
    console.log(report);
  }
};

const updatePrice = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  //LOGIN APP
  //await login(page);

  //FUNCTIONS GROUPS
  //await getIdProducts(page);
  //await getTitleProduct(page);
  filterDataListArray("Simple Flat 5x7"); // FUNCTION FILTER DATA LIST.JS
  
  //await getChangedTitleProductWithArray(page);

  //await getMarkUpSchemaProducts(page);
  //await changedSeoData(page);
  //await auditSeoData(page);
  //await getTitleAndChangedTitleImagesGallery(page);
  //await getTitleTitleImagesGallery(page);

  //await getUrlProducts(page);
  //await auditActionBtv(page);
  //await auditActionBtvVerify(page);
  //filterPersonalizeBtnActions();
  //await changeActionsBtn(page);
  //await StatusActionsBtn(page);

  //filtersDataListArray("Bilingual"); // FUNCTION FILTERS DATA LIST.JS
  //await inputFillToRow(page);
  //await inputFillToPrice(page);
  //await categoryDefaultSelect(page);
  //await redirectionUrl(page);
  //await getChangedTitleProduct(page);

  //await getStatusCheckboxes(page);

  //await getTitleFilterProduct(page, "Acrylic");
  //await getAssociatedCategoryProduct(page);
  //await addSetupProductPageDesigner(page);

  console.log("END");
  await browser.close();
};

updatePrice();
