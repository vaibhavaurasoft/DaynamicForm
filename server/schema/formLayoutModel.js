const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  type: {
    type: String,
    // required: true,
  },
  lable: {
    type: String,
    // required: true,
  },
});

const StepSchema = new mongoose.Schema({
  step: {
    type: String,
  },
  name: {
    type: String,
    // required: true,
  },
  fields:[FieldSchema]
});

const FormLayoutSchema = new mongoose.Schema({
    layout : [StepSchema]
})

const FormLayout = mongoose.model("formlayout",FormLayoutSchema)
module.exports = FormLayout;