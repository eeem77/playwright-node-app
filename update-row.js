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

//const idProducts = [3194, 3208];
//3202, 3204, 3205, 3207, 3211, 3215, 3224, 3228,
const idProducts = [1847, 1849, 1909, 1939, 1989, 3914, 2042, 2077];

const titlesProducts = [
  "CHASE-SQ-ECRU-AI [I-12] Pocket & Folder Invitation",
  "O2P-57-M-M Midnight Blue, Ice Silver Pocket & Folder Invitation",
  "PAL-BL-57-MMN Crystal, Bronze, Coral Pocket & Folder Invitation",
  "PSQ-77-MMM-2WL Botanic, Lime, Poison Ivory Pocket & Folder Invitation",
  "PSQ-77-MNM-EF-RD6 Gold, Fizz, Poison Ivory Pocket & Folder Invitation",
  "Paneled Heart [CC-35] Pocket & Folder Invitation",
  "PSQ-77-NNN-2WL Coral, Cotton Candy, Bubblegum Pocket & Folder Invitation",
  "PAL-57-MMM Sapphire, Mandarin, White Gold Pocket & Folder Invitation",
  "PSQ-77-MMM-2WL Silver, Mars, Poison Ivory Pocket & Folder Invitation",
  "Slider 57 MMN Onyx, Gold Linen, Natural Linen Pocket & Folder Invitation",
  "PSQ-77-MMM-2WL Fairway, Kunzite, Quartz Pocket & Folder Invitation",
  "PSQ-77-MMM-EF-RD6 Mars, Gold, Quartz Pocket & Folder Invitation",
  "CHASE-SQ-ECRU-DR2 [I-12] Pocket & Folder Invitation",
  "Happily Ever After [CC-15] Pocket & Folder Invitation",
  "Love Grows [CC-15] Pocket & Folder Invitation",
  "O2P-57-N-N Red, Natural, Gold Leaf Pocket & Folder Invitation",
  "PAL-57-MMM Ruby, Silver, Silk Pocket & Folder Invitation",
  "SLIDER-57-NMN Blue, Gold Linen, Natural Linen Pocket & Folder Invitation",
  "Wrapped in Gold [CC-65] Pocket & Folder Invitation",
  "Baroque Brilliance [CC-88] Pocket & Folder Invitation",
  "PAL-57-MMM Silver, Amethyst, Ice Silver Pocket & Folder Invitation",
  "SLIDER-66-NMM Black, Amethyst, Silk Pocket & Folder Invitation",
  "CTF-58-MMM Azalea, Gold, Quartz Pocket & Folder Invitation",
  "Joyful Details [CC-81] Pocket & Folder Invitation",
  "PAL-57-MMN Gold Leaf, Bronze, White Linen Pocket & Folder Invitation",
  "CTF-58-N-N Blue, White Pocket & Folder Invitation",
  "CTF-58-M-M Mars, Quartz Pocket & Folder Invitation",
  "PAL-BL-57-MMM Crystal, Azalea, White Gold Pocket & Folder Invitation",
  "CTF-68-N-N Red, Natural Pocket & Folder Invitation",
  "PAL-BL-57-MMM Crystal, Ionised, Crystal Pocket & Folder Invitation",
  "Monogram Flourish, Black Pocket, White Shimmer [CC-81] Pocket & Folder Invitation",
  "PAL-66-MMM Crystal, Ionised, Quartz Pocket & Folder Invitation",
  "Butterfly Wishes [CC-15] Pocket & Folder Invitation",
  "PAL-66-MMM Onyx, Flame, Quartz Pocket & Folder Invitation",
  "Leaf Swirl Seal & Send [CC-50] Pocket & Folder Invitation",
  "PAL-BL-57-MMM Jupiter, Ionised, Crystal Pocket & Folder Invitation",
  "Typography Inspiration [CC-75] Pocket & Folder Invitation",
  "Lovely Sophisticate [CC-20] Pocket & Folder Invitation",
  "Marriage Celebration Seal & Send [CC-30] Pocket & Folder Invitation",
  "PAL-66-MMM Quartz, Ruby, Gold Leaf Pocket & Folder Invitation",
  "PAL-66-MMM Quartz, Violette, Serpentine Pocket & Folder Invitation",
  "Traditional Grace [CC-02] Pocket & Folder Invitation",
  "Retro Typography Seal & Send [CC-30] Pocket & Folder Invitation",
  "Traditional Panel Grace [CC-02] Pocket & Folder Invitation",
  "Tropical Sunset [CC-15] Pocket & Folder Invitation",
  "PAL-66-MNN Amethyst, Purple, White Linen Pocket & Folder Invitation",
  "Simply Perfect Seal & Send [CC-04] Pocket & Folder Invitation",
  "Sophisticated Style Ecru Seal & Send [CC-20] Pocket & Folder Invitation",
  "PAL-66-NMM Dark Grey, Purple, Silk Pocket & Folder Invitation",
  "PAL-R-57-MMM-Band Azalea, Gold, Opal Pocket & Folder Invitation",
  "PAL-R-57-MMM Azalea, Ionised, Ice Silver Pocket & Folder Invitation",
  "PAL-R-57-MMM Rose Quartz, Azalea, Ice Silver Pocket & Folder Invitation",
  "PAL-V-57-MMM Gold, Red Lacquer, Ice Gold Pocket & Folder Invitation",
  "PAL-57-MNN-Overlay Serpentine, Salmon, Linen Pocket & Folder Invitation",
  "Bright Spirit [CC-70] Pocket & Folder Invitation",
  "Distinctive Dots [CC-70] Pocket & Folder Invitation",
  "Treasured Love [CC-65] Pocket & Folder Invitation",
  "6 1/4 Himalaya Avalanche White Felt Pocket & Folder Invitation",
  "6 1/4 Himalaya Warm White Felt Pocket & Folder Invitation",
  "A-7.5 Himalaya Beige Sand Metallic Pocket & Folder Invitation",
  "A-7.5 Himalaya Bronze Metallic Pocket & Folder Invitation",
  "A-7.5 Himalaya Chocolate Brown Solid Pocket & Folder Invitation",
  "A-7.5 Himalaya Classic Gray Linen Pocket & Folder Invitation",
  "A-7.5 Himalaya Classic Ivory Linen Pocket & Folder Invitation",
  "A-7.5 Himalaya Green Fairway Metallic Pocket & Folder Invitation",
  "A-7.5 Himalaya Kunzite Metallic Pocket & Folder Invitation",
  "A-7.5 Himalaya Red Pepper Linen Pocket & Folder Invitation",
  "A7 Atlas Classic Avalanche White Felt Pocket & Folder Invitation",
  "A7 Atlas Warm White Felt Pocket & Folder Invitation",
  "A7 Cascade Warm White Felt Pocket & Folder Invitation",
  "A7 Denali Warm White Felt Pocket",
  "A7 Himalaya Classic Avalanche White Felt Pocket & Folder Invitation",
  "A7 Himalaya Warm White Felt Pocket & Folder Invitation",
  "Aloe Mint Green Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Aloe Mint Green Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Antique Gold Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Antique Gold Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Antique Gold Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Antique Gold Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Aqua Lagoon Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Aqua Lagoon Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Aqua Lagoon Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Aqua Lagoon Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Aqua Lagoon Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Aqua Lagoon Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Aqua Lagoon Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Aqua Lagoon Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Banana Yellow Solid Pocket & Folder Invitation Card, A7 Denali",
  "Banana Yellow Solid Pocket & Folder Invitation Card, A7 Himalaya",
  'Banana Yellow Solid Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Beige Sand Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Beige Sand Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Beige Sand Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Beige Sand Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Beige Sand Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Beige Sand Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Black Solid Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Black Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Black Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Black Solid Pocket & Folder Invitation Card, A7 Denali",
  'Black Solid Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Blazer Blue Linen Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Blazer Blue Linen Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Blazer Blue Linen Pocket & Folder Invitation Card, A7 Atlas",
  "Blazer Blue Linen Pocket & Folder Invitation Card, A7 Cascade",
  "Blazer Blue Linen Pocket & Folder Invitation Card, A7 Himalaya",
  "Blazer Blue Solid Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Blazer Blue Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Blazer Blue Solid Pocket & Folder Invitation Card, A7 Atlas",
  "Blazer Blue Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Blazer Blue Solid Pocket & Folder Invitation Card, A7 Denali",
  "Blazer Blue Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Blue Vista Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Blue Vista Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Blueprint Blue Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Blueprint Blue Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Blueprint Blue Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Blueprint Blue Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Blueprint Blue Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Bright White 80 lb Linen Pocket & Folder Invitation Card, A2 Sierra",
  "Bright White Linen Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Bright White Linen Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Bright White Linen Pocket & Folder Invitation Card, A7 Atlas",
  "Bright White Linen Pocket & Folder Invitation Card, A7 Cascade",
  "Bright White Linen Pocket & Folder Invitation Card, A7 Denali",
  "Bright White Linen Pocket & Folder Invitation Card, A7 Himalaya",
  "Bronze Brown Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Bronze Brown Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Bronze Brown Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Bronze Brown Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Bronze Brown Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Bronze Brown Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Bronze Brown Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Bronze Brown Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Brown Spring Bloom on Classic White Solid, A7 Himalaya",
  "Brown Spring Bloom on Pearl White Metallic, A7 Himalaya",
  "Brown Embossed Wood Grain Pocket & Folder Invitation Card, A7 Himalaya",
  "Carmine Burgundy Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Carmine Burgundy Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Champagne Cream Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Champagne Cream Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Champagne Cream Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Champagne Cream Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Champagne Cream Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Champagne Cream Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Champagne Cream Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Champagne Cream Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Champagne Cream Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "CHASE-SQ-SH-HEART [I-12] Pocket & Folder Invitation",
  "Cherry Red Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Cherry Red Solid Pocket & Folder Invitation Card, A7 Atlas",
  "Cherry Red Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Cherry Red Solid Pocket & Folder Invitation Card, A7 Denali",
  "Cherry Red Solid Pocket & Folder Invitation Card, A7 Himalaya",
  'Cherry Red Solid Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Chocolate 100 lb Brown Solid Pocket & Folder Invitation Card, A2 Sierra",
  "Chocolate Brown Solid Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Chocolate Brown Solid Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Chocolate Brown Solid Pocket & Folder Invitation Card, A7 Atlas",
  "Chocolate Brown Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Chocolate Brown Solid Pocket & Folder Invitation Card, A7 Denali",
  "Chocolate Brown Solid Pocket & Folder Invitation Card, A7 Himalaya",
  'Chocolate Brown Solid Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Classic Gray Linen Pocket & Folder Invitation Card, A7 Atlas",
  "Classic Gray Linen Pocket & Folder Invitation Card, A7 Cascade",
  "Classic Gray Linen Pocket & Folder Invitation Card, A7 Himalaya",
  "Classic Ivory Linen Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Classic Ivory Linen Pocket & Folder Invitation Card, A7 Atlas",
  "Classic Ivory Linen Pocket & Folder Invitation Card, A7 Cascade",
  "Classic Ivory Linen Pocket & Folder Invitation Card, A7 Denali",
  "Classic Ivory Linen Pocket & Folder Invitation Card, A7 Himalaya",
  "Classic Natural Cream 100 lb Solid Pocket & Folder Invitation Card, A2 Sierra",
  "Classic Natural Cream Solid Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Classic Natural Cream Solid Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Classic Natural Cream Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Classic Natural Cream Solid Pocket & Folder Invitation Card, A7 Atlas",
  "Classic Natural Cream Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Classic Natural Cream Solid Pocket & Folder Invitation Card, A7 Denali",
  "Classic Natural Cream Solid Pocket & Folder Invitation Card, A7 Himalaya",
  'Classic Natural Cream Solid Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Classic White 100 lb Solid Pocket & Folder Invitation Card, A2 Sierra",
  "Classic White Solid Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Classic White Solid Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Classic White Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Classic White Solid Pocket & Folder Invitation Card, A7 Atlas",
  "Classic White Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Classic White Solid Pocket & Folder Invitation Card, A7 Denali",
  "Classic White Solid Pocket & Folder Invitation Card, A7 Himalaya",
  'Classic White Solid Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Concrete Gray Kraft 100 lb Raw Recycled Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Concrete Gray Kraft 100 lb Raw Recycled Pocket & Folder Invitation Card, A7 Atlas",
  "Concrete Gray Kraft 100 lb Raw Recycled Pocket & Folder Invitation Card, A7 Denali",
  "Concrete Gray Kraft 100 lb Raw Recycled Pocket & Folder Invitation Card, A7 Himalaya",
  'Concrete Gray Kraft 100 lb Raw Recycled Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Copper Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Copper Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Copper Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Copper Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Copper Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Cotton Candy Pink Solid Pocket & Folder Invitation Card, A7 Denali",
  "Cotton Candy Pink Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Crimson Red Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Crimson Red Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Crimson Red Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Crimson Red Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Crimson Red Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Crimson Red Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Crimson Red Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Crimson Red Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Dark Blue 107 lb Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Dark Blue Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Dark Blue Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Dark Blue Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Dark Blue Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Dark Blue Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Dark Blue Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Dark Blue Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Dark Brown Linen Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Dark Brown Linen Pocket & Folder Invitation Card, A7 Atlas",
  "Dark Brown Linen Pocket & Folder Invitation Card, A7 Cascade",
  "Dark Brown Linen Pocket & Folder Invitation Card, A7 Denali",
  "Dark Brown Linen Pocket & Folder Invitation Card, A7 Himalaya",
  "Dark Purple 80 lb Solid Pocket & Folder Invitation Card, A2 Sierra",
  "Dark Purple Solid Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Dark Purple Solid Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Dark Purple Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Dark Purple Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Dark Purple Solid Pocket & Folder Invitation Card, A7 Denali",
  'Dark Purple Solid Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Dusty Steel Blue Solid Pocket & Folder Invitation Card, A7 Atlas",
  "Dusty Steel Blue Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Electric Blue Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Epic Black Linen Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Epic Black Linen Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Epic Black Linen Pocket & Folder Invitation Card, A7 Cascade",
  "Epic Black Linen Pocket & Folder Invitation Card, A7 Denali",
  "Epic Black Linen Pocket & Folder Invitation Card, A7 Himalaya",
  "Forest Green Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Forest Green Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Gold Leaf 92 lb Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Gold Leaf Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Gold Leaf Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Gold Leaf Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Gold Leaf Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Gold Leaf Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Gold Leaf Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Gold Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Gold Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Gold Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Gold Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Gold Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Gold Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Gold Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Gold Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Gray Simple Swirl on Classic White Solid, A7 Himalaya",
  "Gray Smoke Solid Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Gray Smoke Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Gray Smoke Solid Pocket & Folder Invitation Card, A7 Atlas",
  "Gray Smoke Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Gray Smoke Solid Pocket & Folder Invitation Card, A7 Denali",
  "Gray Smoke Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Green Fairway Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Green Fairway Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Green Fairway Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Green Fairway Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Green Fairway Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Green Fairway Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Green Fairway Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Grey Fog Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Guardsman Red Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Iceberg Blue Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Jupiter Red Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Jupiter Red Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Jupiter Red Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Jupiter Red Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Jupiter Red Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Jupiter Red Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Kraft Brown 100 lb Raw Recycled Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Kraft Brown 100 lb Raw Recycled Pocket & Folder Invitation Card, A7 Atlas",
  "Kraft Brown 100 lb Raw Recycled Pocket & Folder Invitation Card, A7 Denali",
  "Kraft Brown 100 lb Raw Recycled Pocket & Folder Invitation Card, A7 Himalaya",
  "Kraft Brown Recycled Pocket & Folder Invitation Card 130 lb, A7 Cascade (Discontinued)",
  "Kraft Brown Recycled Pocket & Folder Invitation Card 65 lb, A7 Cascade (Discontinued)",
  "Kunzite Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Lavender Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Lavender Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Lavender Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Lavender Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Lavender Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Lemon Yellow Solid Pocket & Folder Invitation Card, A7 Denali",
  "Meadow Green Solid Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Meadow Green Solid Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Meadow Green Solid Pocket & Folder Invitation Card, A7 Atlas",
  "Meadow Green Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Meadow Green Solid Pocket & Folder Invitation Card, A7 Denali",
  "Meadow Green Solid Pocket & Folder Invitation Card, A7 Himalaya",
  'Meadow Green Solid Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Metallic Cream 84 lb Linen Pocket & Folder Invitation Card, A2 Sierra",
  "Metallic Cream Linen Pocket & Folder Invitation Card, 6 1/4 Himalaya Bilingual",
  "Metallic Cream Linen Pocket & Folder Invitation Card, A7 Atlas Bilingual",
  "Metallic Cream Linen Pocket & Folder Invitation Card, A7 Cascade Bilingual",
  "Metallic Cream Linen Pocket & Folder Invitation Card, A7 Denali Bilingual",
  "Metallic Cream Linen Pocket & Folder Invitation Card, A7 Himalaya Bilingual",
  "Metallic Gold 84 lb Linen Pocket & Folder Invitation Card, A2 Sierra Bilingual",
  "Metallic Gold Linen Pocket & Folder Invitation Card, A-7.5 Himalaya Bilingual",
  "Metallic Gold Linen Pocket & Folder Invitation Card, A7 Cascade Bilingual",
  "Metallic Gold Linen Pocket & Folder Invitation Card, A7 Denali Bilingual",
  "Metallic Gold Linen Pocket & Folder Invitation Card, A7 Himalaya Bilingual",
  "Metallic White 84 lb Linen Pocket & Folder Invitation Card, A2 Sierra Bilingual",
  "Metallic White Linen Pocket & Folder Invitation Card, 6 1/4 Himalaya Bilingual",
  "Metallic White Linen Pocket & Folder Invitation Card, A-7.5 Himalaya Bilingual",
  "Metallic White Linen Pocket & Folder Invitation Card, A7 Atlas Bilingual",
  "Metallic White Linen Pocket & Folder Invitation Card, A7 Cascade Bilingual",
  "Metallic White Linen Pocket & Folder Invitation Card, A7 Denali Bilingual",
  "Metallic White Linen Pocket & Folder Invitation Card, A7 Himalaya Bilingual",
  "Misty Rose Metallic Pocket & Folder Invitation Card, A7 Denali Bilingual",
  "Misty Rose Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Natural Cream 80 lb Linen Pocket & Folder Invitation Card, A2 Sierra",
  "Natural Cream Linen Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Natural Cream Linen Pocket & Folder Invitation Card, A7 Atlas",
  "Natural Cream Linen Pocket & Folder Invitation Card, A7 Cascade",
  "Natural Cream Linen Pocket & Folder Invitation Card, A7 Denali",
  "Natural Cream Linen Pocket & Folder Invitation Card, A7 Himalaya",
  "Old Rose Pink Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Old Rose Pink Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Onyx Black 107 lb Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Onyx Black Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Onyx Black Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Onyx Black Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Onyx Black Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Onyx Black Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Onyx Black Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Orange Flame Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Orchid Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "PAL-57-MMM Amethyst, Gold Leaf Pocket & Folder Invitation",
  "Pastel Blue Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Pastel Blue Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Pastel Pink Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Pastel Pink Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Peach (Coral) Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Peach (Coral) Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Peach (Coral) Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Peach (Coral) Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Peach (Coral) Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Peach (Coral) Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Peach (Coral) Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Peach (Coral) Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Pearl Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Pearl White Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Pearl White Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Pearl White Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Pearl White Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Pearl White Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Pearl White Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Pearl White Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Pearl White Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Pink Azalea 105 lb Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Pink Azalea Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Pink Azalea Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Pink Azalea Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Pink Azalea Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Pink Azalea Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Pink Azalea Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Purple Eggplant Solid Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Purple Eggplant Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Purple Eggplant Solid Pocket & Folder Invitation Card, A7 Denali",
  "Purple Eggplant Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Purple Punch Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Purple Punch Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Razzle Pink 100 lb Solid Pocket & Folder Invitation Card, A2 Sierra",
  "Razzle Pink Solid Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Razzle Pink Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Razzle Pink Solid Pocket & Folder Invitation Card, A7 Atlas",
  "Razzle Pink Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Razzle Pink Solid Pocket & Folder Invitation Card, A7 Denali",
  "Razzle Pink Solid Pocket & Folder Invitation Card, A7 Himalaya",
  'Razzle Pink Solid Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Red Pepper Linen Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Red Pepper Linen Pocket & Folder Invitation Card, A7 Atlas",
  "Red Pepper Linen Pocket & Folder Invitation Card, A7 Cascade",
  "Red Pepper Linen Pocket & Folder Invitation Card, A7 Denali",
  "Red Pepper Linen Pocket & Folder Invitation Card, A7 Himalaya",
  "Rose Gold Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Rose Gold Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Rose Pink Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Rose Pink Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Rose Pink Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Rose Pink Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Rose Pink Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Rosebud Pink Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Rosebud Pink Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "Ruby Purple 105 lb Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Ruby Purple Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Ruby Purple Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Ruby Purple Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Ruby Purple Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Ruby Purple Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Ruby Purple Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Ruby Purple Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Sand Specks Recycled Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Sand Specks Recycled Pocket & Folder Invitation Card, A7 Atlas",
  "Sand Specks Recycled Pocket & Folder Invitation Card, A7 Cascade",
  "Sand Specks Recycled Pocket & Folder Invitation Card, A7 Denali",
  "Sand Specks Recycled Pocket & Folder Invitation Card, A7 Himalaya",
  'Sand Specks Recycled Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Silver Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Silver Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Silver Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Silver Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Silver Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Silver Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Silver Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Silver Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Sky Blue Linen Pocket & Folder Invitation Card, A7 Atlas",
  "Sky Blue Linen Pocket & Folder Invitation Card, A7 Himalaya",
  "Sleeve Classic Avalanche White Felt Pocket & Folder Invitation",
  "Sleeve Warm White Felt Pocket & Folder Invitation",
  "Steel Gray 92 lb Metallic Pocket & Folder Invitation Card, A2 Sierra",
  "Steel Gray Metallic Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Steel Gray Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Steel Gray Metallic Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Steel Gray Metallic Pocket & Folder Invitation Card, A7 Atlas",
  "Steel Gray Metallic Pocket & Folder Invitation Card, A7 Cascade",
  "Steel Gray Metallic Pocket & Folder Invitation Card, A7 Denali",
  "Steel Gray Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  'Steel Gray Metallic Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Sunrise Yellow Metallic Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Sunrise Yellow Metallic Pocket & Folder Invitation Card, A7 Himalaya",
  "Taupe Brown Recycled Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Taupe Brown Recycled Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Taupe Brown Recycled Pocket & Folder Invitation Card, A7 Atlas",
  "Taupe Brown Recycled Pocket & Folder Invitation Card, A7 Cascade",
  "Taupe Brown Recycled Pocket & Folder Invitation Card, A7 Denali",
  "Taupe Brown Recycled Pocket & Folder Invitation Card, A7 Himalaya",
  'Taupe Brown Recycled Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Tiffany Blue Solid Pocket & Folder Invitation Card, 6 1/4 Denali",
  "Tiffany Blue Solid Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "Tiffany Blue Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Tiffany Blue Solid Pocket & Folder Invitation Card, A7 Atlas",
  "Tiffany Blue Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Tiffany Blue Solid Pocket & Folder Invitation Card, A7 Denali",
  "Tiffany Blue Solid Pocket & Folder Invitation Card, A7 Himalaya",
  'Tiffany Blue Solid Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Tindalo Brown Embossed Wood Grain Pocket & Folder Invitation Card, A7 Himalaya",
  "White Fiber Recycled Pocket & Folder Invitation Card, 6 1/4 Himalaya",
  "White Fiber Recycled Pocket & Folder Invitation Card, A7 Atlas",
  "White Fiber Recycled Pocket & Folder Invitation Card, A7 Cascade",
  "White Fiber Recycled Pocket & Folder Invitation Card, A7 Denali",
  "White Fiber Recycled Pocket & Folder Invitation Card, A7 Himalaya",
  'White Fiber Recycled Sleeve, 5" x 7" Pocket & Folder Invitation',
  "Wisteria Purple Solid Pocket & Folder Invitation Card, A-7.5 Himalaya",
  "Wisteria Purple Solid Pocket & Folder Invitation Card, A7 Cascade",
  "Wisteria Purple Solid Pocket & Folder Invitation Card, A7 Denali",
  "Wisteria Purple Solid Pocket & Folder Invitation Card, A7 Himalaya",
  "A7 Cascade Classic Avalanche White Felt Pocket & Folder Invitation",
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
  await page.goto(
    `https://www.apprinting.com/a7-cascade-pockets-wedding-invitation/products/`,
    {
      timeout: 300000,
    }
  );
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
    const report = `{"@context":"https://schema.org/","@type":"Product","name":"${productNameValue}","description":"${productNameValue}. A high-quality product offered by AP PRINTING. Our design team ensures that every detail is perfect to meet our customers' needs.","sku":"${productSkuValue}","brand":{"@type":"Card","name":"A7 Himalaya Pockets Wedding Invitation"},"review":{"@type":"Review","reviewRating":{"@type":"Rating","ratingValue":"4","bestRating":"5"},"author":{"@type":"Person","name":"AP PRINTING DESIGN TEAM"}},"aggregateRating":{"@type":"AggregateRating","ratingValue":"${(
      Math.random() * (5 - 4.1) +
      4.1
    ).toFixed(1)}","reviewCount":"${Math.floor(
      Math.random() * (1950 - 2500) + 1950
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
    //const report = `${product.id}\n`;
    //const report = `${product.title},\n`;
    const report = `'${product.title}',\n`;
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
  await getIdProducts(page);
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

  //await getTitleProduct(page);
  //filterDataListArray("Simple Flat 5x7"); // FUNCTION FILTER DATA LIST.JS
  //await getChangedTitleProductWithArray(page);
  //await getTitleAndChangedTitleImagesGallery(page);
  //await getTitleTitleImagesGallery(page);
  //await getMarkUpSchemaProducts(page);
  //await changedSeoData(page);
  //await auditSeoData(page);
  //await getStatusCheckboxes(page);

  //await getTitleFilterProduct(page, "Acrylic");
  //await getAssociatedCategoryProduct(page);
  //await addSetupProductPageDesigner(page);

  console.log("END");
  await browser.close();
};

updatePrice();
