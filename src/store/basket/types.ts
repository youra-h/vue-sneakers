import { type Models } from 'appwrite'
import { type IItem } from '../card'

export interface IBasketInput {
    item: string
    user_id: string
    count: number
}

type OmitItem = Omit<IBasketInput, 'item'>

export interface IBasket extends Models.Document, OmitItem {
    item: IItem
}

export interface IBasketList extends Models.DocumentList<IBasket> {}
