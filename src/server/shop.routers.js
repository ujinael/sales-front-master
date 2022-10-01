import {Router} from "express"
import { shopController } from "./shop.controller.js"

const shopRouter =  Router()
shopRouter.get('/shops',shopController.getShops)
shopRouter.post('/shops',shopController.createShops)
export default shopRouter