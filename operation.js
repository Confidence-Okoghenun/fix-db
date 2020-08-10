const Album = require('./model-no-index/album');
const Artist = require('./model-no-index/artist');
const Song = require('./model-no-index/song');
const Genre = require('./model-no-index/genre');
const log = require('./log')
// const Album = require('./model/album');
// const Artist = require('./model/artist');
// const Song = require('./model/song');
// const Genre = require('./model/genre');

module.exports = async () => {
  const dups = await Artist.aggregate([
    {
      $group: {
        _id: { name: '$name' },
        uniqueIds: { $addToSet: '$_id' },
      },
    },
  ]).then(res => {
    console.log(res)
  });
  console.log(dups);
};
