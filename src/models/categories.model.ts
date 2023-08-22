import { Document, model, Schema } from 'mongoose';
import ICategory from '@/interfaces/categories.interface';

const categorySchema: Schema = new Schema<ICategory>({
  title: {
    type: String,
    required: [true, 'Please provide the title for the task item.'],
  },
  icon: {
    type: String,
    required: [true, 'Please select icon to use for this category.'],
  },
  totalTimeSpent: {
    type: Number,
    default: 0,
  },
  averageFocusLevel: {
    type: Number,
    default: 0,
  },
});

const categoryModel = model<ICategory & Document>('Category', categorySchema);

export default categoryModel;
