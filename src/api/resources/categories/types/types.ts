export type Category = {
  id: number;
  name: string;
  color: string;
};

export type AddCategory = Omit<Category, "id">;
