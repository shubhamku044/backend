const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './../../config.env' });

// console.log(process.env);

const DATABASE_URL = process.env.DATABASE.replace(
  'USERNAME',
  process.env.DATABASE_USERNAME
).replace('PASSWORD', process.env.DATABASE_PASSWORD);

// console.log(DATABASE_URL);
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(`Database Successfully Connected🟢🟢`);
  })
  .catch((err) => {
    console.log(`Database Connection: ERROR😡😡`);
  });

// Read json file

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log(`Data Successfully created`);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit();
  }
};

const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
    console.log(`Successfully deleted all data.`);
    process.exit();
  } catch (error) {
    console.log(`ERROR`);
    process.exit();
  }
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteAllData();
}
