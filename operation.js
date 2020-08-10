const Album = require('./model-no-index/album');
const Artist = require('./model-no-index/artist');
const Song = require('./model-no-index/song');
const Genre = require('./model-no-index/genre');
const log = require('./utils/log');
const asyncForEach = require('./utils/asyncforeach');
const fs = require('fs');
// const Album = require('./model/album');
// const Artist = require('./model/artist');
// const Song = require('./model/song');
// const Genre = require('./model/genre');

const getDupsArtist = async () => {
  const dupArtists = await Artist.aggregate([
    {
      $group: {
        _id: { name: '$name' },
        uniqueIds: { $addToSet: '$_id' },
        count: { $sum: 1 },
      },
    },
    {
      $match: {
        count: { $gt: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]).then((result) => result);
  log(dupArtists, 'artist');
};

const rmvDupsArtist = async () => {
  const data = fs.readFileSync('./output/artist.json');
  const array = JSON.parse(data);

  await asyncForEach(array, async ({ uniqueIds }, index) => {
    try {
      const truId = uniqueIds[0];
      const dupId = uniqueIds[1];

      const albums = await Album.find({ artist: dupId });
      console.log(`Found ${albums.length} albums with ID ${dupId}`);

      await asyncForEach(albums, async (album) => {
        album.artist = album.artist.map((i) =>
          String(i) === String(dupId) ? truId : i
        );
        album.save();
        console.log(`Removed ID ${dupId} from Album ${album._id}`);
      });

      await Artist.deleteOne({ _id: dupId });
      console.log(`Processed Index ${index}`);

      if (index === array.length - 1) {
        console.log('DONE');
        process.exit(0);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = async () => {
  rmvDupsArtist();
};
