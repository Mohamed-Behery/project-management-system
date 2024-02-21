import TaskModel from "../models/TaskModel.js";

export const addTask = async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(200).json({ message: "Task Added Successfuly" });
  } catch (err) {
    res.json({ massege: err });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json({
      message: "You Got All Tasks Successfuly",
      data: {
        tasks,
      },
    });
  } catch (err) {
    res.json({ message: err });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ message: "Task Updated Successfuly", data: updatedTask });
  } catch (err) {
    res.json({ message: err });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.json({message: "Task Deleted Successfuly"})
  } catch (err) {
    res.json({ message: err });
  }
};
