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
// const idProducts = [
  
// ];
// const idProducts = [
//   1653, 1657, 1667, 1669, 1673, 1674, 1676, 1680, 1682, 1690, 1692, 1694, 1696,
//   1735, 1705, 1709, 1712, 1714, 1717, 1720, 1722, 1723, 1730, 1737, 1829, 3056,
//   1833, 1852, 1853, 1855, 1857, 1861, 1884, 1886, 1889, 1892, 1897, 1899, 1902,
//   1907, 1911, 1913, 1921, 1923, 1926, 1930, 1936, 1938, 1941, 1943, 1945, 1947,
//   1949, 1950, 1954, 1956, 1958, 1960, 1961, 1963, 1964, 1970, 1971, 1973, 1974,
//   1976, 1977, 1979, 1980, 1981, 1983, 1985, 1986, 1991, 1995, 1998, 2005, 2006,
//   2009, 2013, 2017, 2019, 2023, 2031, 2035, 2040, 2118, 2060, 2106, 2110, 2115,
//   2127, 2129, 2195, 2207, 2221, 2271, 2610, 2627, 2635, 2639, 2643, 2644, 2670,
//   2679, 2680, 2681, 2682, 2683, 2696, 2697, 2305, 2315, 2318, 2334, 2337, 2341,
//   2344, 2346, 2355, 2365, 2389, 2404, 2424, 2648, 2669, 2674, 2675, 2676, 2677,
//   2678, 2694, 2695, 2698, 2701, 2700, 2722, 2723, 2724, 2725, 2726, 2727, 2728,
//   2729, 2730, 2731, 2732, 2733, 2735, 2734, 2736, 2737, 2738, 2739, 2740, 2741,
//   2704, 2705, 2707, 2710, 2711, 2716, 2719, 2720, 2742, 2746, 2747, 2748, 2751,
//   2753, 2755, 2756, 2771, 2774, 2788, 2817, 2699, 2703, 2708, 2712, 2709, 2717,
//   2721, 2743, 2749, 2757, 2744, 2772, 2752, 2776, 2777, 2778, 2781, 2779, 2783,
//   2802, 2800, 2784, 2803, 2807, 2805, 2808, 2789, 2810, 2815, 2811, 2813, 2745,
//   2750, 2754, 2773, 2801, 2804, 2806, 2809, 2812, 2935, 2948,
// ];
const idProducts = [
  800, 801, 606, 611, 620, 626, 885, 731, 3172, 901, 898, 903, 1775, 1654, 1791,
  3363, 1685, 3174, 1708, 1790, 906, 908, 910, 911, 914, 1779, 3175, 1689, 1655,
  1793, 1792, 1743, 1652, 3364, 916, 918, 920, 921, 925, 927, 1651, 3176, 1796,
  1656, 2183, 3365, 1795, 1782, 931, 932, 933, 935, 936, 937, 938, 939, 1701,
  3180, 940, 1747, 3366, 3685, 1794, 1797, 947, 948, 950, 951, 952, 3181, 3367,
  1802, 1748, 1800, 1668, 3670, 953, 3368, 3182, 1801, 1816, 1807, 1753, 1670,
  1713, 1671, 1821, 1813, 3369, 3184, 1756, 1718, 1803, 3185, 1672, 1727, 1823,
  1759, 1760, 1806, 3370, 1815, 1817, 1728, 3187, 1675, 1808, 1825, 1762, 3372,
  1765, 1811, 1826, 1677, 1769, 3189, 3375, 1818, 1732, 1819, 1812, 3190, 1767,
  1827, 1678, 1788, 3384, 1738, 1828, 1820, 1772, 1789, 3378, 1777, 1814, 3193,
  1679, 1740, 2211, 2000, 3194, 2269, 2146, 1742, 1988, 1681, 3406, 3411, 1822,
  3195, 1992, 1683, 2270, 2213, 2004, 3418, 2273, 2214, 1824, 2016, 1684, 2179,
  1994, 3196, 2001, 3420, 3197, 1830, 2276, 1686, 2021, 2216, 3198, 2218, 2008,
  1688, 2293, 2029, 2184, 3434, 2012, 3477, 2047, 2294, 2246, 2186, 1691, 3208,
  2295, 2248, 3534, 2398, 1842, 2187, 2014, 1693, 2185, 3210, 2251, 2296, 3539,
  1695, 2072, 3213, 3322, 2075, 3548, 3214, 1697, 2298, 3555, 1721, 2299, 2190,
  2304, 3216, 2083, 3217, 3583, 2262, 2088, 1724, 3588, 2192, 3097, 2307, 3221,
  2431, 3591, 3222, 1729, 3225, 2333, 1731, 3600, 3606, 3230, 1734, 2197, 2054,
  3244, 1736, 3612, 1928, 1739, 2353, 3247, 3707, 3621, 3251, 1719, 3622, 3252,
  1741, 2203, 3255, 1835, 3581, 3628, 3258, 1838, 1839, 3260, 2414, 3630, 2205,
  1840, 1953, 2472, 3263, 3637, 3641, 1841, 2208, 3264, 2483, 3267, 3644, 2506,
  3645, 1844, 3271, 3648, 3275, 1846, 3281, 1848, 3652, 3284, 3658, 1850, 2117,
  1851, 1969, 3633, 3287, 2439, 3631, 3289, 1854, 2441, 3291, 1856, 2260, 2264,
  3626, 3295, 1858, 3620, 3296, 1859, 2268, 3298, 1860, 3608, 2567, 3300, 3602,
  1862, 2140, 1863, 3302, 3709, 1864, 2590, 1865, 1866, 2460, 2286, 1867, 2241,
  2508, 2602, 1868, 3687, 2603, 1871, 1872, 2605, 1873, 2056, 2594, 1874, 2561,
  2300, 2256, 1875, 2665, 2647, 2566, 1876, 2308, 2673, 2167, 3915, 2078, 1877,
  2713, 1879, 2689, 1881, 2084, 1883, 1885, 2702, 1887, 1888, 1890, 1898, 1901,
  1904, 1905, 1908, 3684, 1912, 1914, 1915, 1918, 1925, 1927, 1929, 1934, 1937,
  1940, 2722, 2723, 2724, 2725, 2726, 2727, 2728, 2729, 2730, 2731, 2948,
];

