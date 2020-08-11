const fs = require('fs');
module.exports = (data, filename) => {
  fs.writeFile(`../output/${filename}.json`, JSON.stringify(data), (err) => {
    if (err) console.log(err);
    console.log(`Saved ${data.length} records to ${filename}.json`);
    process.exit(0);
  });
};
