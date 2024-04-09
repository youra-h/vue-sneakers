import { type Models } from 'appwrite'

export interface IItem extends Models.Document {
    imageUrl: string
    title: string
    price: number
    favorite: boolean
}

export type TItems = IItem[]

export interface IFilters {
  sortBy: string
  search: string
}
