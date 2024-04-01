import { type Models } from 'appwrite'

export interface IItem extends Models.Document {
  imageUrl: string
  title: string
  price: number
}

export type TItems = IItem[]

export class Search {
  private _value: string

  constructor(value: string = '') {
    this._value = value
  }

  set value(val: string) {
    this._value = val
  }

  get value() {
    return this._value
  }

  toString() {
    return this._value ? `*${this._value}*` : ''
  }
}

export interface IFilters {
  sortBy: string
  search: Search
}
