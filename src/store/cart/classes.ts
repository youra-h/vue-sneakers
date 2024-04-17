import { type IItem } from '../card'
import { type Models } from 'appwrite'
import type { ICart, ICartInput, ICartList } from './types'

export class Cart implements ICart {
    $id: string
    $databaseId: string
    $collectionId: string
    $createdAt: string
    $updatedAt: string
    $permissions: string[]
    item: IItem
    user_id: string
    count: number = 0

    constructor(data: ICart) {
        this.$id = data.$id
        this.$databaseId = data.$databaseId
        this.$collectionId = data.$collectionId
        this.$createdAt = data.$createdAt
        this.$updatedAt = data.$updatedAt
        this.$permissions = data.$permissions
        this.item = data.item
        this.user_id = data.user_id
        this.count = data.count
    }

    inc() {
        this.count++
    }

    dec() {
        this.count--
    }

    getInput(): ICartInput {
        return {
            item: this.item.$id,
            user_id: this.user_id,
            count: this.count
        }
    }

    static getInput(item: IItem, user_id: string, count: number = 0): ICartInput {
        return {
            item: item.$id,
            user_id,
            count
        }
    }
}

export class Carts implements ICartList {
    documents: ICart[] = []
    total: number = 0

    setData(data: Models.DocumentList<ICart>) {
        this.documents = data.documents.map((item) => new Cart(item))
        this.total = data.total
    }

    getDocuments(): ICart[] {
        return this.documents
    }

    getCartById(id: string): ICart | undefined {
        return this.documents.find((item) => item.$id === id)
    }

    getCartByItemId(id: string): ICart | undefined {
        return this.documents.find((item) => item.item.$id === id)
    }

    hasItem(itemId: string): boolean {
        return !!this.getCartByItemId(itemId)
    }

    is(): boolean {
        return this.documents.length > 0
    }

    add(item: ICart) {
        let cart = this.getCartByItemId(item.item.$id)

        if (!cart) {
            cart = new Cart(item)
            this.documents.push(cart)
        }

        cart.inc()
    }

    remove(item: ICart) {
        const index: number = this.documents.indexOf(item)

        if (index >= 0) {
            this.documents.splice(index, 1)
        }
    }

    inc(item: ICart) {
        const cart = this.getCartById(item.$id)

        if (cart) {
            cart.inc()
        } else {
            throw new Error('Not found')
        }
    }

    dec(item: ICart) {
        const cart = this.getCartById(item.$id)

        if (cart) {
            cart.dec()

            if (cart.count === 0) {
                this.remove(cart)
            }
        } else {
            throw new Error('Not found')
        }
    }

    totalPrice(): number {
        return this.documents
            .map((item: ICart) => item.item.price * item.count)
            .reduce((sum: number, current: number) => sum + current, 0)
    }

    clear(): void {
        this.documents.splice(0, this.documents.length)
        this.total = 0
    }
}
