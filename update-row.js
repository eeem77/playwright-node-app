import { chromium, firefox, webkit } from "playwright";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

import listPrice from "./listPrice.js";

const url = "https://www.apprinting.com/admin/";
const urlProductUpdatePrice =
  "https://www.apprinting.com/bilingual-wedding-invitations/products/#category_product_list";

const qtys = [250, 500, 1000, 2500, 5000, 10000, 15000, 20000, 25000];
const idProducts = [
  1653, 1657, 1667, 1669, 1673, 1674, 1676, 1680, 1682, 1690, 1692, 1694, 1696,
  1735, 1705, 1709, 1712, 1714, 1717, 1720, 1722, 1723, 1730, 1737, 1829, 3056,
  1833, 1852, 1853, 1855, 1857, 1861, 1884, 1886, 1889, 1892, 1897, 1899, 1902,
  1907, 1911, 1913, 1921, 1923, 1926, 1930, 1936, 1938, 1941, 1943, 1945, 1947,
  1949, 1950, 1954, 1956, 1958, 1960, 1961, 1963, 1964, 1970, 1971, 1973, 1974,
  1976, 1977, 1979, 1980, 1981, 1983, 1985, 1986, 1991, 1995, 1998, 2005, 2006,
  2009, 2013, 2017, 2019, 2023, 2031, 2035, 2040, 2118, 2060, 2106, 2110, 2115,
  2127, 2129, 2195, 2207, 2221, 2271, 2610, 2627, 2635, 2639, 2643, 2644, 2670,
  2679, 2680, 2681, 2682, 2683, 2696, 2697, 2305, 2315, 2318, 2334, 2337, 2341,
  2344, 2346, 2355, 2365, 2389, 2404, 2424, 2648, 2669, 2674, 2675, 2676, 2677,
  2678, 2694, 2695, 2698, 2701, 2700, 2722, 2723, 2724, 2725, 2726, 2727, 2728,
  2729, 2730, 2731, 2732, 2733, 2735, 2734, 2736, 2737, 2738, 2739, 2740, 2741,
  2704, 2705, 2707, 2710, 2711, 2716, 2719, 2720, 2742, 2746, 2747, 2748, 2751,
  2753, 2755, 2756, 2771, 2774, 2788, 2817, 2699, 2703, 2708, 2712, 2709, 2717,
  2721, 2743, 2749, 2757, 2744, 2772, 2752, 2776, 2777, 2778, 2781, 2779, 2783,
  2802, 2800, 2784, 2803, 2807, 2805, 2808, 2789, 2810, 2815, 2811, 2813, 2745,
  2750, 2754, 2773, 2801, 2804, 2806, 2809, 2812, 2830, 2814, 2834, 2836, 2838,
  2840, 2842, 2844, 2848, 2846, 2850, 2866, 2868, 2870, 2872, 3671, 3672, 3673,
  3674, 3675, 2816, 2831, 2833, 2835, 2837, 2839, 2841, 2843, 2845, 2847, 2849,
  2851, 2867, 2888, 2889, 2939, 3057, 3060, 3072, 3051, 3048, 3045, 3669, 3063,
  2980, 2983, 2989, 2992, 2995, 3001, 3004, 3007, 3010, 3013, 3041, 2935, 2948,
];
const urlsProducts = [
  "https://www.apprinting.com/minimalist-design-with-hamburger-13oz.-standard-vinyl-banner",
  "https://www.apprinting.com/elegant-and-simple-design-presentation-folders/",
  "https://www.apprinting.com/vibrant-orange-design-presentation-folders/",
  "https://www.apprinting.com/white-with-green-design-a-frame-sign/",
  "https://www.apprinting.com/pizzerias-design-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/teal-atoll-solid-pocket-invitation-card-a7-himalaya/",
  "https://www.apprinting.com/standard-business-cards-ddo/products/",
  "https://www.apprinting.com/black-solid-pocket-invitation-card-a7-atlas/",
  "https://www.apprinting.com/design-with-hot-dogs-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/postcards/",
  "https://www.apprinting.com/calendar/",
  "https://www.apprinting.com/design-coffee-cup-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/standard-postcards-3756/",
  "https://www.apprinting.com/pastel-blue-solid-pocket-invitation-card-a7-cascade/",
  "https://www.apprinting.com/blue-vertical-stripes-flyer",
  "https://www.apprinting.com/blue-vertical-stripes-flyer/",
  "https://www.apprinting.com/turquoise-with-paste-design-13oz.-standard-vinyl-banner",
  "https://www.apprinting.com/standard-postcards/",
  "https://www.apprinting.com/tacos-with-yellows-13oz.-standard-vinyl-banner",
  "https://www.apprinting.com/standard-postcards-3751/",
  "https://www.apprinting.com/invoice/",
  "https://www.apprinting.com/berkshire-degraded-purple-yard-sing/",
  "https://www.apprinting.com/chicken-design-with-vegetables-13oz.-standard-vinyl-banner",
  "https://www.apprinting.com/clasic-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/radiant-turquoise-and-black-mailing-post-card-direct-mail/",
  "https://www.apprinting.com/old-rose-pink-solid-pocket-invitation-card-a7-atlas/",
  "https://www.apprinting.com/silver-metallic-pocket-invitation-card-a7-cascade/",
  "https://www.apprinting.com/standard-business-cards-real-estate/products/",
  "https://www.apprinting.com/sky-with-photo-welcome-sign-4971/",
  "https://www.apprinting.com/labels-1644/",
  "https://www.apprinting.com/simple-black-design-presentation-folders/",
  "https://www.apprinting.com/realtor-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/minimalist-design-with-hamburger-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/two-simple-colors-business-cards/",
  "https://www.apprinting.com/marketing-materials/products/",
  "https://www.apprinting.com/turquoise-with-paste-design-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/azure-blue-solid-pocket-invitation-card-a7-cascade/",
  "https://www.apprinting.com/hamburger-promotion-a-frame-sign/",
  "https://www.apprinting.com/design-smoothie-and-donuts.-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/gold-and-black-wedding-seating-charts/",
  "https://www.apprinting.com/minimalist-green-design-flyer/",
  "https://www.apprinting.com/burger-in-black-13oz.-standard-vinyl-banner",
  "https://www.apprinting.com/landscaping-contractors",
  "https://www.apprinting.com/standard-postcards-3748/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-giuliana-2851/",
  "https://www.apprinting.com/beautiful-olive-green-business-cards",
  "https://www.apprinting.com/2024-calendar/products/",
  "https://www.apprinting.com/mailing-post-card-eddm-template/",
  "https://www.apprinting.com/special-breakfast-deal-a-frame-sign/",
  "https://www.apprinting.com/standard-postcards-3757",
  "https://www.apprinting.com/standard-postcards-3757/",
  "https://www.apprinting.com/new-house-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/chicken-design-with-vegetables-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/tacos-with-yellows-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/modern-lilac-flyer/",
  "https://www.apprinting.com/car-silhouette-business-cards/",
  "https://www.apprinting.com/azure-blue-solid-pocket-invitation-card-a7-atlas/",
  "https://www.apprinting.com/detailed-brown-design-business-cards/",
  "https://www.apprinting.com/turquoise-collage-flyer/",
  "https://www.apprinting.com/banners-restaurant-template/",
  "https://www.apprinting.com/carbonless-forms-8.5x11/",
  "https://www.apprinting.com/modern-red-lines-mailing-post-card-eddm/",
  "https://www.apprinting.com/beautiful-beige-house-mailing-post-card-direct-mail/",
  "https://www.apprinting.com/modern-design-flyer/",
  "https://www.apprinting.com/photo-collage-mailing-post-card-direct-mail/",
  "https://www.apprinting.com/beautiful-olive-green-business-cards/",
  "https://www.apprinting.com/invitation-bright-pink-wedding-invitation/",
  "https://www.apprinting.com/painted-edge-business-cards-restaurant-template/",
  "https://www.apprinting.com/standard-postcards",
  "https://www.apprinting.com/business-cards-furniture",
  "https://www.apprinting.com/blue-minimalist-paintings-presentation-folders",
  "https://www.apprinting.com/door-hangers-2/",
  "https://www.apprinting.com/burger-in-black-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/blue-minimalist-paintings-presentation-folders/",
  "https://www.apprinting.com/pastel-pink-solid-pocket-invitation-card-a7-atlas/",
  "https://www.apprinting.com/elegant-gray-mailing-post-card-eddm/",
  "https://www.apprinting.com/minimalist-accompanied-by-houses-mailing-post-card-direct-mail/",
  "https://www.apprinting.com/p4842//product_info.html",
  "https://www.apprinting.com/berkshire-combination-of-purple-a-frame-sign-24x24-4651/",
  "https://www.apprinting.com/presentation-folders-template/",
  "https://www.apprinting.com/creative-pizza-design-business-cards/",
  "https://www.apprinting.com/dental-care-mail-post-card/",
  "https://www.apprinting.com/balck-and-white-posters/",
  "https://www.apprinting.com/business-flyers-real-state/",
  "https://www.apprinting.com/gold-metallic-pocket-invitation-card-a7-atlas/",
  "https://www.apprinting.com/exit-realty-blue-waves-a-frame-sign-24x24/",
  "https://www.apprinting.com/turquoise-curved-design-presentation-folders/",
  "https://www.apprinting.com/mailing-post-card-eddm-template",
  "https://www.apprinting.com/brochure-triptych/",
  "https://www.apprinting.com/traditional-wedding-entourage-in-gold-foil-wedding-invitation/",
  "https://www.apprinting.com/turquoise-and-salmon-flyer/",
  "https://www.apprinting.com/mailing-post-card-direct-mail-template/",
  "https://www.apprinting.com/simple-pizza-design-13oz.-standard-vinyl-banner",
  "https://www.apprinting.com/white-with-green-design-a-frame-sign",
  "https://www.apprinting.com/pizza-on-board-13oz.-standard-vinyl-banner",
  "https://www.apprinting.com/painted-edge-business-cards-restaurant-template",
  "https://www.apprinting.com/cheerful-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/mexican-food-a-frame-sign/",
  "https://www.apprinting.com/wedding-dress-and-suit-wedding-invitation/",
  "https://www.apprinting.com/exp-realty-sophisticated-design-with-photo-metal-sidewalk-a-frame-4598/",
  "https://www.apprinting.com/turquoise-curved-design-presentation-folders",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-3052/",
  "https://www.apprinting.com/white-roses-arrangement-wedding-invitation-3673/",
  "https://www.apprinting.com/mailing-post-card-direct-mail-template-4515/",
  "https://www.apprinting.com/dark-blue-real-estate-custom-yard-signs",
  "https://www.apprinting.com/real-estate-business-cards/",
  "https://www.apprinting.com/real-estates-business-cards/",
  "https://www.apprinting.com/onyx-black-metallic-pocket-invitation-card-a7-denali/",
  "https://www.apprinting.com/modern-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/real-estate-with-blue-a-frame-sign/",
  "https://www.apprinting.com/a-frame-real-estate-template/",
  "https://www.apprinting.com/new-house-real-estate-custom-yard-signs",
  "https://www.apprinting.com/light-blue-gradient-presentation-folders/",
  "https://www.apprinting.com/torn-effect-for-pizza-business-cards/",
  "https://www.apprinting.com/light-green-design-business-cards/",
  "https://www.apprinting.com/blush-shimmer-laser-cut-with-glittery-border-wedding-invitation/",
  "https://www.apprinting.com/pizza-on-board-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/blue-minimalist-design-business-cards/",
  "https://www.apprinting.com/modern-dark-design-business-cards/",
  "https://www.apprinting.com/blue-geometric-design-presentation-folders/",
  "https://www.apprinting.com/dream-house-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/standard-business-cards-restaurant-template/",
  "https://www.apprinting.com/dusty-steel-blue-solid-pocket-invitation-card-a7-cascade/",
  "https://www.apprinting.com/simple-sushi-design-business-cards/",
  "https://www.apprinting.com/elegant-gray-and-black-presentation-folders/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-3076/",
  "https://www.apprinting.com/port-wine-solid-pocket-invitation-card-a7-cascade/",
  "https://www.apprinting.com/vintage-celestial-sky-wedding-invitation/",
  "https://www.apprinting.com/productlist_category_wise.html",
  "https://www.apprinting.com/ice-cream-shop-a-frame-sign/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-2874/",
  "https://www.apprinting.com/interesting-design-for-cafeteria-business-cards/",
  "https://www.apprinting.com/home-promotion-poster-4223/",
  "https://www.apprinting.com/milkshake-offer-a-frame-sign/",
  "https://www.apprinting.com/great-hamburger-offer-a-frame-sign/",
  "https://www.apprinting.com/bakery-a-frame-sign/",
  "https://www.apprinting.com/real-state-yellow-a-frame-sign/",
  "https://www.apprinting.com/colored-green-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/dark-blue-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/barbecue-offers-a-frame-sign/",
  "https://www.apprinting.com/real-state-blue-and-red-a-frame-sign/",
  "https://www.apprinting.com/standard-business-cards-3752/",
  "https://www.apprinting.com/colorful-warm-circles-business-cards/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-3067/",
  "https://www.apprinting.com/real-state-gray-a-frame-sign/",
  "https://www.apprinting.com/geometric-diagonal-design-presentation-folders/",
  "https://www.apprinting.com/leaves-gold-frames-wedding-invitation/",
  "https://www.apprinting.com/brown-design-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/minimalist-real-estate-a-frame-sign/",
  "https://www.apprinting.com/vibrant-gradient-colors-presentation-folders/",
  "https://www.apprinting.com/italian-food-a-frame-sign/",
  "https://www.apprinting.com/green-real-estate-a-frame-sign/",
  "https://www.apprinting.com/blue-yellow-letters-seating-charts-3408/",
  "https://www.apprinting.com/-9-envelopes/",
  "https://www.apprinting.com/house-in-hand-real-estate-a-frame-sign/",
  "https://www.apprinting.com/red-and-blue-design-a-frame-sign/",
  "https://www.apprinting.com/beautiful-dark-blue-presentation-folders/",
  "https://www.apprinting.com/coffee-shop-a-frame-sign/",
  "https://www.apprinting.com/pizza-special-offer-a-frame-sign/",
  "https://www.apprinting.com/geometric-blue-gradation-presentation-folders/",
  "https://www.apprinting.com/sales-agent-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/real-estate-with-black-a-frame-sign/",
  "https://www.apprinting.com/minimalist-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/classic-minimalist-seating-charts/",
  "https://www.apprinting.com/imagine-850-retractable-banner-stand//1000",
  "https://www.apprinting.com/open-house-real-estate-custom-yard-signs/",
  "https://www.apprinting.com/custom-yard-signs/",
  "https://www.apprinting.com/torn-effect-for-pizza-business-cards",
  "https://www.apprinting.com/simple-design-with-food-business-cards/",
  "https://www.apprinting.com/modern-dark-design-business-cards",
  "https://www.apprinting.com/minimalist-black-and-white-seating-chart//1000",
  "https://www.apprinting.com/simple-pizza-design-13oz.-standard-vinyl-banner/",
  "https://www.apprinting.com/bakery-a-frame-sign",
  "https://www.apprinting.com/elegant-vinotint-design-a-frame-sign/",
  "https://www.apprinting.com/black-and-white-pizzaria-standard-business-cards/",
  "https://www.apprinting.com/metallic-cream-linen-pocket-invitation-card-a-7.5-himalaya/",
  "https://www.apprinting.com/dream-house-real-estate-custom-yard-signs",
  "https://www.apprinting.com/yard-sign-real-estate-template/",
  "https://www.apprinting.com/earth-tones-pocket-wedding-invitation/",
  "https://www.apprinting.com/gold-leaf-metallic-pocket-invitation-card-a7-denali/",
  "https://www.apprinting.com/grey-fog-solid-pocket-invitation-card-a7-atlas/",
  "https://www.apprinting.com/standard-business-cards-4033/",
  "https://www.apprinting.com/minimalist-real-estate-custom-yard-signs",
  "https://www.apprinting.com/7x7-gate-fold-wedding-invitation-template-3353/",
  "https://www.apprinting.com/custom-yard-signs",
  "https://www.apprinting.com/geometric-diagonal-design-presentation-folders",
  "https://www.apprinting.com/open-house-real-estate-custom-yard-signs",
  "https://www.apprinting.com/real-estate-business-cards",
  "https://www.apprinting.com/floral-and-colorful-wedding-invitation/",
  "https://www.apprinting.com/purple-circles-brochure-4068/",
  "https://www.apprinting.com/purple-circles-brochure-4066/",
  "https://www.apprinting.com/baltic-sea-blue-solid-pocket-invitation-card-a7-denali/",
  "https://www.apprinting.com/banners-restaurant-template-4300/",
  "https://www.apprinting.com/teal-atoll-solid-pocket-invitation-card-a7-denali/",
  "https://www.apprinting.com/13oz.-standard-vinyl-banner-3728/",
  "https://www.apprinting.com/13oz.-standard-vinyl-banner-3727/",
  "https://www.apprinting.com/13oz.-standard-vinyl-banner-3726/",
  "https://www.apprinting.com/13oz.-standard-vinyl-banner-3722/",
  "https://www.apprinting.com/door-hangers-2",
  "https://www.apprinting.com/13oz.-standard-vinyl-banner-3725/",
  "https://www.apprinting.com/summer/products/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-giuliana-2871/",
  "https://www.apprinting.com/corner-with-cherry-tree-wedding-invitation/",
  "https://www.apprinting.com/frame-purple-with-flowers-wedding-invitation/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-2893/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-giuliana-2867/",
  "https://www.apprinting.com/chic-blue-dog-calendar/",
  "https://www.apprinting.com/neon-electronic-party-calendar/",
  "https://www.apprinting.com/standard-postcards-3755/",
  "https://www.apprinting.com/leaves-and-garden-party-pocket-wedding-invitation/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-giuliana-2873/",
  "https://www.apprinting.com/13oz.-standard-vinyl-banner-3724/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-2819/",
  "https://www.apprinting.com/vintage-mountains/products/",
  "https://www.apprinting.com/guardsman-red-solid-pocket-invitation-card-a7-cascade/",
  "https://www.apprinting.com/natural-cream-linen-pocket-invitation-card-a-7.5-himalaya/",
  "https://www.apprinting.com/teal-atoll-solid-pocket-invitation-card-a7-cascade/",
  "https://www.apprinting.com/white-and-red-flowers-wedding-invitation/",
  "https://www.apprinting.com/watercolor-hand-drawn-wedding-invitation/",
  "https://www.apprinting.com/minimalist-black-and-white-seating-charts-1985/",
  "https://www.apprinting.com/boho-brown-branches-wedding-invitation/",
  "https://www.apprinting.com/elegant-tropical-ticket-wedding-invitation-eduardo/",
  "https://www.apprinting.com/brochure-letterhead/",
  "https://www.apprinting.com/baltic-sea-blue-solid-pocket-invitation-card-a7-himalaya/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-2892/",
  "https://www.apprinting.com/sequoia-green-solid-pocket-invitation-card-a7-himalaya/",
  "https://www.apprinting.com/togo-menus/",
  "https://www.apprinting.com/prune-purple-solid-pocket-invitation-card-a7-himalaya/",
  "https://www.apprinting.com/watercolor-celestial-wedding-invitation/",
  "https://www.apprinting.com/half-fold-wedding-invitation/products/",
  "https://www.apprinting.com/tropical-leaves-wedding-invitation-3071/",
  "https://www.apprinting.com/teal-atoll-solid-pocket-invitation-card-a7-atlas/",
  "https://www.apprinting.com/gold-and-black-wedding-seating-charts",
  "https://www.apprinting.com/royal-blue-solid-pocket-invitation-card-a7-himalaya/",
  "https://www.apprinting.com/standard-postcards-3749/",
  "https://www.apprinting.com/hand-drawn-newlywed-wedding-invitation/",
  "https://www.apprinting.com/guardsman-red-solid-pocket-invitation-card-a7-himalaya/",
  "https://www.apprinting.com/boho-with-feathers-wedding-invitation/",
  "https://www.apprinting.com/violet-leaves-wedding-invitation/",
  "https://www.apprinting.com/moon-in-the-city-wedding-invitation/",
  "https://www.apprinting.com/golden-circle-with-flowers-wedding-invitation/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-fiorela-3068/",
  "https://www.apprinting.com/azure-blue-solid-pocket-invitation-card-a7-denali/",
  "https://www.apprinting.com/beautiful-aquatic-flower-simple-flat-wedding-invitation/",
  "https://www.apprinting.com/gray-leaves-pocket-wedding-invitation-2600/",
  "https://www.apprinting.com/boarding-pass-wedding-invitation-template-eduardo-2761/",
  "https://www.apprinting.com/help/",
  "https://www.apprinting.com/dark-blue-metallic-pocket-invitation-card-a7-atlas/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-2922/",
  "https://www.apprinting.com/standard-postcards-3758/",
  "https://www.apprinting.com/13oz.-standard-vinyl-banner-3729/",
  "https://www.apprinting.com/standard-postcards-3764/",
  "https://www.apprinting.com/wheat-leaves-wedding-invitation/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-2890/",
  "https://www.apprinting.com/brochure-triptych-lawyers/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-2885/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-2898/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-eduardo-2895/",
  "https://www.apprinting.com/simple-flat-wedding-invitation-template-miguel-2877/",
  "https://www.apprinting.com/watercolor-rose-vertical-wedding-seating-charts/",
  "https://www.apprinting.com/beautiful-doves-wedding-invitation/",
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
    //await page.waitForTimeout(2000);
    const btnCategory = await page.$('[data-id="category_id_1"]');
    await btnCategory.click();
    await page.waitForTimeout(3000);
    const btnCategorySelect = await page.$("#bs-select-2-115");
    await btnCategorySelect.click();
    await page.waitForTimeout(3000);
    const btnSave = await page.$("#btn-action-save");
    await btnSave.click();
    await page.waitForTimeout(3000);
    console.log("Working ---> ", id);
  }
};

