const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env
dotenv.config({ path: './config/config.env' });

// Load Models
const Line = require('./models/Line');
const Method = require('./models/Method');

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
const methods = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/organizationMethod.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Line.create(lines);
    await Method.create(methods);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err.red);
  }
};

// Delete data from DB
const deleteData = async () => {
  try {
    await Line.deleteMany();
    await Method.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err.red);
  }
};

// รับคำสั่งจาก console
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
