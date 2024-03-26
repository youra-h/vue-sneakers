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

export function debounce<T>(this: T, fn: (this: T, ...args: any[]) => void, delay: number) {
  let timeoutID: number | null = null
  return function (this: T, ...args: any[]) {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => fn.apply(this, args), delay)
  }
}