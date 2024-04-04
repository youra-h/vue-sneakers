let timeout: number | null = null

export function debounce(func: (...args: any[]) => void, delay: number) {
    const later = () => {
        clearTimeout(timeout!)
        func()
    }

    clearTimeout(timeout!)

    timeout = setTimeout(later, delay)
}
