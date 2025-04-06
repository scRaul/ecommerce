import puppeteer from "puppeteer-core";
import Tesseract from "tesseract.js";
import productIds from "./productIds.js";
import fs from "fs";
import { error } from "console";

const api = "https://www.applied-motion.com/s/product/detail";
const path = "./products.json";
function getUrl(id) {
  return `${api}/${id}`;
}
async function waitFor(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function getPrice() {
  const {
    data: { text },
  } = await Tesseract.recognize("price_component.png", "eng", {});
  const cleanText = text.replace(/[^0-9.-]+/g, "");
  return parseFloat(cleanText) || 0.0;
}
function loadProducts() {
  try {
    const data = fs.readFileSync("./products.json", "utf-8"); // Sync read from file
    const newProducts = JSON.parse(data);
    products = [...products, ...newProducts]; // Append new data to existing products array
  } catch (err) {
    console.error("Error reading products.json:", err);
  }
}
let products = [];

let request = "";

async function run() {
  let browser;
  try {
    const browser = await puppeteer.launch({
      channel: "chrome",
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    let firstPage = true;
    while (products.length < productIds.length) {
      let index = products.length;
      let goal = Math.floor(index + 5 + Math.random() * 15);

      console.log(`${index}:${goal}`);
      while (index < goal) {
        const id = productIds[index];
        request = getUrl(id);
        await page.goto(request);
        await waitFor(8000); //wait for page to render
        if (firstPage) {
          firstPage = false;
          const cookiesHandle = await page.$(
            `body > div.b2bBodyWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceB2bBody > div.footer > div > div:nth-child(3) > c-b2b-cookies > div.b2b-cookies > div > div > div.cookies_buttons_group > div.cookie_buttons > lightning-button:nth-child(2) > button`
          );
          await cookiesHandle.click();
        }

        const nameHandle = await page.$(
          `body > div.b2bBodyWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceB2bBody > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div:nth-child(2) > c-b2b-product-detail > div.b2b-product-detail__wrapper > div > div.b2b-product-detail__shop > c-b2b-product-detail-title > div > div.b2b-product-detail-title__name`
        );
        const name = await nameHandle.evaluate((el) => el.textContent.trim());

        const skuHandle = await page.$(
          `body > div.b2bBodyWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceB2bBody > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div:nth-child(2) > c-b2b-product-detail > div.b2b-product-detail__wrapper > div > div.b2b-product-detail__shop > c-b2b-product-detail-title > div > div.b2b-product-detail-title__sku > span.b2b-product-detail-title__sku-value`
        );
        const sku = await skuHandle.evaluate((el) => el.textContent.trim());

        const breadCrumbsHandle = await page.$(
          "body > div.b2bBodyWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceB2bBody > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div:nth-child(1) > c-b2b-breadcrumbs > div.b2b-breadcrumbs__wrapper > nav > ol"
        );
        const breadcrumbs = await breadCrumbsHandle.$$eval("li a", (elements) =>
          elements.map((el) => el.innerHTML.trim())
        );
        const gallery = await page.$$(
          "body > div.b2bBodyWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceB2bBody > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div:nth-child(2) > c-b2b-product-detail > div.b2b-product-detail__wrapper > div > div.b2b-product-detail__gallery > c-b2b-product-detail-gallery > div.b2b-product-detail-gallery__wrapper > div > img"
        );

        const images = await Promise.all(
          gallery.map(async (el) => {
            return await el.evaluate((img) => img.getAttribute("src"));
          })
        );

        const stockHandle = await page.$(
          `body > div.b2bBodyWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceB2bBody > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div:nth-child(2) > c-b2b-product-detail > div.b2b-product-detail__wrapper > div > div.b2b-product-detail__shop > c-b2b-product-detail-shop > div:nth-child(2) > div.b2b-product-detail-shop__header > div:nth-child(1) > span.b2b-product-detail-shop__in-stock-value`
        );
        let stock = 0;
        let unit_price = null;
        let includedItems = [];
        if (stockHandle) {
          stock = await stockHandle.evaluate((el) => el.textContent.trim());

          const elementHandle = await page.$(
            "div.b2b-product-detail-shop__price"
          );
          const boundingBox = await elementHandle.boundingBox();
          if (boundingBox && boundingBox.height > 0) {
            await elementHandle.screenshot({ path: "price_component.png" });
            unit_price = await getPrice();
          }
          const includedHandle = await page.$(
            `body > div.b2bBodyWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceB2bBody > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div:nth-child(2) > c-b2b-product-detail > div.b2b-product-detail__wrapper > div > div.b2b-product-detail__shop > c-b2b-product-detail-shop > div:nth-child(2) > div.b2b-product-detail-shop__footer > div.b2b-product-detail-shop__box-contents > ul`
          );
          if (includedHandle)
            includedItems = await includedHandle.$$eval("li span", (elements) =>
              elements.map((el) => el.textContent.trim())
            );
        }

        let features = [];
        const featuresHandle = await page.$(
          `body > div.b2bBodyWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceB2bBody > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div:nth-child(2) > c-b2b-product-detail > div.b2b-product-detail__wrapper > div > div.b2b-product-detail__title > c-b2b-product-detail-description > div > div.b2b-product-detail-description__features > div > ul`
        );
        if (featuresHandle) {
          features = await featuresHandle.$$eval("li", (elements) =>
            elements.map((el) => el.innerHTML.trim())
          );
        }

        const descriptionHandle = await page.$(`#tab-1 > slot > div > div`);
        const description = await descriptionHandle.evaluate((el) =>
          el.innerHTML.trim()
        );

        const specsTab = await page.$(
          `body > div.b2bBodyWrapper.isHeroUnderHeader-false.isHeaderPinned-false.siteforceB2bBody > div.body.isPageWidthFixed-true > div > div.slds-col--padded.contentRegion.comm-layout-column > div > div:nth-child(2) > c-b2b-product-detail > div.b2b-product-detail__wrapper > div > div.b2b-product-detail__info > c-b2b-product-detail-info > div.b2b-product-detail-info__wrapper > div.b2b-product-detail-info__tab-wrapper > lightning-tabset > div > lightning-tab-bar > ul > li[data-tab-value="Specifications"]`
        );
        const specs = [];
        if (specsTab) {
          await specsTab.click();
          await waitFor(2000);

          const metricButton = await page.$(
            "#tab-2 > slot > div.b2b-product-detail-info__specifications-toggle > button:nth-child(1)"
          );
          if (metricButton) {
            await metricButton.click();
            await waitFor(2000);
          }

          const specsRowsHandle = await page.$$(
            ".b2b-product-detail-info__specifications-row"
          );
          for (const rowHandle of specsRowsHandle) {
            const keyHandle = await rowHandle.$(
              `.b2b-product-detail-info__specifications-col-label`
            );
            const key = await keyHandle.evaluate((el) => el.textContent.trim());

            const valueHandle = await rowHandle.$(
              `.b2b-product-detail-info__specifications-item`
            );
            const value = await valueHandle.evaluate((el) =>
              el.textContent.trim()
            );

            specs.push({ key, value });
          }
        }

        const files = await page.$$(
          `div.b2b-product-detail-files-group__list > div > a`
        );
        const links = [];
        for (const fileHandle of files) {
          // Extract file link
          const fileLink = await fileHandle.evaluate((el) =>
            el.getAttribute("href")
          );
          // Extract file label (name)
          const fileLabel = await fileHandle.evaluate((el) =>
            el.textContent.trim()
          );
          links.push({ label: fileLabel, url: fileLink });
        }
        const product = {
          id,
          name,
          sku,
          images,
          url: request,
          breadcrumbs,
          stock,
          unit_price,
          includedItems,
          features,
          description,
          specs,
          files: links,
        };
        products.push(product);
        index++;
      }
      fs.writeFileSync(path, JSON.stringify(products, null, 2)); // Writes data to file with formatting
      console.log(`Data saved to ${path}`);
      await waitFor(1000 + Math.random() * 10000);
    }
  } catch (e) {
    console.error("request:", request);
    console.error("scrape failed:", e);
  } finally {
    fs.writeFileSync(path, JSON.stringify(products, null, 2)); // Writes data to file with formatting
    console.log(`Data saved to ${path}`);
    await browser?.close();
    return;
  }
}

loadProducts();
run();
