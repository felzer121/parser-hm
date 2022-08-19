import App from './providers/App.js'

import * as os from 'os';
import cluster from 'cluster';
import Products from './products/Products.js';
import db from './providers/Database.js';


if(cluster.isPrimary) {
    App.loadServer();
    await db.sequelize.authenticate();
    await db.sequelize.sync()

    const products = await Products.getAllProducts()
    console.log('www')
    products.map(async product => {
        const isCreate = await db.Product.findOne({
            where: {
                upc: product.upc
            }
        })
        if(isCreate) 
            await db.Product.update({
                name: product.name,
                price: product.price,
                upc: product.upc
            },{ where: { upc: product.upc } })
        else 
            await db.Product.create({
                name: product.name,
                price: product.price,
                upc: product.upc
            })
    })
} else {

}