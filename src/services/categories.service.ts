import { CreateCategoryDto } from '@dtos/categories.dto';
import { HttpException } from '@exceptions/HttpException';
import ICategory from '@interfaces/categories.interface';
import categoryModel from '@models/categories.model';
import { isEmpty } from '@utils/util';

class CategoryService {
  public categories = categoryModel;

  public async findAllCategories(): Promise<ICategory[]> {
    const categories: ICategory[] = await this.categories.find();
    return categories;
  }

  public async findCategoryById(catId: string): Promise<ICategory> {
    if (isEmpty(catId)) throw new HttpException(400, 'CatId is empty');

    const findCategory: ICategory = await this.categories.findOne({ _id: catId });

    if (!findCategory) throw new HttpException(409, "Category doesn't exist");

    return findCategory;
  }

  public async createCategory(categoryData: CreateCategoryDto): Promise<ICategory> {
    if (isEmpty(categoryData)) throw new HttpException(400, 'categoryData is empty');

    const createCategoryData: ICategory = await this.categories.create(categoryData);

    return createCategoryData;
  }

  public async updateCategory(catId: string, categoryData: CreateCategoryDto): Promise<ICategory> {
    if (isEmpty(categoryData)) throw new HttpException(400, 'categoryData is empty');

    const updateCategoryData: ICategory = await this.categories.findByIdAndUpdate(catId, categoryData);
    if (!updateCategoryData) throw new HttpException(409, "Category doesn't exist");

    return updateCategoryData;
  }

  public async deleteCategory(catId: string): Promise<ICategory> {
    const deleteCategoryData: ICategory = await this.categories.findByIdAndDelete(catId);
    if (!deleteCategoryData) throw new HttpException(409, "Category doesn't exist");

    return deleteCategoryData;
  }
}

export default CategoryService;
