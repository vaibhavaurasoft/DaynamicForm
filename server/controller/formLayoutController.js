const FormLayout = require("../schema/formLayoutModel");
const TryCatch = require("../middleware/trycatch");

// create layout
const SaveFormLayout = TryCatch(async (req, res) => {
  const { layout } = req.body;
  const savelayout  = await FormLayout.create({layout})
     res
       .status(201)
       .json({ message: "Form layout saved successfully", data: savelayout });
});

// get all layout
const getAllFormLayouts = TryCatch(async (req, res) => {
  const AllLayout = await FormLayout.find(); 
  res
    .status(201)
    .json({ message: "Form layout saved successfully", data: AllLayout });
});

// layout by id
const getLayoutsById = TryCatch(async (req, res) => {
    const id  = req.params.id
  const AllLayout = await FormLayout.findById(id);
  res
    .status(201)
    .json({ message: "Form layout saved successfully", data: AllLayout });
});

module.exports = {
  SaveFormLayout,
  getAllFormLayouts,
  getLayoutsById,
};