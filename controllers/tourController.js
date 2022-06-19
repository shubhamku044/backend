const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAvg,price';
  req.query.fields = 'name,price,ratingsAvg,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    console.log(queryObj);
    console.log(req.query);

    let query = Tour.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numtours) throw new Error('This page does not exist.');
    }

    const tours = await query;

    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      message: 'Unable to fetch data.',
      error: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      message: 'Unable to fetch data.',
      error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    console.log(`Unable to post data.`);
    res.status(400).json({
      status: 'Fail',
      message: 'Unable to post data.',
      error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(204).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Unable to update data.',
      error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      message: 'Unable to delete data.',
      error,
    });
  }
};
