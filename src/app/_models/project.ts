import { Category } from './category';

export class Project {
  id:number;
  imageUrl:string;
  title:string;
  description:string;
  githubUrl:string;
  categoryId:number;
  category: Category;
}
