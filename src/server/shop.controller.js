import { pool } from "./db.js";
import { arr_Of_Values, camelToSnakeCase, _multiInsert } from "./utils.js";



export class ShopController {
async createShops(req, res){
    const values = arr_Of_Values()
const query_template = `INSERT INTO shops VALUES ${_multiInsert(values)}`

pool.query(query_template)
  

res.json("OK")

}
  async getShops(req, res) {
//     const { page
//         , limit
//         , total
//         , sortBy
//         , sortDirection
//         , filterValue
//         , column:queryColumn
//         , predicate
//     } = req.query;
// let queryString = "SELECT * from shops shop"
// const {rowCount} = await pool.query(queryString);

// if(queryColumn && predicate){
// let column = camelToSnakeCase(queryColumn)

//     let value = column === 'title'? filterValue : +filterValue.replace(/\D/g, '')
//     switch (predicate)
//     {
//       case "contain":{
//         if(column === 'title')
//         queryString += ` WHERE shop.${column} LIKE \'%${value}%\'`
//       break;}
//       case "equal":queryString +=` WHERE shop.${column} = ${value}`
//     break;
//     case "moreThen":queryString +=` WHERE shop.${column} > ${value}`
//     break;
//     case "lessThen":queryString +=` WHERE shop.${column} < ${value}`
//     break;
//     }
//     }
//     if(sortBy){
//         const direction = sortDirection.toUpperCase()
//         queryString += ` ORDER BY shop.${camelToSnakeCase(sortBy)} ${direction}`
//         }
// if(page){
//  queryString += ` LIMIT ${limit} OFFSET ${(page -1) * limit}`   
// }
const queryString = this.getQueryString(req)

console.log(queryString);
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
getQueryString(req){
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
// const {rowCount} = await pool.query(queryString);

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
}
}


export const shopController = new ShopController();
