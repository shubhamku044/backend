const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

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
    // console.log(err);
  });

// mongodb+srv://shubhamku044:pxy9eXuDL7IJ8Dub@cluster0.hamcdl0.mongodb.net/natours

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listining on port ${port}...`);
});
