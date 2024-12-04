export interface Filter {
  type : FilterType | undefined;
  category: FilterCategory | undefined;
}

export const FilterTypes: FilterType[] = ['income', 'expense'];
export type FilterType = 'income' | 'expense';

export const FilterCategories: FilterCategory[] = ['Groceries', 'Salary', 'Entertainment', 'Utilities', 'Others'];
export type FilterCategory = 'Groceries' | 'Salary' | 'Entertainment' | 'Utilities' | 'Others';
