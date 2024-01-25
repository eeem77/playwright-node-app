import { chromium, firefox, webkit } from "playwright";
import fs from "fs";
// import * as dotenv from 'dotenv'
// dotenv.config()

const ids = [
  "6729526",
  "8025631",
  "8032624",
  "8086617",
  "8086736",
  "11190517",
  "11461970",
  "11716289",
  "11952214",
  "12206927",
  "12219491",
  "12292517",
  "12299804",
  "12350652",
  "12352704",
  "12455777",
  "13014493",
  "13097230",
  "13098334",
  "13099060",
  "13158674",
  "13629534",
  "13702621",
  "13763690",
  "13966280",
  "14106043",
  "14268936",
  "14281923",
  "14588483",
  "14845230",
  "14917105",
  "15142286",
  "15234681",
  "15620895",
  "15622818",
  "15923099",
  "15942136",
  "16146132",
  "16572031",
  "16588087",
  "16654595",
  "16655223",
  "16664697",
  "16991811",
  "17238308",
  "17522046",
  "17523188",
  "17697154",
  "17895387",
  "18056471",
  "18929009",
  "19350323",
  "19487233",
  "19539263",
  "19848139",
  "19894536",
  "20047466",
  "20397698",
  "20867598",
  "22654043",
  "23002299",
  "23594281",
  "23721523",
  "24823472",
  "26214944",
  "27905078",
  "28037255",
  "13584219",
  "16066056",
  "14339396",
  "17616297",
  "8634331",
  "13345756",
  "16908756",
  "11710784",
  "19048157",
];

const tableExtractData = async (td) => {
  let flag = 0;
  let data = [];
  await td.map((element) => {
    if (flag === 1 || flag === 7 || flag === 11) {
      data.push(element);
      //console.log(element)
    }
    flag++;
  });

  return data;
};

const web = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://www.cne.gob.ve/web/index.php", { timeout: 300000 });

  
    const inputId = await page.$('[name="cedula"]');
    await inputId.fill('19048157');
    const btnSearch = await page.$('[title="Buscar"]');
    await btnSearch.click();
    await page.waitForSelector('[bgcolor="#90c1e2"]', { state: "attached" });
    const td = await page.$$eval('[align="left"]', (node) => node.map((n) => n.innerText))
    let methodExtract = await tableExtractData(td)
    fs.appendFileSync(`list.txt`, methodExtract.toString() + "\n")
  

  console.log("END");
  await browser.close();
};

web();
