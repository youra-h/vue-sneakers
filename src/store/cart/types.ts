import { type Models } from 'appwrite'
import { type IItem } from '../card'

export interface ICartInput {
    item: string
    user_id: string
    count: number
}

type OmitItem = Omit<ICartInput, 'item'>

export interface ICart extends Models.Document, OmitItem {
    item: IItem
}

export interface ICartList extends Models.DocumentList<ICart> {}
