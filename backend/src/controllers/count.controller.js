const Count = require("../models/count");

module.exports.createOneCount = (req, res) => {
  const body = new Count(req.body);
  body
    .save()
    .then((count) => {
      res.send(count);
    })
    .catch((e) => {
      res.status(400).send();
    });
};

module.exports.getAllCounts = (req, res) => {
  Count.find().then((result) => {
    res.send(result);
  });
};

module.exports.updateInfoOneCount = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Count.findByIdAndUpdate(id, { $set: body }, { returnDocument: "after" })
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send());
};

module.exports.deletOneCount = (req, res) => {
  const id = req.params.id;
  Count.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(400).send());
};
