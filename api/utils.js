// --
import { marked } from "marked";

/**
 * Load Bins
 *
 * @param {object} bins
 * @returns
 */
export async function loadBin(bins) {
  let arr = [];
  bins.items.map((item) => {
    arr.push({
      key: item.key,
      title: item.title,
      public: item.public,
      update_at: item.update_at,
    });
  });
  arr.sort(compare);
  // Invert data
  return arr;
}
/**
 * Show Error on document
 *
 * @param {string} str
 * @returns
 */
export function parseError(str) {
  return `<pre style="background: #0e0e0e;color:white;white-space: pre-wrap;padding:10px;border-radius: 5px;border: 2px solid black;">${str}</pre>`;
}

/**
 * Convert Markdown to html
 *
 * @param {string} str
 * @returns
 */
export function toMd(str) {
  try {
    let md = marked.parse(str);
    return { status: true, data: md };
  } catch (error) {
    return { status: false, error: error };
  }
}

/**
 * Capitalize
 *
 * @param {string} str
 * @returns
 */
export function capitalize(str) {
  return str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}