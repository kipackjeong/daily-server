import mongoose from 'mongoose';
import IEntity from './entity.interface';

export type TimeInterval = {
  startTime: Date;
  endTime: Date;
};

interface ITask extends IEntity {
  _id: string;
  detail?: string;
  date: Date;
  reflection?: string;
  focusLevel?: number;
  position?: number;
  timeInterval: TimeInterval;
  taskType: string;
  category?: mongoose.Types.ObjectId;
  goal?: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  priority?: number;
}

export default ITask;
