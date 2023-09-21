import React from "react";
import { Base } from "deta";

/**
 * Import handler
 */
export default async function HandleImportRawUrl(url) {
  const Db = Base("bins");
  const info = [];
  const response = await importJson(url);
  if (response !== undefined && response !== null) {
    // Values you want to check in the array
    const expectedValues = [
      "category",
      "content",
      "creationDate",
      "description",
      "key",
      "lastModified",
      "published",
      "title",
      "pinned"
    ];
    // Check values
    const allObjectsHaveExpectedValues = response.every((object) => {
      return expectedValues.every((val) =>
        Object.prototype.hasOwnProperty.call(object, val)
      );
    });

    // If error show msg
    if (!allObjectsHaveExpectedValues) {
      info.push({ status: false, msg: "array_error" });
      return info;
    }

    // Import files 20 to 20
    let count = 0
    for (let i = 0; i < response.length; i += 20) {
      const groupOfData = response.slice(i, i + 20);
      const output = await Db.putMany(groupOfData);
      if (output.processed) {
        console.log("success");
        count = ++count;
        info.push({ status: false, msg: "success_import",count:count });
      } else {
        console.log("error");
        info.push({ status: false, msg: "error_import_fetch" });
      }
    }

    // Return info after importing all groups
    return info;
  }
}

/**
 * Import Json file
 *
 * @param {File} file
 * @returns {Promise<Object|null>}
 */
async function importJson(file) {
  if (!file) {
    return [{ status: false, msg: "error_import_fetch" }];
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(JSON.parse(reader.result));
    reader.readAsText(file);
  });
}
