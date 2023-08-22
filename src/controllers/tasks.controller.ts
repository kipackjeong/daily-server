import { NextFunction, Response } from 'express';
import { CreateTaskDto } from '@dtos/tasks.dto';
import ITask from '@interfaces/tasks.interface';
import TaskService from '@services/tasks.service';
import IController from '@/interfaces/controller.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';

class TasksController implements IController<ITask> {
  public taskService = new TaskService();

  public get = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user._id;

      const foundTasks: ITask[] = await this.taskService.findAllTasks(req.query, userId);
      console.log('foundTasks: ');
      console.log(foundTasks);
      res.status(200).json({ data: foundTasks, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId: string = req.params.id;

      const findOneUserData: ITask = await this.taskService.findTaskById(taskId);

      res.status(200).json({ data: findOneUserData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getByDateStr = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dateStr: string = req.params.dateStr;
      const userId = req.user._id;

      const tasksData: ITask[] = await this.taskService.findTasksByDate(dateStr, userId);

      res.status(200).json({ data: tasksData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskData: CreateTaskDto = req.body;
      const userId = req.user._id;

      const createUserData: ITask = await this.taskService.createTask(taskData, userId);

      res.status(201).json({ data: createUserData._id, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId: string = req.params.id;
      const taskData: CreateTaskDto = req.body;

      const updateTaskData: ITask = await this.taskService.updateTask(taskId, taskData);

      res.status(200).json({ data: updateTaskData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.params.id;

      const deleteUserData: ITask = await this.taskService.deleteTask(taskId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TasksController;
