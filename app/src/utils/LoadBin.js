export default async function loadBin(bins) {
  // Copy objects from "bins.items" to a new array "arr"
  let arr = bins.items.map((item) => ({
    key: item.key,
    title: item.title,
    description: item.description,
    category: item.category,
    lastModified: item.lastModified,
    published: item.published,
    pinned: item.pinned,
  }));

  // Sort the array using the custom comparison function
  arr.sort(Compare);

  // Create a new object with the sorted array and other fields
  let newArray = {
    items: arr,
    count: bins.count,
    last: bins.last,
  };

  // Return the new object with the sorted objects
  return bins;
}

// Define a custom comparison function to sort the array
function Compare(a, b) {
  // Objects with "pinned: true" will be placed first
  if (a.pinned && !b.pinned) {
    return -1;
  }
  if (!a.pinned && b.pinned) {
    return 1;
  }
  // For objects with the same "pinned" status, you can sort by other criteria if needed
  // For example, you can use "a.lastModified.localeCompare(b.lastModified)" to sort by modification date
  // Or you can use "a.title.localeCompare(b.title)" to sort by title, etc.
  // This depends on your specific requirements.
  return 0;
}
