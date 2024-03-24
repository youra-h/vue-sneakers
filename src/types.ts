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
