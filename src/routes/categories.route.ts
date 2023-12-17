import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import CategoriesController from '@controllers/categories.controller';
import { CreateCategoryDto } from '@dtos/categories.dto';

class CategoriesRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public categoriesController = new CategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoriesController.get);
    this.router.get(`${this.path}/:id`, this.categoriesController.getById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCategoryDto, 'body'), this.categoriesController.create);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateCategoryDto, 'body', true), this.categoriesController.update);
    this.router.delete(`${this.path}/:id`, this.categoriesController.delete);
  }
}

export default CategoriesRoute;