const titlesProducts = [
  "Blue Flowers and Leaves  Simple Flat 5x7 Wedding Invitation",
  "Tropical Leaves  Simple Flat 5x7 Wedding Invitation",
  "Pink Flowers Simple Flat 5x7 Wedding Invitation",
  "Watercolor Blue Roses Simple Flat 5x7 Wedding Invitation",
  "Inspirational Pink Flowers Simple Flat 5x7 Wedding Invitation",
  "Blue Flowers Simple Flat 5x7 Wedding Invitation",
  "Coffee Stained Flowers Simple Flat 5x7 Wedding Invitation",
  "Burgundy Leaves Simple Flat 5x7 Wedding Invitation",
  "Multicolored Rose Bouquet Simple Flat 5x7 Wedding Invitation",
  "Blue and Gold Leaves Simple Flat 5x7 Wedding Invitation",
  "Warm Fall Flowers Simple Flat 5x7 Wedding Invitation",
  "Botanical Yellow Flowers Simple Flat 5x7 Wedding Invitation",
  "Abstract Golden Waves Simple Flat 5x7 Wedding Invitation",
  "Pastel Green Flowers Simple Flat 5x7 Wedding Invitation",
  "Deep Blue Watercolor Simple Flat 5x7 Wedding Invitation",
  "Bright Spring Floral Simple Flat 5x7 Wedding Invitation",
  "Gentle Pink Bouquet Simple Flat 5x7 Wedding Invitation",
  "Floral Soft Pink Simple Flat 5x7 Wedding Invitation",
  "Dusty Roses Delicate Simple Flat 5x7 Wedding Invitation",
  "Pastel Watercolor  Simple Flat 5x7 Wedding Invitation",
  "Pink Spring Flowers Simple Flat 5x7 Wedding Invitation",
  "Peach Flowers Simple Flat 5x7 Wedding Invitation",
  "Rustic Floral Simple Flat 5x7 Wedding Invitation",
  "Simple Large Cursive Simple Flat 5x7 Wedding Invitation",
  "Elegant Green Leaves Simple Flat 5x7 Wedding Invitation",
  "Elegant Brown Leaves Simple Flat 5x7 Wedding Invitation",
  "Pink Paint Strokes Simple Flat 5x7 Wedding Invitation",
  "Ashen Gray Flowers Simple Flat 5x7 Wedding Invitation",
  "Handmade Flower Set Simple Flat 5x7 Wedding Invitation",
  "Handmade Flower Silhouettes Simple Flat 5x7 Wedding Invitation",
  "Soft Leaf Border Simple Flat 5x7 Wedding Invitation",
  "Teal Watercolor Simple Flat 5x7 Wedding Invitation",
  "Elegant Leaves Simple Flat 5x7 Wedding Invitation",
  "Showy Spring Flowers Simple Flat 5x7 Wedding Invitation",
  "Green and Gray Leaves Simple Flat 5x7 Wedding Invitation",
  "Explosive Watercolor Simple Flat 5x7 Wedding Invitation",
  "Fuchsia Lines Simple Flat 5x7 Wedding Invitation",
  "Green and Roses Simple Flat 5x7 Wedding Invitation",
  "Luxury Indian Frames Simple Flat 5x7 Wedding Invitation",
  "Gold Plated Leaves Simple Flat 5x7 Wedding Invitation",
  "Bright Flowers Simple Flat 5x7 Wedding Invitation",
  "Sparkling Blue Watercolor Simple Flat 5x7 Wedding Invitation",
  "Luxurious Gold Simple Flat 5x7 Wedding Invitation",
  "Gold Frames Simple Flat 5x7 Wedding Invitation",
  "Cloudy Blue Simple Flat 5x7 Wedding Invitation",
  "Golden Flowers Simple Flat 5x7 Wedding Invitation",
  "Simplicity and Elegance Simple Flat 5x7 Wedding Invitation",
  "Golden Frame and Leaves Simple Flat 5x7 Wedding Invitation",
  "Aztec Design Simple Flat 5x7 Wedding Invitation",
  "Elegant Frames Simple Flat 5x7 Wedding Invitation",
  "Golden Corner Flowers Simple Flat 5x7 Wedding Invitation",
  "Rustic Green Leaves Simple Flat 5x7 Wedding Invitation",
  "Golden Leaves Simple Flat 5x7 Wedding Invitation",
  "Vintage Golden Flowers Simple Flat 5x7 Wedding Invitation",
  "Classic Simple Flat 5x7 Wedding Invitation",
  "Blue and Gold Watercolor Simple Flat 5x7 Wedding Invitation",
  "Simple Flowers Gray Simple Flat 5x7 Wedding Invitation",
  "Blue Golden Flowers Simple Flat 5x7 Wedding Invitation",
  "Minimalist Class Simple Flat 5x7 Wedding Invitation",
  "Vintage Geometric Flowers Simple Flat 5x7 Wedding Invitation",
  "Elegant Golden Frame Simple Flat 5x7 Wedding Invitation",
  "Golden Mandala Simple Flat 5x7 Wedding Invitation",
  "Green Tropical Leaves Simple Flat 5x7 Wedding Invitation",
  "Dark Teal Frame Simple Flat 5x7 Wedding Invitation",
  "Elegant Blue Flowers Simple Flat 5x7 Wedding Invitation",
  "Gold Streaked Sandy Simple Flat 5x7 Wedding Invitation",
  "Copper Stroke Simple Flat 5x7 Wedding Invitation",
  "Gold Trim Simple Flat 5x7 Wedding Invitation",
  "Diffused Blue Droplets Simple Flat 5x7 Wedding Invitation",
  "Blue Purple Brushes Simple Flat 5x7 Wedding Invitation",
  "Glittering Desert Simple Flat 5x7 Wedding Invitation",
  "Pink and Fuchsia  Simple Flat 5x7 Wedding Invitation",
  "Golden Elegance Simple Flat 5x7 Wedding Invitation",
  "Noisy Grays  Simple Flat 5x7 Wedding Invitation",
  "Faint Green Ombre Simple Flat 5x7 Wedding Invitation",
  "Pink and Gray Marble Simple Flat 5x7 Wedding Invitation",
  "Deep Fose Tint Simple Flat 5x7 Wedding Invitation",
  "Splash of Blush Simple Flat 5x7 Wedding Invitation",
  "Abstract Blue Paint Simple Flat 5x7 Wedding Invitation",
  "Simple Red Flowers Simple Flat 5x7 Wedding Invitation",
  "Refined Black Floral Simple Flat 5x7 Wedding Invitation",
  "Watercolor Sea Water Simple Flat 5x7 Wedding Invitation",
  "Watercolor Earth Tones Simple Flat 5x7 Wedding Invitation",
  "Green Watercolor Simple Flat 5x7 Wedding Invitation",
  "Simple Pink Simple Flat 5x7 Wedding Invitation",
  "Golden Leaves Simple Flat 5x7 Wedding Invitation",
  "Classic Gold Edge Simple Flat 5x7 Wedding Invitation",
  "White Cherry Blossoms Simple Flat 5x7 Wedding Invitation",
  "Pink and Red Flowers Simple Flat 5x7 Wedding Invitation",
  "Golden Chinese Lamps Simple Flat 5x7 Wedding Invitation",
  "Blue Frame Clouds Simple Flat 5x7 Wedding Invitation",
  "Golden Invitation Clouds Simple Flat 5x7 Wedding Invitation",
  "Bluish Green Bamboo Simple Flat 5x7 Wedding Invitation",
  "Golden Bamboo Stalks Simple Flat 5x7 Wedding Invitation",
  "Festive Chinese Simple Flat 5x7 Wedding Invitation",
  "Blooming Pink Flowers Simple Flat 5x7 Wedding Invitation",
  "Radiating Gold Flowers Simple Flat 5x7 Wedding Invitation",
  "Golden Lanterns and Branches Simple Flat 5x7 Wedding Invitation",
  "Pink and Red Falling Simple Flat 5x7 Wedding Invitation",
  "Lanterns Bright Flowers Simple Flat 5x7 Wedding Invitation",
  "Artistic Cloud Borders Simple Flat 5x7 Wedding Invitation",
  "Burgundy Flowers Simple Flat 5x7 Wedding Invitation",
  "Lanterns and Celebration Flowers Simple Flat 5x7 Wedding Invitation",
  "Soft Golden Bamboo Simple Flat 5x7 Wedding Invitation",
  "Chinese Lamp Simple Flat 5x7 Wedding Invitation",
  "Dark Blue Simple Flat 5x7 Wedding Invitation",
  "Golden Borders and Tigers Simple Flat 5x7 Wedding Invitation",
  "Faint Palace and Lanterns Simple Flat 5x7 Wedding Invitation",
  "Ombre Lanterns Simple Flat 5x7 Wedding Invitation",
  "Flowers and Lanterns Swaying Simple Flat 5x7 Wedding Invitation",
  "Song Hy and Gold Borders Simple Flat 5x7 Wedding Invitation",
  "Delicate Bamboo Art Simple Flat 5x7 Wedding Invitation",
  "Hanging Lanterns and Charms Simple Flat 5x7 Wedding Invitation",
  "Fan and Artistic Flowers Simple Flat 5x7 Wedding Invitation",
  "Red Border and Clouds Simple Flat 5x7 Wedding Invitation",
  "Printed Corners and Flowers Simple Flat 5x7 Wedding Invitation",
  "Festive Lanterns in a Sky Simple Flat 5x7 Wedding Invitation",
  "Bright Red and Cloud Scroll Simple Flat 5x7 Wedding Invitation",
  "White Clouds on Dark Red Simple Flat 5x7 Wedding Invitation",
  "Chinese Mountain and River Simple Flat 5x7 Wedding Invitation",
  "Bright Flower Border Simple Flat 5x7 Wedding Invitation",
  "Round Hanging Lanterns Simple Flat 5x7 Wedding Invitation",
  "Artistic Cloud Borders Simple Flat 5x7 Wedding Invitation",
  "Refined Edge Pattern Simple Flat 5x7 Wedding Invitation",
  "Elegant Bouquet of Flowers Simple Flat 5x7 Wedding Invitation",
  "Festive Flowers and Lanterns Simple Flat 5x7 Wedding Invitation",
  "Gradient Gold and Red Simple Flat 5x7 Wedding Invitation",
  "Modern Dragon Valances Simple Flat 5x7 Wedding Invitation",
  "Oriental Patterned Borders Simple Flat 5x7 Wedding Invitation",
  "Minimalist White Simple Flat 5x7 Wedding Invitation",
  "Beautiful Red White Gold Simple Flat 5x7 Wedding Invitation",
  "Golden Geometric Corners Simple Flat 5x7 Wedding Invitation",
  "Chinese Lanterns Simple Flat 5x7 Wedding Invitation",
  "Bouquets of Pink Flowers Simple Flat 5x7 Wedding Invitation",
  "Simple Oriental Simple Flat 5x7 Wedding Invitation",
  "Clouds and Flowers Environment Simple Flat 5x7 Wedding Invitation",
  "Blue Snow Simple Flat 5x7 Wedding Invitation",
  "Pink Christmas Simple Flat 5x7 Wedding Invitation",
  "Christmas Pineapple Design Simple Flat 5x7 Wedding Invitation",
  "Floral Winter Simple Flat 5x7 Wedding Invitation",
  "Delicate Snow Debris Simple Flat 5x7 Wedding Invitation",
  "Christmas Pine Branches Simple Flat 5x7 Wedding Invitation",
  "Winter Forest Simple Flat 5x7 Wedding Invitation",
  "Christmas Brown Branches Simple Flat 5x7 Wedding Invitation",
  "Cold and Tender Flowers Simple Flat 5x7 Wedding Invitation",
  "Frame Snowflakes Simple Flat 5x7 Wedding Invitation",
  "Blue Roses Leaves Simple Flat 5x7 Wedding Invitation",
  "Arrangement of Winter Roses Simple Flat 5x7 Wedding Invitation",
  "Classic Christmas Design  Simple FlatSimple Flat 5x7 Wedding Invitation",
  "Christmas Corners Simple Flat 5x7 Wedding Invitation",
  "Realistic Pine Tree Simple Flat 5x7 Wedding Invitation",
  "Blue Christmas Simple Flat 5x7 Wedding Invitation",
  "Christmas Decoration Simple Flat 5x7 Wedding Invitation",
  "Cold Watercolor Frame Simple Flat 5x7 Wedding Invitation",
  "Roses Mary Simple Flat 5x7 Wedding Invitation",
  "Minimalist Winter Leaves Simple Flat 5x7 Wedding Invitation",
  "Christmas Leaves Simple Flat 5x7 Wedding Invitation",
  "Royal Pine Frame Simple Flat 5x7 Wedding Invitation",
  "Winter Cream Roses Simple Flat 5x7 Wedding Invitation",
  "Elegant Watercolor Leaves Simple Flat 5x7 Wedding Invitation",
  "Winter Festival Simple Flat 5x7 Wedding Invitation",
  "Loving Snowflakes Simple Flat 5x7 Wedding Invitation",
  "Purple Winter Floral Simple Flat 5x7 Wedding Invitation",
  "Winter Roses and Leaves Simple Flat 5x7 Wedding Invitation",
  "Modest Roses Simple Flat 5x7 Wedding Invitation",
  "Purple Flower Arrangement Simple Flat 5x7 Wedding Invitation",
  "Golden Leaves Simple Flat 5x7 Wedding Invitation",
  "White Winter Roses Simple Flat 5x7 Wedding Invitation",
  "Winter Leaves and Gradient Simple Flat 5x7 Wedding Invitation",
  "Hexagonal Roses Arrangement Simple Flat 5x7 Wedding Invitation",
  "Winter Pines Landscape Simple Flat 5x7 Wedding Invitation",
  "Flowers and Cold Leaves Simple Flat 5x7 Wedding Invitation",
  "Dark Winter Design Simple Flat 5x7 Wedding Invitation",
  "Winter Geometric Arrangement Simple Flat 5x7 Wedding Invitation",
  "Christmas and Gold Frame Simple Flat 5x7 Wedding Invitation",
  "Modest White Flowers Simple Flat 5x7 Wedding Invitation",
  "Pine and Wood Design Simple Flat 5x7 Wedding Invitation",
  "Winter Design Photo Simple Flat 5x7 Wedding Invitation",
  "Pine Cone and Roses Simple Flat 5x7 Wedding Invitation",
  "Black Snowflakes Simple Flat 5x7 Wedding Invitation",
  "Watercolor Pines Simple Flat 5x7 Wedding Invitation",
  "Dark Invitation Snowflakes Simple Flat 5x7 Wedding Invitation",
  "Geometric Frame Branches Simple Flat 5x7 Wedding Invitation",
  "Dark Invitation Flowers Simple Flat 5x7 Wedding Invitation",
  "Wooden Frame Snowflakes Simple Flat 5x7 Wedding Invitation",
  "Blue Floral Silhouettes Simple Flat 5x7 Wedding Invitation",
  "Brown and White Flower Simple Flat 5x7 Wedding Invitation",
  "Simple Pine Branches Simple Flat 5x7 Wedding Invitation",
  "Wood White Forest Simple Flat 5x7 Wedding Invitation",
  "Purple Flowers Simple Flat 5x7 Wedding Invitation",
  "Subtle Blue Flowers Simple Flat 5x7 Wedding Invitation",
  "Cardboard Design Flowers Simple Flat 5x7 Wedding Invitation",
  "Winter Flowers and Frame Simple Flat 5x7 Wedding Invitation",
  "Wood Winter Ligths Simple Flat 5x7 Wedding Invitation",
  "Leaves and Branches Gradient Simple Flat 5x7 Wedding Invitation",
  "Cardboard White Branches Simple Flat 5x7 Wedding Invitation",
  "Indian Wedding Ganesha Simple Flat 5x7 Wedding Invitation",
  "Boho Arrows Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Golden Waves Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Eucalyptus Flower Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Laser Cut Blue Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Tropical Stationery in Peach Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Red Invitation Leaves Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Elegant Beige and Black Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Elegant Golden Mandala Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Elegant Gold Decorations Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Flowers and Turquoise Watercolor Simple Flat 5x7 Wedding Invitation",
  "Design Boho Photo Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Cream Colored Boho Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Couple Decorative Borders Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Minimalist Pink Border Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Ornamental Invitation Photo Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Beige Abstract Shapes Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Simple Photo Invitation Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Luxury Gradient Photo Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Gatsby Style In Gold Simple Flat 5x7 Spanish & English Wedding Invitation",
  "Elegant White and Flowers Simple Flat 5x7 Wedding Invitation",
  "Elegant Simple Simple Flat 5x7 Wedding Invitation",
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
    `https://www.apprinting.com/vietnamese-wedding-invitations/products/`,
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
    console.log(`Working ---> i`);
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
    const report = `{"@context":"https://schema.org/","@type":"Product","name":"${productNameValue}","description":"${productNameValue}. A high-quality product offered by AP PRINTING. Our design team ensures that every detail is perfect to meet our customers' needs.","sku":"${productSkuValue}","brand":{"@type":"Card","name":"Vietnamese & English Wedding Invitation"},"review":{"@type":"Review","reviewRating":{"@type":"Rating","ratingValue":"4","bestRating":"5"},"author":{"@type":"Person","name":"AP PRINTING DESIGN TEAM"}},"aggregateRating":{"@type":"AggregateRating","ratingValue":"${(
      Math.random() * (5 - 4.1) +
      4.1
    ).toFixed(1)}","reviewCount":"${Math.floor(
      Math.random() * (3000 - 1000) + 1000
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
    fs.appendFileSync(
      `list.txt`,
      //product.id.toString() + `---> ${product.title}` + ",\n"
      product.title.toString() + ",\n"
    );
    console.log(product);
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
    fs.appendFileSync(`list.txt`, `{id:${id},title:"${valueInput}"},\n`);
    console.log("Working ---> ", id, " ------> ", valueInput);
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
  await changedSeoData(page);
  //await getTitleAndChangedTitleImagesGallery(page);
  //await getTitleProduct(page);
  //await getTitleFilterProduct(page, "Acrylic");
  //await getAssociatedCategoryProduct(page);
  //await addSetupProductPageDesigner(page);

  console.log("END");
  await browser.close();
};

updatePrice();
