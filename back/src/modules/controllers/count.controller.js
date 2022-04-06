const User = require("../../db/models/counts/index");

module.exports.createOneCount = (req, res) => {
  const body = new User(req.body);
  body.save().then(r => {
    Count.find().then(result => {
      res.send({ data: result })
    });
  });
};

module.exports.getAllCounts = (req, res) => {
  Count.find().then(result => {
    res.send({ data: result });
  });
};

module.exports.updateInfoOneCount = (req, res) => {
  const body = req.body;
  const id = body._id;
  Count.updateOne({ _id: id }, { $set: body }, () => {
    Count.find().then(result => {
      res.send({ data: result });
    })
  });
};

module.exports.deletOneCount = (req, res) => {
  const id = req.query.id;
  Count.deleteOne({ _id: id }, () => {
    Count.find().then(result => {
      res.send({ data: result });
    })
  });
};