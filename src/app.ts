import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { envs } from './config'
import { routerApi } from './routes'
import { boomErrorHandler, errorHandler, logErrors } from './middlewares'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(envs.PORT, () => console.log(`Server listening on port ${envs.PORT}`))
