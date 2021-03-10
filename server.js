import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(fileUpload());

//Upload endpoint

app.post('/upload',(req,res)=>{
    if(req.files === null){
        return res.status(400).json({msg:'No file uploaded'});
    }

    const file = req.files.file;
    //console.log('entra + ', file);

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err =>{
        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})


app.listen(5000, ()=> console.log(`Servidor en puerto 5000`))