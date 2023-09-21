import { Base } from "deta";

export default async function ExportJson() {
  try {
    const Db = Base("bins");
    const response = await Db.fetch();
    const output = response.items;
    const json = JSON.stringify(output);
    const blob = new Blob([json], { type: "application/json" });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, "backup.json");
    } else {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "backup.json";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    return {status: true};
  } catch (error) {
    console.log("Error al exportar JSON:", error);
    return {status: false};
  }
}
