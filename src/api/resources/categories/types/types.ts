export type Category = {
  id: number;
  name: string;
};

export type AddCategory = Pick<Category, "name">;
