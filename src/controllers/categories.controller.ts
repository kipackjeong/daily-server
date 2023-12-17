import { NextFunction, Request, Response } from 'express';
import { CreateCategoryDto } from '@dtos/categories.dto';
import CategoriesService from '@services/categories.service';
import IController from '@interfaces/controller.interface';
import ICategory from '@interfaces/categories.interface';

class CategoriesController implements IController<ICategory> {
  public categoriesService = new CategoriesService();

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCategoriesData: ICategory[] = await this.categoriesService.findAllCategories();

      res.status(200).json({ data: findAllCategoriesData, message: 'get all success' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const catId: string = req.params.id;
      const findOneUserData: ICategory = await this.categoriesService.findCategoryById(catId);

      res.status(200).json({ data: findOneUserData, message: 'get by id success' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryData: CreateCategoryDto = req.body;
      const createUserData: ICategory = await this.categoriesService.createCategory(categoryData);

      res.status(201).json({ data: createUserData, message: 'create successful' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const catId: string = req.params.id;
      const categoryData: CreateCategoryDto = req.body;
      const updateTaskData: ICategory = await this.categoriesService.updateCategory(catId, categoryData);

      res.status(201).json({ data: updateTaskData, message: 'update successful' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const catId: string = req.params.id;
      const deleteCategoryData: ICategory = await this.categoriesService.deleteCategory(catId);

      res.status(200).json({ data: deleteCategoryData, message: 'delete successful' });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriesController;
