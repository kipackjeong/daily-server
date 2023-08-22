export default interface ICategory {
  _id: string;
  title: string;
  icon: string;
  totalTimeSpent?: number;
  averageFocusLevel?: number;
}
