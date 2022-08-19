import { Optional , Sequelize, Model, DataTypes } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const db_username = process.env.DB_USERNAME as string
const db_password = process.env.DB_PASSWORD as string
const db_name = process.env.DB_NAME as string
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT

const sequelize = await new Sequelize(db_name, db_username, db_password, {
    host: db_host,
    port: parseInt(db_port),
    dialect: 'postgres',
    logging: false
})

export default sequelize