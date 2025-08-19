import { test, expect } from "@playwright/test";
import LoginSession from "../Pages/Common/LoginSession.js";
import SendResult from "../Pages/Common/SendResult.js";
import AddNewAsset from "../Pages/Assets/AddNewAsset.js";
import AssetDelete from "../Pages/Assets/AssetDelete.js";
import testData from "../fixtures/testData.json" assert { type: "json" };
test.describe("Assets Module Tests", () => {
  let resultTracker;
  const loginSession = new LoginSession();
  const addNewAsset = new AddNewAsset();
  const deleteAsset = new AssetDelete();
  const mailer = new SendResult();

  test.beforeEach(async ({ page }) => {
    resultTracker = {
      successCount: 0,
      errorCount: 0,
      errorMessages: [],
      stepToReproduces: [],
    };
    await loginSession.login(page);
    await page.goto(`${testData.link}products-and-assets?tab=Assets`);
    await expect(page.locator("text=Search")).toBeVisible();
  });

  test("Add new Asset", async ({ page }) => {
    await page.getByRole("button", { name: "Add new" }).click();
    await addNewAsset.addAsset(page, resultTracker);
  });

  test.only("Delete Asset", async ({ page }) => {
    await deleteAsset.deleteAsset(page, resultTracker);
  });

  test.afterAll(async () => {
    await mailer.logResults(resultTracker, "Assets Module");
  });
});
