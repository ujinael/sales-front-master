import { pool } from "./db.js";
import { arr_Of_Values, camelToSnakeCase, _multiInsert } from "./utils.js";



export class ShopController {
async createShops(req, res){
    const values = arr_Of_Values()
const count = await (await pool.query('SELECT * from shops')).rowCount

if(count){ res.json("данные уже были созданы"); return;}

const query_template = `INSERT INTO shops VALUES ${_multiInsert(values)}`

pool.query(query_template)
  

res.json("данные созданы")

}
  async getShops(req, res) {

const queryString = SqlQueryHelper.getQueryString(req)
const {rowCount} = await pool.query('SELECT * from shops');
try {
      const {rows} = await pool.query(queryString);
    res.json({ total: rowCount, items: rows.map(r=>({
     title:r.title
     ,createdAt:r.created_at
     ,salesCount:r.sales_count 
     ,distance:r.distance  
    })) });
} catch (error) {
  res.statusCode = 500
res.json({code:500,error:new Error(`Ошибка sql запроса ${error}`)})
}
  
  }

}
class SqlQueryHelper {
  static getQueryString(req){
  const { page
    , limit
    , total
    , sortBy
    , sortDirection
    , filterValue
    , column:queryColumn
    , predicate
} = req.query;
let queryString = "SELECT * from shops shop"
if(queryColumn && predicate){
let column = camelToSnakeCase(queryColumn)

let value = column === 'title'? filterValue : +filterValue.replace(/\D/g, '')
switch (predicate)
{
  case "contain":{
    if(column === 'title')
    queryString += ` WHERE shop.${column} LIKE \'%${value}%\'`
  break;}
  case "equal":queryString +=` WHERE shop.${column} = ${value}`
break;
case "moreThen":queryString +=` WHERE shop.${column} > ${value}`
break;
case "lessThen":queryString +=` WHERE shop.${column} < ${value}`
break;
}
}
if(sortBy){
    const direction = sortDirection.toUpperCase()
    queryString += ` ORDER BY shop.${camelToSnakeCase(sortBy)} ${direction}`
    }
if(page){
queryString += ` LIMIT ${limit} OFFSET ${(page -1) * limit}`   
}
return queryString
}

}

export const shopController = new ShopController();
