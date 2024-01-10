import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.slow();
  await page.goto('https://www.ryanair.com/ie/en');
  await page.getByRole('button', { name: 'Yes, I agree' }).click();
  await page.getByPlaceholder('Departure').click();
  await page.getByPlaceholder('Departure').fill('Athens');
  await page.getByRole('button', { name: 'Athens' }).click();
  await page.getByPlaceholder('Destination').click();
  await page.getByPlaceholder('Destination').click();
  await page.getByPlaceholder('Destination').fill('Dublin');
  await page.getByRole('button', { name: 'Dublin' }).click();
  await page.getByText('14').nth(1).click();
  await page.getByText('24').nth(4).click();
  await page.locator('.counter__button-wrapper--enabled').first().click();
  await page.locator('ry-counter:nth-child(5) > .counter > .counter__button-wrapper--enabled').click();
  await page.getByLabel('Search').click();
  await page.getByRole('button', { name: '14Feb Wednesday € 92 .' }).click();
  await expect(page.locator('flights-summary')).toContainText('Select');
  await expect(page.locator('#ry-tooltip-5')).toContainText('Choose a flight to continue');
});