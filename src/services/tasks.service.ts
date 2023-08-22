import { CreateTaskDto } from '@dtos/tasks.dto';
import { HttpException } from '@exceptions/HttpException';
import ITask from '@interfaces/tasks.interface';
import taskModel from '@models/tasks.model';
import { isEmpty } from '@utils/util';
import mongoose from 'mongoose';

class TaskService {
  public tasks = taskModel;

  public async findAllTasks(query?, userId?): Promise<ITask[]> {
    const mongooseQuery = this.tasks.find({ user: userId }).select('-__v');

    console.log('query: ');
    console.log(query);

    if (!query) {
      return await mongooseQuery;
    } else {
      if (query.taskType) {
        mongooseQuery.find({ taskType: query.taskType });
      }

      if (query.sort) {
        mongooseQuery.sort(query.sort);
        if (query.sort == 'priority') {
          mongooseQuery.sort({ priority: 1 });
        }
      }

      if (query.top) {
        const top = Number(query.top);
        mongooseQuery.limit(top);
      }

      if (query.after) {
        mongooseQuery.find({ 'timeInterval.startTime': { $gte: new Date(query.after) } });
      }
      if (query.before) {
        mongooseQuery.find({ 'timeInterval.startTime': { $lte: new Date(query.before) } });
      }

      return await mongooseQuery;
    }
  }

  public async findTaskById(taskId: string): Promise<ITask> {
    if (isEmpty(taskId)) throw new HttpException(400, 'TaskId is empty');

    const findTask: ITask = await this.tasks.findOne({ _id: taskId }).select('-__v');
    if (!findTask) throw new HttpException(409, "Task doesn't exist");

    return findTask;
  }

  public async findTasksByDate(dateStr: string, userId: string): Promise<ITask[]> {
    if (isEmpty(dateStr)) throw new HttpException(400, 'dateStr is empty');

    const yyyy = Number(dateStr.substring(0, 4));
    const mm = Number(dateStr.substring(5, 7)) - 1;
    const dd = Number(dateStr.substring(8, 10));

    const tasks: ITask[] = await taskModel
      .find({
        date: {
          $gte: new Date(yyyy, mm, dd),
          $lt: new Date(yyyy, mm, dd + 1),
        },
        user: userId,
      })
      .select('-__v');
    return tasks;
  }

  public async createTask(taskData: CreateTaskDto, userId: string): Promise<ITask> {
    if (isEmpty(taskData)) throw new HttpException(400, 'taskData is empty');

    taskData.user = new mongoose.Types.ObjectId(userId);

    const createTaskData: ITask = await taskModel.create(taskData);

    return createTaskData;
  }

  public async updateTask(taskId: string, taskData: CreateTaskDto): Promise<ITask> {
    if (isEmpty(taskData)) throw new HttpException(400, 'taskData is empty');

    const updateTaskData: ITask = await this.tasks.findByIdAndUpdate(taskId, taskData);
    if (!updateTaskData) throw new HttpException(409, "Task doesn't exist");

    return updateTaskData;
  }

  public async deleteTask(taskId: string): Promise<ITask> {
    const deleteTaskData: ITask = await this.tasks.findByIdAndDelete(taskId);

    if (!deleteTaskData) throw new HttpException(409, "Task doesn't exist");

    return deleteTaskData;
  }
}

export default TaskService;
