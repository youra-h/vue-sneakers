export function debounce<T>(this: T, fn: (this: T, ...args: any[]) => void, delay: number) {
  let timeoutID: number | null = null
  return function (this: T, ...args: any[]) {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => fn.apply(this, args), delay)
  }
}
