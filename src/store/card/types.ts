import { type Models } from 'appwrite'

export interface IItem extends Models.Document {
  imageUrl: string
  title: string
  price: number
}

export type TItems = IItem[]

export interface IFilters {
  sortBy: string
  search: string
}
