import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const port = 3000
const app = express()




class App {

	public loadServer (): void {
        app.listen(port, () => {
            
        })
	}

}

export default new App;