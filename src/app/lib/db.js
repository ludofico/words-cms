const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");
const jsonUrl = path.resolve(__dirname, "sm1_new_kap1.json");
const db = new sqlite3.Database("./cms.db");

// Get JSON data
function getJsonData(jsonUrl) {
  const data = fs.readFileSync(jsonUrl, "utf8");
  const jsonData = JSON.parse(data);
  const fields = Object.keys(jsonData[0]).join(",");
  return [fields, jsonData];
}
// create table

// createTable(db);
function populate(db) {
  db.serialize(() => {
    const [fields, jsonData] = getJsonData(jsonUrl);
    db.run(`CREATE TABLE IF NOT EXISTS words (${fields})`);
    console.log(fields);
    console.log("Table created");
    jsonData.forEach((entry) => {
      const values = Object.values(entry).map((val) => {
        if (typeof val === "string") {
          return val === "" ? "NULL" : `'${val.replace(/'/g, "''")}'`;
        }
        return val === null || val === undefined ? "NULL" : val;
      });

      const sql = `INSERT INTO words (${fields}) VALUES (${values.join(",")})`;
      console.log(sql); // Debug SQL query

      db.run(sql, function (err) {
        if (err) {
          console.error("Error during insertion:", err.message);
        } else {
          console.log(`Row inserted with ID: ${this.lastID}`);
        }
      });
    });

    db.close();
  });
}
populate(db);
// export { db };
// function getData() {
//   let wordFirstLang;
//   let sentenceFirstLang;
//   let wordSecondLang;
//   let sentenceSecondLang;
//   let id;
// }
