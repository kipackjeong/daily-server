import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import TasksController from '@/controllers/tasks.controller';
import { CreateTaskDto } from '@/dtos/tasks.dto';
import authMiddleware from '@/middlewares/auth.middleware';

class TasksRoute implements Routes {
  public path = '/tasks';
  public router = Router();
  public tasksController = new TasksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.tasksController.get);
    this.router.get(`${this.path}/:query`, authMiddleware, this.tasksController.get);
    this.router.get(`${this.path}/:id`, authMiddleware, this.tasksController.getById);
    this.router.get(`${this.path}/date/:dateStr`, authMiddleware, this.tasksController.getByDateStr);

    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateTaskDto, 'body'), this.tasksController.create);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateTaskDto, 'body', true), this.tasksController.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.tasksController.delete);
  }
}

export default TasksRoute;
