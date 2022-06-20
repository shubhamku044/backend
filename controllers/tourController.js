const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

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
    // Pagination

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

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
