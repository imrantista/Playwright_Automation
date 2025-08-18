import CommonActions from "../Common/Actions.js";
class AddNewAsset {
  async addAsset(page, resultTracker) {
    const commonAction = new CommonActions();
    const randomString = Math.random().toString(36).substring(2, 7);
    const assetName = `Asset-${randomString}-90`;
    await page.waitForTimeout(2000);
    await page.getByRole('textbox', { name: 'Name *' }).fill(assetName);
    await page.locator('.css-tlfecz-indicatorContainer > .css-8mmkcg').click();
    await page.getByText('Assets', { exact: true }).click();
    await page.locator('.ql-editor.ql-blank').first().fill('Assets descriptions');
    await page.locator('.quill.assetScriptEditor > .ql-container > .ql-editor').fill('Assets scripts');
    await page.locator('.vs-modal-body').getByText('Tag(s)', { exact: true }).scrollIntoViewIfNeeded();
    await page.locator('input[name="minutes"]').fill('10');
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await commonAction.checkToast(
      page,
      "Asset created successfully!", // success toast text
      /Unable to create Asset|error creating Asset/, // error regex/text
      "Add new Asset -> Fill form -> Click Add",
      resultTracker
    );
  }
}
export default AddNewAsset;
