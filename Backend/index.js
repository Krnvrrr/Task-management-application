const connectToMongo = require("./db");
const express = require("express");
const task = require("./schema");
const { body, validationResult } = require("express-validator");
var cors = require("cors");
connectToMongo();
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000; 

// adding a new task
app.post(
  "/newTask",
  [
    body("Title", "entry must not be empty").isLength({ min: 1 }),
    body("discription", "entry must not be empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { Title, discription } = req.body;
      let Task = await task.create({ Title, discription });
      return res.status(200).send(Task);
    } catch (error) {
      console.log(error);
      return res.status(500).send((message = "internal server error"));
    }
  }
);
// getting all the tasks created by user
app.get("/allTask", async (req, res) => {
  try {
    const all = await task.find({});
    return res.status(200).send(all);
  } catch (error) {
    console.log(error);
    return res.status(500).send((message = "internal server error"));
  }
});
// updating perticular task selected by user
app.put(
  "/updateTask/:id",
  [
    body("Title", "entry must not be empty").isLength({ min: 1 }),
    body("discription", "entry must not be empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let current_task = await task.findById(req.params.id);
      if (!current_task) {
        return res.status(400).json((message = "selected task does not exist"));
      }
      let { Title, discription } = req.body;
      let Task= await task.findByIdAndUpdate(
        req.params.id,
        { $set: { Title, discription } },
        { new: true }
      );
      return res
        .status(200) 
        .send((Task));
    } catch (error) {
      console.log(error);
      return res.status(500).json((message = "internal server error"));
    }
  }
);
// updating status of a task
app.put(
  "/updateStatus/:id",
  async (req, res) => {
    try {
      let current_task = await task.findById(req.params.id);
      if (!current_task) {
        return res.status(400).json((message = "selected task does not exist"));
      }
      await task.findByIdAndUpdate(
        req.params.id,
        { $set: { status:'done' } },
        { new: true }
      );
      return res
        .status(200)
        .json((message = "well done for doing the task"));
    } catch (error) {
      console.log(error);
      return res.status(500).json((message = "internal server error"));
    }
  }
);

// deleting perticular task selected by user
app.delete("/deleteTask/:id", async (req, res) => {
  try {
    let current_task = await task.findById(req.params.id);
    if (!current_task) {
      return res.status(400).json((message = "selected task does not exist"));
    }
    await task.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json((message = "selected task is succesfully deleted"));
  } catch (error) {
    console.log(error);
    return res.status(500).json((message = "internal server error"));
  }
});

app.listen(port, () => {
  console.log(`app listening on localhost:${port}`);
});
