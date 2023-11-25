const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9091;
const mongoURI = "mongodb://127.0.0.1:27017/project";

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const catagorySchema = new mongoose.Schema({
  Catagory: String,
  SubCatagory: String,
  Description: String,
});

const CatagoryModel = mongoose.model("Catagory", catagorySchema);

app.post("/save", async (req, res) => {
  try {
    const { Catagory, SubCatagory, Description } = req.body;
    const newCatagory = new CatagoryModel({
      Catagory,
      SubCatagory,
      Description,
    });
    const savedCatagory = await newCatagory.save();
    res.json(savedCatagory);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/fetch", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      CatagoryModel.find().sort({ _id: -1 }).skip(skip).limit(limit),
      CatagoryModel.countDocuments()
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({ data, totalPages });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/edit/:id", async (req, res) => {
  try {
    const { Catagory, SubCatagory, Description } = req.body;
    const editedCatagory = await CatagoryModel.findByIdAndUpdate(
      req.params.id,
      { Catagory, SubCatagory, Description },
      { new: true }
    );
    res.json(editedCatagory);
  } catch (error) {
    console.error("Error editing data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete", async (req, res) => {
  try {
    const { ids } = req.body;
    await CatagoryModel.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
