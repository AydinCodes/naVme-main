import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: Request) {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
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

    await browser.close();
    return NextResponse.json(productData);
  } catch (error) {
    console.log("[DATA_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
