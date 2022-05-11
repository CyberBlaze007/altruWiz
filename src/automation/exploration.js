const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await page.locator('text=Find your next event').click({delay: 2000});
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('text=Dashboard').click({delay: 2000});
  await page.locator('input[type="text"]').click({delay: 2000});
  await page.locator('input[type="text"]').fill('testcinder00000001@gmail.com');
  await page.locator('input[type="password"]').click({delay: 2000});
  await page.locator('input[type="password"]').fill('poiuytrewq');
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/dashboard/profile' }*/),
    page.locator('button:has-text("Login")').click()
  ]);
  await page.locator('button[role="tab"]:has-text("Events")').click({delay: 2000});
  await page.locator('text=Achievements').click({delay:2000});
  await page.locator('text=Certificates').click({delay:2000});
  await page.locator('text=Badges').click({delay:2000});
  await page.locator('text=Achievements').click({delay:2000});
  await context.close();
  await browser.close();
})();
