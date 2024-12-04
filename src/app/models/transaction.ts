import {FilterCategory, FilterType} from './filter';

export interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: FilterType;
  category: FilterCategory;
  date: Date;
}

