export const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
import * as uuid from "uuid"

export const _multiInsert = arrOfValues => {
    const _remLastChar = str => str.slice(0, str.length - 1);

      let foramttedQuery = '';

      arrOfValues.forEach(row => {
        let newRow = '';
        for (const val of Object.values(row)) {
          let newValue = '';
          if (typeof val === 'string') newValue = `'${val}',`;
          else newValue = `${val},`;
          newRow = newRow.concat(newValue);
        }

        foramttedQuery = foramttedQuery.concat(`(${_remLastChar(newRow)}),`);
      });

      return _remLastChar(foramttedQuery);
    };

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }
const shopTypes = ['магазин','кофейня','кафе']
const shopLocations = [
    'ветеранов', 'ленинском','нарвской','балтийской','техноложке',
    'боровой','невском','кировском','московской','звездной',
    'петроградской','богатырском','достоевской','сенной'
    ,'лесной','выборгской'
] 
   export  const arr_Of_Values = ()=>{
    return [...new Array(60).keys()].map(i=>({
    id:uuid.v4(),
    title:`${shopTypes[getRndInteger(0,3)]} на ${shopLocations[getRndInteger(0,16)]}`,
    sales_count:getRndInteger(4,100),
    distance:getRndInteger(1,15)    
    }))
}