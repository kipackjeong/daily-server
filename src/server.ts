import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import CategoriesRoute from './routes/categories.route';
import TasksRoute from './routes/tasks.route';
import App from 'app';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new TasksRoute(), new CategoriesRoute()]);

app.listen();
