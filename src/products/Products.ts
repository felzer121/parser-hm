import dotenv from 'dotenv'
import * as cheerio from 'cheerio'
import axios from 'axios'
import * as tunnel from 'tunnel';
dotenv.config()

interface productCatalogType {
    name: string
    price: string
    upc: string
}

const tunneler = tunnel.httpsOverHttp({
    proxy: {
        host: '185.118.67.187',
        port: 9949,
        proxyAuth: 'user86937:8omnp6',
    },
});

class Product {
    public async getCountItems() : Promise<number> {
        const elem = await axios.get('https://www2.hm.com/en_eur/kids/girls/view-all.html')
        const $ = cheerio.load(elem.data)
        return parseInt($('.filter-pagination').text().match(/\d+/g)[0])
    }
    public async getProduct(upc: string) : Promise<any> {

        const elem = await axios.get(`https://www2.hm.com/en_eur/productpage.${upc}.html`, {
            httpsAgent: tunneler
        })
        const $ = cheerio.load(elem.data);
        return ''
    }
    public async getAllProducts() : Promise<productCatalogType[]> {
        const countProduct = await this.getCountItems()
        const elem = await axios.get(`https://www2.hm.com/en_eur/kids/girls/view-all.html?sort=stock&image-size=small&image=model&offset=0&page-size=${countProduct}`)
        const $ = cheerio.load(elem.data);
        let product = []
        const arr = $(`.products-listing`).toString().split(`<li class="product-item">`)
        arr.map((item, i) => {
            console.log(`${i} / ${countProduct}`)
            const $ = cheerio.load(item);
            const upc = $(`.hm-product-item`).attr('data-articlecode')
            if(upc)
                product = [...product, {
                    name: $(`.item-heading`).text().replace(/^\s+|\s+$/g, ''), 
                    price: $(`.item-price .price`).text(),
                    upc: upc
                }]
        })
        return product
    }
}

export default new Product;