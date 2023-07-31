// const mongoose = require("mongoose");

// const formDataSchema = new mongoose.Schema({
//   formName: {
//     type: String,
//     required: true,
//   },
//   formData: {
//     type: Object,
//     required: true,
//   },
// });

// const FormDataModel = new mongoose.model("FormData", formDataSchema);

// module.exports = {
//   FormDataModel,
// };

const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  formName: {
    type: String,
    required: true,
  },
  formData: {
    type: Object,
    required: true,
  },
});

const Step = mongoose.model("FormData", stepSchema);

module.exports = Step;

