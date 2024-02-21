import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  desc: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = mongoose.model("Tasks", taskSchema);

export default TaskModel;
