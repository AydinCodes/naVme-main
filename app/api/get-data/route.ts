import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chrome from 'chrome-aws-lambda';

export async function GET(req: Request) {
  let browser: any;

  console.log("Executable Path:", await chrome.executablePath);

  try {
    browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    const page = await browser.newPage();

    await page.goto(
      "https://www.amazon.com.au/Quilton-Double-Length-Toilet-Tissue/dp/B07KY731CC/"
    );
    await page.setViewport({ width: 1080, height: 1024 });

    const productData = await page.evaluate(() => {
      const titleElement = document.querySelector("#productTitle");
      const priceElement = document.querySelector("#sns-base-price");

      const title = titleElement ? titleElement.textContent?.trim() : null;
      const price = priceElement ? priceElement.textContent?.trim() : null;

      return {
        title,
        price,
      };
    });

    return NextResponse.json(productData);
  } catch (error) {
    console.log("[DATA_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
