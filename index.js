const mongoose = require('mongoose');
const operation = require('./operation');

(async () => {
    await mongoose.connect(process.env.DB,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  operation();
})();
