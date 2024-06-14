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
const idProducts = [
  3304, 3306, 3308, 3311, 3313, 3315, 3312, 3310, 3309, 3307, 3305, 3303, 3301,
  3299, 3290, 3283, 3262, 3259, 3256, 3253, 3250, 3243, 3231, 3212, 3200, 3199,
];

const titlesProducts = [
  "Purple Floral Indian Half Fold Wedding Invitation",
  "Elegant Abstract Indian Half Fold Wedding Invitation",
  "Golden Elephant and Peacocks Half Fold Wedding Invitation",
  "Red Luxurious Pattern Half Fold Wedding Invitation",
  "Sprightly Golden Pattern Half Fold Wedding Invitation",
  "Wedded Couple Indian Half Fold Wedding Invitation",
  "Elegantly Jeweled Golden Half Fold Wedding Invitation",
  "Jeweled Floral Paisley Half Fold Wedding Invitation",
  "Pair of Glimmering Peacocks Half Fold Wedding Invitation",
  "Golden Crystalline Paisley Half Fold Wedding Invitation",
  "Extravagant Peacock Feathers Half Fold Wedding Invitation",
  "Symmetrical Fanned Jeweled Half Fold Wedding Invitation",
  "Peacock and Crystal Flowers Half Fold Wedding Invitation",
  "Flowers Around Palace Half Fold Wedding Invitation",
  "India Festive Purple Half Fold Wedding Invitation",
  "Invitation Trumpets and Fire Half Fold Wedding Invitation",
  "Faint Purple Mandala Half Fold Wedding Invitation",
  "Original Oriental Pattern Half Fold Wedding Invitation",
  "Luxury with Elephant Symbol Half Fold Wedding Invitation",
  "Ornamental Indian Red Half Fold Wedding Invitation",
  "Mandala Beautiful Gold Half Fold Wedding Invitation",
  "Delicate Gold Edge Half Fold Wedding Invitation",
  "Gold Frame Photo Half Fold Spanish and English Wedding Invitation",
  "Decorations and Couple's Photo Half Fold Spanish and English Wedding Invitation",
  "Geometric Black and Beige Half Fold Spanish and English Wedding Invitation",
  "Lace Wedding Dress Half Fold Spanish and English Wedding Invitation",
];

