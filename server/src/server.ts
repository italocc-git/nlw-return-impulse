import express from 'express'
import { routes } from './routes'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json({
    limit: '1000kb'
}))
app.use(routes)



app.listen(process.env.PORT || 3333, () => {
    console.log('HTTP running server')
})