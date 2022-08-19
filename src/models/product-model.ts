
import { Sequelize, DataTypes,  Model } from 'sequelize'
import sequelize from '../providers/Initdb.js';

class Product extends Model {
    instanceLevelMethod() {
        return 'bar';
    }
}

export const ProductTable = Product.init({
    name: DataTypes.STRING,
    upc: DataTypes.STRING,
    price: DataTypes.STRING,
}, {sequelize})