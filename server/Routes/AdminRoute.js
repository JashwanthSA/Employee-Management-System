import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "6ca7c44cd97c6df61fb5e28f83e36d22878aa5fdaa223bd8dc4cda6374ac8d2a",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 

router.post('/add_employee', upload.single('image'),(req, res) => {
    // console.log(req.body);
    const {phoneno}=req.body;
    if (! /^\d{10}$/.test(phoneno)){
        return res.json({ Status: false, Error: "Phone number not valid" });
    }
    const {email}=req.body;
    if (! /\S+@\S+\.\S+/.test(email)){
        return res.json({ Status: false, Error: "Email not Valid" });
    }
    const sql = `INSERT INTO employee 
    (name,email,phoneno,salary,address,date,image,category_id) 
    VALUES (?)`;
    // bcrypt.hash(req.body.password, 10, (err, hash) => {
    //     if(err) return res.json({Status: false, Error: "Query Error"})
    //     const values = [
    //         req.body.name,
    //         req.body.email,
    //         req.body.phoneno,
    //         hash,
    //         req.body.salary,
    //         req.body.address,
    //         req.file.filename,
    //         req.body.category_id,
    //     ]
    //     con.query(sql, [values], (err, result) => {
    //         if(err) return res.json({Status: false, Error: err})
    //         return res.json({Status: true})
    //     })
    // })
    const values = [
        req.body.name,
        req.body.email,
        phoneno, // Use the validated phone number
        req.body.salary,
        req.body.address,
        req.body.date,
        req.file.filename,
        req.body.category_id,
    ];
    con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: err });
        return res.json({ Status: true });
    });
})

router.get('/employee', (req, res) => {
    // const sql = "SELECT * FROM employee";
    const sql = `
        SELECT e.*, c.name AS category_name 
        FROM employee e 
        LEFT JOIN category c ON e.category_id = c.id
    `;
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const {phoneno}=req.body;
    if (! /^\d{10}$/.test(phoneno)){
        console.log("Phone not valid");
        return res.json({ Status: false, Error: "Phone number not valid" });
    }
    const {email}=req.body;
    if (! /\S+@\S+\.\S+/.test(email)){
        return res.json({ Status: false, Error: "Email not Valid" });
    }
    const sql = `UPDATE employee 
        set name = ?, email = ?, phoneno = ?, salary = ?, address = ?, category_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        phoneno,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };
