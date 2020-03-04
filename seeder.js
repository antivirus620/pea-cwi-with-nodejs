const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env
dotenv.config({ path: './config/config.env' });

// Load Models
const Line = require('./models/organizationLine/Line');
const Result = require('./models/organizationLine/Result');
const User = require('./models/User');
const PEARelation = require('./models/PEARelation');

// ConnectDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON Files
const lines = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/organizationLine.json`, 'utf-8')
);
const results = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/organizationMethod.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
const peaRelation = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/peaName.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Line.create(lines);
    await Result.create(results);
    await User.create(users);
    await PEARelation.create(peaRelation);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data from DB
const deleteData = async () => {
  try {
    await Line.deleteMany();
    await Result.deleteMany();
    await User.deleteMany();
    await PEARelation.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// รับคำสั่งจาก console
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
