import { type Models } from 'appwrite'

export interface IBasketInput {
    item: string
    user_id: string
}

export interface IBasket extends Models.Document, IBasketInput {}

export type TBaskets = {
    list: IBasket[]
    count: number
}
