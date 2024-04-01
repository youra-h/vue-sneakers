import { APP_WRITE_ID, APP_WRITE_ENDPOINT } from '@/utils/appwrite/constants'
import { Account, Client, Databases, Storage } from 'appwrite'

const client = new Client()

client.setEndpoint(APP_WRITE_ENDPOINT).setProject(APP_WRITE_ID)

export const account: Account = new Account(client)
export { ID } from 'appwrite'
export const storage: Storage = new Storage(client)
export const db: Databases = new Databases(client)
