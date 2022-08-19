import dotenv from 'dotenv'
import * as cheerio from 'cheerio'
import axios from 'axios'
dotenv.config()

interface productCatalogType {
    name: string
    price: string
    upc: string
}

class Product {
    public async getCountItems() : Promise<number> {
        const elem = await axios.get('https://www2.hm.com/en_eur/kids/girls/view-all.html')
        const $ = cheerio.load(elem.data);
        return parseInt($('.filter-pagination').text().match(/\d+/g)[0])
    }
    public async getAllProducts() : Promise<productCatalogType[]> {
        const elem = await axios.get(`https://www2.hm.com/en_eur/kids/girls/view-all.html?sort=stock&image-size=small&image=model&offset=0&page-size=30`)
        const $ = cheerio.load(elem.data);
        let product = []
        for(let i = 1; i <= 30; i++) {
            console.log($(`.product-item:nth-child(${i}) .hm-product-item`).attr('data-articlecode'))
            product = [...product, {
                name: $(`.product-item:nth-child(${i}) .item-heading`).text().replace(/\s/g,''), 
                price: $(`.product-item:nth-child(${i}) .item-price .price`).text(),
                upc: $(`.product-item:nth-child(${i}) .hm-product-item`).attr('data-articlecode')
            }]
        }
        return product
    }
}

export default new Product;