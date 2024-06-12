require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const { log } = require('console');

const corsurl = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsurl));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Multer storage configuration
app.use("/files", express.static("uploads"))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'E:/react sankar/idm/backend/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.CertificateNo + '-' + file.originalname);
    }
});

// Multer upload configuration
const upload = multer({ storage: storage });


const StuSchema = mongoose.Schema({
    StudentName: String,
    Course: String,
    CertificateNo: String,
    CFileName: String,
    Cpath: String
});
const loginschema = mongoose.Schema({
    userName: String,
    passWord: String
});
//Schema
const user = mongoose.model("user", loginschema)
const Student = mongoose.model("Certificates", StuSchema);


// Connect to MongoDB

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));



// API

app.get("/get", async function (req, res) {
    await Student.find()
        .then(function (user) {
            res.send(user).status(200);
        })
        .catch(error => res.send(error));
});

app.post("/create", upload.single("img"), async function (req, res) {

    const cnumber = await Student.findOne({ CertificateNo: req.body.CertificateNo })

    if (!cnumber) {
        const data = await Student.create({
            StudentName: req.body.StudentName,
            Course: req.body.Course,
            CertificateNo: req.body.CertificateNo,
            CFileName: req.file.filename,
            Cpath: req.file.path
        })

        await data.save();
        res.send(data)
    }
    else {
        res.send("Certificate Already Exist..!").status(500);
    }
})

app.get("/get/:id", async function (req, res) {
    Student.findById(req.params.id)
        .then(function (user) {
            res.send(user).status(200);
        })
        .catch(error => {
            res.send(error).status(400);
        });
});

app.put("/update/:id", upload.single("img"), async function (req, res) {

    Student.findById(req.params.id)
        .then((user) => {
            console.log(user);
            fs.unlinkSync(user.Cpath)
        })

    const data = await Student.findByIdAndUpdate(req.params.id, {
        $set: {
            StudentName: req.body.StudentName,
            Course: req.body.Course,
            CertificateNo: req.body.CertificateNo,
            CFileName: req.file.filename,
            Cpath: req.file.path
        }
    })
    res.send(data);
});

app.delete("/delete/:id", async function (req, res) {
    const data = await Student.findById(req.params.id);
    console.log(data);
    fs.unlinkSync(data.Cpath);
    const result = await Student.findByIdAndDelete(req.params.id)
    res.send(result);

});
app.post("/userverify", async function (req, res) {
    try {
        const { userName, pass } = req.body;
        console.log(pass);
        
        // Check if the user exists in the database
        const User = await user.findOne({ userName: userName });
       
            console.log(User)
            console.log(User.passWord)
        
        if (!User) {
            // If user does not exist, send an error response
            return res.status(404).json({ message: "User not found" });
        }
        
        // Check if the provided password matches the stored password
        if (User.passWord === pass) {
            // If the password matches, send a success response
            return res.status(200).json({ message: "User verified successfully" });
        } else {
            // If the password does not match, send an error response
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/verify", async function (req, res) {
    await Student.findOne({ CertificateNo: req.body.Cno })
        .then(function (user) {
            res.send(user).status(200);
        })
        .catch(error => {
            res.send(error).status(400);
        });
});

// server port
app.listen(port, () => {
    console.log("Server running on ", port);
})