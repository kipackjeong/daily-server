import mongoose, { Document, model, Schema } from 'mongoose';
import ITask from '@/interfaces/tasks.interface';
// refer: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/models/Pet.js

const taskSchema: Schema = new Schema<ITask>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'The user is required'],
  },
  detail: {
    type: String,
    isRequired: [true, 'The detail attribute is required  to create TaskModel.'],
  },
  reflection: {
    type: String,
    default: '',
  },
  focusLevel: {
    type: Number,
    default: 50,
  },
  date: {
    type: Date,
    isRequired: [true, 'The date attribute is required  to create TaskModel.'],
  },
  timeInterval: {
    type: { startTime: Date, endTime: Date },
    isRequired: [true, 'The timeInterval attribute is required  to create TaskModel.'],
  },
  taskType: {
    type: String,
    enum: ['To Do', 'Did'],
    default: 'To Do',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
  },
  priority: {
    type: Number,
  },
});

const taskModel = model<ITask & Document>('Task', taskSchema);

export default taskModel;
