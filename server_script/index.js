import express from "express"
import mysql from "mysql"
import cors from "cors"
import  env from "dotenv"

const app = express()
const port = 4009
env.config()
app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
const db = mysql.createConnection({
        host: process.env.Host || "localhost"
        ,user: process.env.User || "root"
        ,password: process.env.Password || "password"
        ,database: process.env.Database || "student_register"
})

db.connect((err,res)=>{
    if(err){
        console.log("There is the error please check it",err)
    }
    else{
        console.log("DB connected successfully")
    }
})
//C
app.post('/post',(req,res)=>{
    const {name,email,phone,enroll_number,date_of_admission} = req.body
    let query = "insert into list(name,email,phone,enroll_number,date_of_admission) values(? , ? , ? , ? , ?)"
    db.query(query,[name,email,phone,enroll_number,date_of_admission],(err,ress)=>{
        if(ress){
            console.log("Posted successfully",ress);
            res.send({status:"inserted"})
        }
        else{
            console.log("There is the error please check it",err);
        }
    })
})
//R
app.get("/view",(req,res)=>{
    let query = "select * from list"
    db.query(query,(err,result)=>{
        if(err){
            console.log("Error found")
        }
        else{
            console.log("Resulted here",result)
            res.send(result)
        }
    })
})
//U
app.get('/edit/:id',(req,res)=>{
    const sql = "SELECT * FROM list  where enroll_number = ?"
    const id = req.params.id
    db.query(sql,[id],(err,result)=>{
        if(err)return res.json({Error : err})
        res.json(result)
        
    })
})
app.put('/update/:id',(req,res)=>{
    const sql = `UPDATE list SET name = ?
                    , email = ?
                    , phone = ?
                    , date_of_admission = ?
                 where enroll_number = ?`

    const id = req.params.id
    const {name,email,phone,date_of_admission} = req.body
    db.query(sql,[name,email,phone,date_of_admission,id],(err,result)=>{
        if(err) return res.json("ERROR")
        return res.json({updated:true})
    })
 
})
//D
app.get("/deleted/:id",(req,res)=>{
    const {id} = req.params
    let query = "delete from list where enroll_number = ?"
    db.query(query,[id],(err,ress)=>{
        if(err){
            console.log("error there",err);
        }
        else{
            console.log("Successfully deleted",ress);
            res.send(ress)
        }
    })
})

app.listen(process.env.Port || port,()=>console.log("The server is running in the localhost",port))
