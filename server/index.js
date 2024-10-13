

import "dotenv/config"
import mongoose from "mongoose"
import express from "express"
import cors from "cors"



const app = express()


const  PORT = process.env.PORT


app.use(cors())

app.use(express.json())


// DB CONECTION

