import dotenv from 'dotenv'
import { Optional , Sequelize, Model, DataTypes } from 'sequelize'
import { ProductTable } from '../models/product-model.js'
import sequelize from './Initdb.js'

dotenv.config()

const models = {
    Product: ProductTable
}

const db = {
    ...models,
    sequelize
};

export default db;