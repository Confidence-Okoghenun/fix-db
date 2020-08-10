const fs = require('fs');
module.exports = (data) => {
  console.log('starting log');
  fs.writeFile('./log.json', JSON.stringify(data), (err) => {
    if (err) console.log(err);
    console.log('log saved');
  });
};