const getidProducts = async (page) => {
  await page.goto(
    `https://www.apprinting.com/simple-flat-5x7-wedding-invitations/products/`,
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

const getTitleProduct = async (page) => {
  for await (let id of idProducts) {
    await page.goto(
      `https://www.apprinting.com/admin/product_action.php?product_id=${id}`,
      { timeout: 300000 }
    );
    const btnSave = await page.$("#btn-action-save");
    const title = await page.$("#products_title_1");
    const valueInput = await title.inputValue();
    const newTitle = await valueInput.replace("Wedding Invitation", "");
    const newTitleTwo = await newTitle.replace("Simple Flat", "");
    const newTitleThree = await newTitleTwo.replace("Simple Flat 5x7", "");
    const newTitleFinal = (await newTitleThree) + "Simple Flat 5x7";
    await title.fill(newTitleFinal);
    await btnSave.click();
    await page.waitForTimeout(3000);
    console.log("Working ---> ", id, " ------> ", newTitleFinal);
    //console.log(newTitle);
  }
};

const updatePrice = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await login(page);
  //await inputFillToRow(page);
  //await inputFillToPrice(page);
  //await getidProducts(page);
  //await categoryDefaultSelect(page);
  //await redirectionUrl(page);
  await getTitleProduct(page);

  console.log("END");
  await browser.close();
};

updatePrice();
