const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getAll = (Model) => {
  asyncHandler(async (req, res, nxt) => {
    const apiFeature = new ApiFeatures(Model.find(), req.query)
      .filter()
      .fieldsLimit()
      .search(`${Model}`)
      .sort();

    const countDocuments = await Model.countDocuments();

    // Apply pagination
    await apiFeature.paginate(countDocuments);
    //Execute Query
    const { mongooseQuery, paginationResult } = apiFeature;
    const docs = await mongooseQuery;

    res.status(200).json({
      status: "Success",
      results: docs.length,
      paginationResult,
      data: docs,
    });
  });
};

exports.createOne = (Model) => {
  asyncHandler(async (req, res, nxt) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "Success",
      data: doc,
    });
  });
};

exports.getOne = (Model) => {
  asyncHandler(async (req, res, nxt) => {
    const { id } = req.params;

    const document = await Model.findById(id);
    if (!document) {
      return nxt(new AppError(`No document found with that ID :${id}`, 404));
    }
    res.status(200).json({
      status: "Success",
      data: document,
    });
  });
};

exports.updateOne = (Model) => {
  asyncHandler(async (req, res, nxt) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!document) {
      return nxt(new AppError(`No document found with that ID :${id}`, 404));
    }

    res.status(200).json({ status: "Success", data: document });
  });
};

exports.deleteOne = (Model) => {
  asyncHandler(async (req, res, nxt) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return nxt(new AppError(`No document found with that ID :${id}`, 404));
    }
    res.status(204).send();
  });
};
