import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const rl = readline.createInterface({
    input,
    output
  });


    Object.defineProperty(String.prototype, "toSnakeCase", {
      value: function toSnakeCase() {
          return this.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          .map(x => x.toLowerCase())
          .join('_');;
      },
      writable: true,
      configurable: true,
  });   
 const modelName = await rl.question('Название модели:\n');
 const storeCompletitionInput = await rl.question('Создать store?(y/n):\n'); 
 const storeCompletition = storeCompletitionInput === 'y'? true : false
rl.close()
const rootPath = path.join(__dirname, `src/stores`)
async function createDir(name,relPath="models", root = path.join(__dirname, `src/stores`)){
  const dirPath = path.join(root, relPath,name.toSnakeCase());
fs.mkdir(dirPath,er=>{if(er)throw er})
console.log(`Directory created at :${dirPath}`);
return dirPath

} 

async function createFile(name,content,directory,_prefix,_appendix)
{
  const filePath = path.join(directory,`${_prefix??''}${name.toSnakeCase()}${_appendix??''}.ts`)
  fs.appendFile(filePath,content,er=>{
if(er)throw er
    })
    console.log(`File created at :${filePath}`);
   
}
//CREATE MODEL
const modelIndexContent = 
`
export * from \'@stores/modules/${modelName.toSnakeCase()}s/entity/${modelName.toSnakeCase()}'\
`
const modelContent = 
`
import { Type } from \"class-transformer\"
${
  storeCompletition?
`import {Create${modelName}Dto,Update${modelName}Dto} from \'../dto/\'`
:''
}
export class ${modelName}
{
id?:string
  constructor(
){}

${
storeCompletition?
`
toCreate():Create${modelName}Dto{
return {...this}

}
toUpdate():Update${modelName}Dto{
return {...this,id:this.id!}

}
`
:
''
}


}
`


const moduleDirectory = await createDir(modelName+'s','modules')

const modelDirectory = await createDir('entity',`modules/${modelName.toSnakeCase()}s`)

await createFile(modelName,modelContent,modelDirectory)
await createFile('index',modelIndexContent,rootPath + '/models')
if(storeCompletition){
const storeContent = 
`
import { defineStore } from \'pinia\'
import { ${modelName} } from \'@stores/models/\';
import {  Api } from \'@stores/server.api\';
type ${modelName}sState = {
  loading: boolean,
  ${modelName.toLowerCase()}: ${modelName} | null,
  ${modelName.toLowerCase()}s:${modelName}[]
}
export const use${modelName}sStore = defineStore('${modelName.toLowerCase()}s', {
  state: ():${modelName}sState => {
    return {
      loading: false,
      ${modelName.toLowerCase()}: null,
      ${modelName.toLowerCase()}s:[]
     
    }
  },
  actions: {
  
  }
  })


`
const createDtoContent = `
export interface Create${modelName}Dto{

}
`
const updateDtoContent = `
export interface Update${modelName}Dto{
}
`
const indexDtoContent = `
export * from \'./create-${modelName.toSnakeCase()}.dto\'
export * from \'./update-${modelName.toSnakeCase()}.dto\'

`

const dtoDirectory = await createDir('dto',`modules/${modelName.toSnakeCase()}s`)


await createFile(`${modelName.toSnakeCase()}s`,storeContent,moduleDirectory,'use-','.store')
await createFile(`${modelName.toSnakeCase()}`,createDtoContent,dtoDirectory,'create-','.dto')
await createFile(`${modelName.toSnakeCase()}`,updateDtoContent,dtoDirectory,'update-','.dto')
await createFile(`index`,indexDtoContent,dtoDirectory)
}