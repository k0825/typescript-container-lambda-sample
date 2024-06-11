import Chromium from "@sparticuz/chromium";
import { Handler } from "aws-lambda";
import puppeteer from "puppeteer-core";

export const handler: Handler = async (event, context) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));

  const executablePath = await Chromium.executablePath(
    "/opt/nodejs/node_modules/@sparticuz/chromium/bin"
  );

  const browser = await puppeteer.launch({
    args: Chromium.args,
    defaultViewport: Chromium.defaultViewport,
    executablePath: executablePath,
    headless: Chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://www.google.co.jp");

  browser.close();

  return context.logStreamName;
};