// const urlsProducts = [
//   "https://www.apprinting.com/minimalist-design-with-hamburger-13oz.-standard-vinyl-banner",
//   "https://www.apprinting.com/elegant-and-simple-design-presentation-folders/",
//   "https://www.apprinting.com/vibrant-orange-design-presentation-folders/",
//   "https://www.apprinting.com/white-with-green-design-a-frame-sign/",
//   "https://www.apprinting.com/pizzerias-design-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/teal-atoll-solid-pocket-invitation-card-a7-himalaya/",
//   "https://www.apprinting.com/standard-business-cards-ddo/products/",
//   "https://www.apprinting.com/black-solid-pocket-invitation-card-a7-atlas/",
//   "https://www.apprinting.com/design-with-hot-dogs-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/postcards/",
//   "https://www.apprinting.com/calendar/",
//   "https://www.apprinting.com/design-coffee-cup-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/standard-postcards-3756/",
//   "https://www.apprinting.com/pastel-blue-solid-pocket-invitation-card-a7-cascade/",
//   "https://www.apprinting.com/blue-vertical-stripes-flyer",
//   "https://www.apprinting.com/blue-vertical-stripes-flyer/",
//   "https://www.apprinting.com/turquoise-with-paste-design-13oz.-standard-vinyl-banner",
//   "https://www.apprinting.com/standard-postcards/",
//   "https://www.apprinting.com/tacos-with-yellows-13oz.-standard-vinyl-banner",
//   "https://www.apprinting.com/standard-postcards-3751/",
//   "https://www.apprinting.com/invoice/",
//   "https://www.apprinting.com/berkshire-degraded-purple-yard-sing/",
//   "https://www.apprinting.com/chicken-design-with-vegetables-13oz.-standard-vinyl-banner",
//   "https://www.apprinting.com/clasic-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/radiant-turquoise-and-black-mailing-post-card-direct-mail/",
//   "https://www.apprinting.com/old-rose-pink-solid-pocket-invitation-card-a7-atlas/",
//   "https://www.apprinting.com/silver-metallic-pocket-invitation-card-a7-cascade/",
//   "https://www.apprinting.com/standard-business-cards-real-estate/products/",
//   "https://www.apprinting.com/sky-with-photo-welcome-sign-4971/",
//   "https://www.apprinting.com/labels-1644/",
//   "https://www.apprinting.com/simple-black-design-presentation-folders/",
//   "https://www.apprinting.com/realtor-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/minimalist-design-with-hamburger-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/two-simple-colors-business-cards/",
//   "https://www.apprinting.com/marketing-materials/products/",
//   "https://www.apprinting.com/turquoise-with-paste-design-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/azure-blue-solid-pocket-invitation-card-a7-cascade/",
//   "https://www.apprinting.com/hamburger-promotion-a-frame-sign/",
//   "https://www.apprinting.com/design-smoothie-and-donuts.-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/gold-and-black-wedding-seating-charts/",
//   "https://www.apprinting.com/minimalist-green-design-flyer/",
//   "https://www.apprinting.com/burger-in-black-13oz.-standard-vinyl-banner",
//   "https://www.apprinting.com/landscaping-contractors",
//   "https://www.apprinting.com/standard-postcards-3748/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-giuliana-2851/",
//   "https://www.apprinting.com/beautiful-olive-green-business-cards",
//   "https://www.apprinting.com/2024-calendar/products/",
//   "https://www.apprinting.com/mailing-post-card-eddm-template/",
//   "https://www.apprinting.com/special-breakfast-deal-a-frame-sign/",
//   "https://www.apprinting.com/standard-postcards-3757",
//   "https://www.apprinting.com/standard-postcards-3757/",
//   "https://www.apprinting.com/new-house-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/chicken-design-with-vegetables-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/tacos-with-yellows-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/modern-lilac-flyer/",
//   "https://www.apprinting.com/car-silhouette-business-cards/",
//   "https://www.apprinting.com/azure-blue-solid-pocket-invitation-card-a7-atlas/",
//   "https://www.apprinting.com/detailed-brown-design-business-cards/",
//   "https://www.apprinting.com/turquoise-collage-flyer/",
//   "https://www.apprinting.com/banners-restaurant-template/",
//   "https://www.apprinting.com/carbonless-forms-8.5x11/",
//   "https://www.apprinting.com/modern-red-lines-mailing-post-card-eddm/",
//   "https://www.apprinting.com/beautiful-beige-house-mailing-post-card-direct-mail/",
//   "https://www.apprinting.com/modern-design-flyer/",
//   "https://www.apprinting.com/photo-collage-mailing-post-card-direct-mail/",
//   "https://www.apprinting.com/beautiful-olive-green-business-cards/",
//   "https://www.apprinting.com/invitation-bright-pink-wedding-invitation/",
//   "https://www.apprinting.com/painted-edge-business-cards-restaurant-template/",
//   "https://www.apprinting.com/standard-postcards",
//   "https://www.apprinting.com/business-cards-furniture",
//   "https://www.apprinting.com/blue-minimalist-paintings-presentation-folders",
//   "https://www.apprinting.com/door-hangers-2/",
//   "https://www.apprinting.com/burger-in-black-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/blue-minimalist-paintings-presentation-folders/",
//   "https://www.apprinting.com/pastel-pink-solid-pocket-invitation-card-a7-atlas/",
//   "https://www.apprinting.com/elegant-gray-mailing-post-card-eddm/",
//   "https://www.apprinting.com/minimalist-accompanied-by-houses-mailing-post-card-direct-mail/",
//   "https://www.apprinting.com/p4842//product_info.html",
//   "https://www.apprinting.com/berkshire-combination-of-purple-a-frame-sign-24x24-4651/",
//   "https://www.apprinting.com/presentation-folders-template/",
//   "https://www.apprinting.com/creative-pizza-design-business-cards/",
//   "https://www.apprinting.com/dental-care-mail-post-card/",
//   "https://www.apprinting.com/balck-and-white-posters/",
//   "https://www.apprinting.com/business-flyers-real-state/",
//   "https://www.apprinting.com/gold-metallic-pocket-invitation-card-a7-atlas/",
//   "https://www.apprinting.com/exit-realty-blue-waves-a-frame-sign-24x24/",
//   "https://www.apprinting.com/turquoise-curved-design-presentation-folders/",
//   "https://www.apprinting.com/mailing-post-card-eddm-template",
//   "https://www.apprinting.com/brochure-triptych/",
//   "https://www.apprinting.com/traditional-wedding-entourage-in-gold-foil-wedding-invitation/",
//   "https://www.apprinting.com/turquoise-and-salmon-flyer/",
//   "https://www.apprinting.com/mailing-post-card-direct-mail-template/",
//   "https://www.apprinting.com/simple-pizza-design-13oz.-standard-vinyl-banner",
//   "https://www.apprinting.com/white-with-green-design-a-frame-sign",
//   "https://www.apprinting.com/pizza-on-board-13oz.-standard-vinyl-banner",
//   "https://www.apprinting.com/painted-edge-business-cards-restaurant-template",
//   "https://www.apprinting.com/cheerful-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/mexican-food-a-frame-sign/",
//   "https://www.apprinting.com/wedding-dress-and-suit-wedding-invitation/",
//   "https://www.apprinting.com/exp-realty-sophisticated-design-with-photo-metal-sidewalk-a-frame-4598/",
//   "https://www.apprinting.com/turquoise-curved-design-presentation-folders",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-3052/",
//   "https://www.apprinting.com/white-roses-arrangement-wedding-invitation-3673/",
//   "https://www.apprinting.com/mailing-post-card-direct-mail-template-4515/",
//   "https://www.apprinting.com/dark-blue-real-estate-custom-yard-signs",
//   "https://www.apprinting.com/real-estate-business-cards/",
//   "https://www.apprinting.com/real-estates-business-cards/",
//   "https://www.apprinting.com/onyx-black-metallic-pocket-invitation-card-a7-denali/",
//   "https://www.apprinting.com/modern-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/real-estate-with-blue-a-frame-sign/",
//   "https://www.apprinting.com/a-frame-real-estate-template/",
//   "https://www.apprinting.com/new-house-real-estate-custom-yard-signs",
//   "https://www.apprinting.com/light-blue-gradient-presentation-folders/",
//   "https://www.apprinting.com/torn-effect-for-pizza-business-cards/",
//   "https://www.apprinting.com/light-green-design-business-cards/",
//   "https://www.apprinting.com/blush-shimmer-laser-cut-with-glittery-border-wedding-invitation/",
//   "https://www.apprinting.com/pizza-on-board-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/blue-minimalist-design-business-cards/",
//   "https://www.apprinting.com/modern-dark-design-business-cards/",
//   "https://www.apprinting.com/blue-geometric-design-presentation-folders/",
//   "https://www.apprinting.com/dream-house-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/standard-business-cards-restaurant-template/",
//   "https://www.apprinting.com/dusty-steel-blue-solid-pocket-invitation-card-a7-cascade/",
//   "https://www.apprinting.com/simple-sushi-design-business-cards/",
//   "https://www.apprinting.com/elegant-gray-and-black-presentation-folders/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-3076/",
//   "https://www.apprinting.com/port-wine-solid-pocket-invitation-card-a7-cascade/",
//   "https://www.apprinting.com/vintage-celestial-sky-wedding-invitation/",
//   "https://www.apprinting.com/productlist_category_wise.html",
//   "https://www.apprinting.com/ice-cream-shop-a-frame-sign/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-2874/",
//   "https://www.apprinting.com/interesting-design-for-cafeteria-business-cards/",
//   "https://www.apprinting.com/home-promotion-poster-4223/",
//   "https://www.apprinting.com/milkshake-offer-a-frame-sign/",
//   "https://www.apprinting.com/great-hamburger-offer-a-frame-sign/",
//   "https://www.apprinting.com/bakery-a-frame-sign/",
//   "https://www.apprinting.com/real-state-yellow-a-frame-sign/",
//   "https://www.apprinting.com/colored-green-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/dark-blue-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/barbecue-offers-a-frame-sign/",
//   "https://www.apprinting.com/real-state-blue-and-red-a-frame-sign/",
//   "https://www.apprinting.com/standard-business-cards-3752/",
//   "https://www.apprinting.com/colorful-warm-circles-business-cards/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-3067/",
//   "https://www.apprinting.com/real-state-gray-a-frame-sign/",
//   "https://www.apprinting.com/geometric-diagonal-design-presentation-folders/",
//   "https://www.apprinting.com/leaves-gold-frames-wedding-invitation/",
//   "https://www.apprinting.com/brown-design-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/minimalist-real-estate-a-frame-sign/",
//   "https://www.apprinting.com/vibrant-gradient-colors-presentation-folders/",
//   "https://www.apprinting.com/italian-food-a-frame-sign/",
//   "https://www.apprinting.com/green-real-estate-a-frame-sign/",
//   "https://www.apprinting.com/blue-yellow-letters-seating-charts-3408/",
//   "https://www.apprinting.com/-9-envelopes/",
//   "https://www.apprinting.com/house-in-hand-real-estate-a-frame-sign/",
//   "https://www.apprinting.com/red-and-blue-design-a-frame-sign/",
//   "https://www.apprinting.com/beautiful-dark-blue-presentation-folders/",
//   "https://www.apprinting.com/coffee-shop-a-frame-sign/",
//   "https://www.apprinting.com/pizza-special-offer-a-frame-sign/",
//   "https://www.apprinting.com/geometric-blue-gradation-presentation-folders/",
//   "https://www.apprinting.com/sales-agent-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/real-estate-with-black-a-frame-sign/",
//   "https://www.apprinting.com/minimalist-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/classic-minimalist-seating-charts/",
//   "https://www.apprinting.com/imagine-850-retractable-banner-stand//1000",
//   "https://www.apprinting.com/open-house-real-estate-custom-yard-signs/",
//   "https://www.apprinting.com/custom-yard-signs/",
//   "https://www.apprinting.com/torn-effect-for-pizza-business-cards",
//   "https://www.apprinting.com/simple-design-with-food-business-cards/",
//   "https://www.apprinting.com/modern-dark-design-business-cards",
//   "https://www.apprinting.com/minimalist-black-and-white-seating-chart//1000",
//   "https://www.apprinting.com/simple-pizza-design-13oz.-standard-vinyl-banner/",
//   "https://www.apprinting.com/bakery-a-frame-sign",
//   "https://www.apprinting.com/elegant-vinotint-design-a-frame-sign/",
//   "https://www.apprinting.com/black-and-white-pizzaria-standard-business-cards/",
//   "https://www.apprinting.com/metallic-cream-linen-pocket-invitation-card-a-7.5-himalaya/",
//   "https://www.apprinting.com/dream-house-real-estate-custom-yard-signs",
//   "https://www.apprinting.com/yard-sign-real-estate-template/",
//   "https://www.apprinting.com/earth-tones-pocket-wedding-invitation/",
//   "https://www.apprinting.com/gold-leaf-metallic-pocket-invitation-card-a7-denali/",
//   "https://www.apprinting.com/grey-fog-solid-pocket-invitation-card-a7-atlas/",
//   "https://www.apprinting.com/standard-business-cards-4033/",
//   "https://www.apprinting.com/minimalist-real-estate-custom-yard-signs",
//   "https://www.apprinting.com/7x7-gate-fold-wedding-invitation-template-3353/",
//   "https://www.apprinting.com/custom-yard-signs",
//   "https://www.apprinting.com/geometric-diagonal-design-presentation-folders",
//   "https://www.apprinting.com/open-house-real-estate-custom-yard-signs",
//   "https://www.apprinting.com/real-estate-business-cards",
//   "https://www.apprinting.com/floral-and-colorful-wedding-invitation/",
//   "https://www.apprinting.com/purple-circles-brochure-4068/",
//   "https://www.apprinting.com/purple-circles-brochure-4066/",
//   "https://www.apprinting.com/baltic-sea-blue-solid-pocket-invitation-card-a7-denali/",
//   "https://www.apprinting.com/banners-restaurant-template-4300/",
//   "https://www.apprinting.com/teal-atoll-solid-pocket-invitation-card-a7-denali/",
//   "https://www.apprinting.com/13oz.-standard-vinyl-banner-3728/",
//   "https://www.apprinting.com/13oz.-standard-vinyl-banner-3727/",
//   "https://www.apprinting.com/13oz.-standard-vinyl-banner-3726/",
//   "https://www.apprinting.com/13oz.-standard-vinyl-banner-3722/",
//   "https://www.apprinting.com/door-hangers-2",
//   "https://www.apprinting.com/13oz.-standard-vinyl-banner-3725/",
//   "https://www.apprinting.com/summer/products/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-giuliana-2871/",
//   "https://www.apprinting.com/corner-with-cherry-tree-wedding-invitation/",
//   "https://www.apprinting.com/frame-purple-with-flowers-wedding-invitation/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-2893/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-giuliana-2867/",
//   "https://www.apprinting.com/chic-blue-dog-calendar/",
//   "https://www.apprinting.com/neon-electronic-party-calendar/",
//   "https://www.apprinting.com/standard-postcards-3755/",
//   "https://www.apprinting.com/leaves-and-garden-party-pocket-wedding-invitation/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-giuliana-2873/",
//   "https://www.apprinting.com/13oz.-standard-vinyl-banner-3724/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-2819/",
//   "https://www.apprinting.com/vintage-mountains/products/",
//   "https://www.apprinting.com/guardsman-red-solid-pocket-invitation-card-a7-cascade/",
//   "https://www.apprinting.com/natural-cream-linen-pocket-invitation-card-a-7.5-himalaya/",
//   "https://www.apprinting.com/teal-atoll-solid-pocket-invitation-card-a7-cascade/",
//   "https://www.apprinting.com/white-and-red-flowers-wedding-invitation/",
//   "https://www.apprinting.com/watercolor-hand-drawn-wedding-invitation/",
//   "https://www.apprinting.com/minimalist-black-and-white-seating-charts-1985/",
//   "https://www.apprinting.com/boho-brown-branches-wedding-invitation/",
//   "https://www.apprinting.com/elegant-tropical-ticket-wedding-invitation-eduardo/",
//   "https://www.apprinting.com/brochure-letterhead/",
//   "https://www.apprinting.com/baltic-sea-blue-solid-pocket-invitation-card-a7-himalaya/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-2892/",
//   "https://www.apprinting.com/sequoia-green-solid-pocket-invitation-card-a7-himalaya/",
//   "https://www.apprinting.com/togo-menus/",
//   "https://www.apprinting.com/prune-purple-solid-pocket-invitation-card-a7-himalaya/",
//   "https://www.apprinting.com/watercolor-celestial-wedding-invitation/",
//   "https://www.apprinting.com/half-fold-wedding-invitation/products/",
//   "https://www.apprinting.com/tropical-leaves-wedding-invitation-3071/",
//   "https://www.apprinting.com/teal-atoll-solid-pocket-invitation-card-a7-atlas/",
//   "https://www.apprinting.com/gold-and-black-wedding-seating-charts",
//   "https://www.apprinting.com/royal-blue-solid-pocket-invitation-card-a7-himalaya/",
//   "https://www.apprinting.com/standard-postcards-3749/",
//   "https://www.apprinting.com/hand-drawn-newlywed-wedding-invitation/",
//   "https://www.apprinting.com/guardsman-red-solid-pocket-invitation-card-a7-himalaya/",
//   "https://www.apprinting.com/boho-with-feathers-wedding-invitation/",
//   "https://www.apprinting.com/violet-leaves-wedding-invitation/",
//   "https://www.apprinting.com/moon-in-the-city-wedding-invitation/",
//   "https://www.apprinting.com/golden-circle-with-flowers-wedding-invitation/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-fiorela-3068/",
//   "https://www.apprinting.com/azure-blue-solid-pocket-invitation-card-a7-denali/",
//   "https://www.apprinting.com/beautiful-aquatic-flower-simple-flat-wedding-invitation/",
//   "https://www.apprinting.com/gray-leaves-pocket-wedding-invitation-2600/",
//   "https://www.apprinting.com/boarding-pass-wedding-invitation-template-eduardo-2761/",
//   "https://www.apprinting.com/help/",
//   "https://www.apprinting.com/dark-blue-metallic-pocket-invitation-card-a7-atlas/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-2922/",
//   "https://www.apprinting.com/standard-postcards-3758/",
//   "https://www.apprinting.com/13oz.-standard-vinyl-banner-3729/",
//   "https://www.apprinting.com/standard-postcards-3764/",
//   "https://www.apprinting.com/wheat-leaves-wedding-invitation/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-2890/",
//   "https://www.apprinting.com/brochure-triptych-lawyers/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-2885/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-2898/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-2895/",
//   "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-2877/",
//   "https://www.apprinting.com/watercolor-rose-vertical-wedding-seating-charts/",
//   "https://www.apprinting.com/beautiful-doves-wedding-invitation/",
// ];

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
  await page.goto(
    `https://www.apprinting.com/half-fold-wedding-invitations/products/`,
    {
      timeout: 300000,
    }
  );
  const products = await page.$$eval(".product-box", (node) =>
    node.map((n) => n.className)
  );
  fs.appendFileSync(`list.txt`, products.toString() + "\n");
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
    const btnSave = await page.$("#btn-action-save");
    const title = await page.$("#products_title_1");
    const valueInput = await title.inputValue();
    const newTitle = titlesProducts[indexTitle];
    await title.fill(newTitle);
    await btnSave.click();
    await page.waitForTimeout(3000);
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
    await page.waitForTimeout(3000);
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
    const report = `{"@context":"https://schema.org/","@type":"Product","name":"${productNameValue}","description":"${productNameValue}. A high-quality product offered by AP PRINTING. Our design team ensures that every detail is perfect to meet our customers' needs.","sku":"${productSkuValue}","brand":{"@type":"Card","name":"Half Fold Wedding Invitations"},"review":{"@type":"Review","reviewRating":{"@type":"Rating","ratingValue":"4","bestRating":"5"},"author":{"@type":"Person","name":"AP PRINTING DESIGN TEAM"}},"aggregateRating":{"@type":"AggregateRating","ratingValue":"${(
      Math.random() * (5 - 4.1) +
      4.1
    ).toFixed(1)}","reviewCount":"${Math.floor(
      Math.random() * (1700 - 1300) + 1700
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
    let flag = false;
    const inputsTitle = await page.$$(".form-control.input-medium");
    for await (let input of inputsTitle) {
      const titleImage = await input.inputValue();
      if (titleImage == "") flag = true;
    }
    const report = `${id},`;
    if (flag == true) {
      fs.appendFileSync(`list.txt`, report + "\n");
      flag = false;
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
    const btnEdit = await page.$("#btn-action-edit");
    const pageHeader = await page.$(".page-header");
    const title = await pageHeader.$("small");
    const titleString = await title.innerText();
    const inputsTitle = await page.$$(".form-control.input-medium");
    for await (let input of inputsTitle) {
      await input.fill(titleString);
    }
    await btnEdit.click();
    await page.waitForTimeout(3000);
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
    const report = `"${product.title}",\n`;
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

const updatePrice = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await login(page);

  //FUNCTIONS GROUPS
  //filterDataListArray("Simple Flat 5x7"); // FUNCTION FILTER DATA LIST.JS
  //filtersDataListArray("Bilingual"); // FUNCTION FILTERS DATA LIST.JS
  //await inputFillToRow(page);
  //await inputFillToPrice(page);
  //await getIdProducts(page);
  //await categoryDefaultSelect(page);
  //await redirectionUrl(page);
  //await getChangedTitleProduct(page);
  //await getChangedTitleProductWithArray(page);
  //await getTitleTitleImagesGallery(page);
  //await getMarkUpSchemaProducts(page);
  await auditSeoData(page);
  //await changedSeoData(page);
  //await getTitleAndChangedTitleImagesGallery(page);
  //await getTitleProduct(page);
  //await getTitleFilterProduct(page, "Acrylic");
  //await getAssociatedCategoryProduct(page);
  //await addSetupProductPageDesigner(page);

  console.log("END");
  await browser.close();
};

updatePrice();
