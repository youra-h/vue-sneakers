import { type IItem } from '../card'
import { type Models } from 'appwrite'
import type { IBasket, IBasketInput, IBasketList } from './types'

export class Basket implements IBasket {
    $id: string
    $databaseId: string
    $collectionId: string
    $createdAt: string
    $updatedAt: string
    $permissions: string[]
    item: IItem
    user_id: string
    count: number = 0

    constructor(data: IBasket) {
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

    getInput(): IBasketInput {
        return {
            item: this.item.$id,
            user_id: this.user_id,
            count: this.count
        }
    }

    static getInput(item: IItem, user_id: string, count: number = 0): IBasketInput {
        return {
            item: item.$id,
            user_id,
            count
        }
    }
}

export class Baskets implements IBasketList {
    documents: IBasket[] = []
    total: number = 0

    setData(data: Models.DocumentList<IBasket>) {
        this.documents = data.documents.map((item) => new Basket(item))
        this.total = data.total
    }

    getDocuments(): IBasket[] {
        return this.documents
    }

    getBasketByItemId(id: string): IBasket | undefined {
        return this.documents.find((item) => item.item.$id === id)
    }

    hasItem(itemId: string): boolean {
        return !!this.getBasketByItemId(itemId)
    }

    add(item: IBasket) {
        let basket = this.getBasketByItemId(item.item.$id)

        if (!basket) {
            basket = new Basket(item)
            this.documents.push(basket)
        }

        basket.inc()
    }

    remove(item: IBasket) {
        const index: number = this.documents.indexOf(item)

        if (index >= 0) {
            this.documents.splice(index, 1)
        }
    }

    dec(item: IBasket) {
        const basket = this.getBasketByItemId(item.item.$id)

        if (basket) {
            basket.dec()

            if (basket.count === 0) {
                this.remove(basket)
            }
        }
    }

    totalPrice(): number {
        return this.documents
            .map((item: IBasket) => item.item.price * item.count)
            .reduce((sum: number, current: number) => sum + current, 0)
    }
}
