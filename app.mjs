import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
const PORT = process.env.PORT || 8000;
const app = express();
const __dirname = path.resolve();
const dbURL = 'mongodb+srv://dbprac:dbprac@cluster0.eoswt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//  Bcrypt-izi
import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const SECRET = process.env.SECRET || "12345"
app.use(express.json());
app.use(cookieParser())
// app.use(cors(["localhost:3000", "localhost:8000"]))
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    credentials: true
}))
app.use('/',express.static(path.join(__dirname, 'web/build')));
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
})
// Mongo schema
mongoose.connect(dbURL);
const USER = mongoose.model('Users', 
    { 
    fullName: String,
    email: String,
    phone: String,
    password: String,
    address: String,
    created: {
        type: String,
        default: Date.now
    }
    }
);
const Post = mongoose.model("Post", 
    {
    postText: String,
    created: { type: Date, default: Date.now },

    userId: String,
    fullName: String,
    email: String,
    }
);
// Login
app.post('/api/v1/login', (req, res) => {

    if (!req.body.email || !req.body.password) {
        console.log("email and password is required");
        res.status(403).send("required field missing");
        return;
    }
    console.log("req.body: ", req.body);

    USER.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {

                varifyHash(req.body.password, user.password).then(result => {
                    if (result) {
                        var token = jwt.sign({
                            fullName: user.fullName,
                            email: user.email,
                            phone: user.phone,
                            address: user.address,
                            _id: user._id,
                        }, SECRET);
                        res.cookie("token", token, {
                            httpOnly: true,
                            // expires: (new Date().getTime + 300000), //5 minutes
                            maxAge: 300000
                        });
                        res.send({                      
                            token: token,
                            fullName: user.fullName,
                            email: user.email,
                            phone: user.phone,
                            address: user.address,
                            _id: user._id,
                        });
                    } else {
                        res.status(401).send("Authentication fail");
                    }
                }).catch(e => {
                    console.log("error: ", e)
                })

            } else {
                res.send("user not found");
            }
        }
    })
})
// Sign Up

app.post('/api/v1/signup', (req, res) => {

    if (!req.body.email || !req.body.fullName || !req.body.address || !req.body.password || !req.body.phone) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } else {

        USER.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
                res.send("user already exist");
            } else {
                console.log(req.body)

                stringToHash(req.body.password).then(passwordHash => {
                    console.log("hash: ", passwordHash);

                    let newUser = new USER({
                        fullName: req.body.fullName,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: passwordHash,
                        address: req.body.address,
                    })
                    newUser.save(() => {
                        console.log("data saved")
                        res.send('profile created')
                    })
                })
            }
        })
    }

})
// All Post
// app.get('/api/v1/dashboard', (req, res) => {

//     POST.find({}, (err, data) => {

//         if(err){
//             res.status(500).send("error in getting database")
//         }else{
//             res.send(data)
//         }

//     })
// })
// // Create Post
// app.post('/api/v1/createpost', (req, res) => {

//     console.log(req.body)

//     let newPost = new POST({
//         post: req.body.post,
//         userName: req.body.userName
//     })
//     newPost.save(() => {
//         console.log("data saved")
//         res.send('Post created')
//     })

// })
// Redirect Url

app.use((req, res, next) => {

    jwt.verify(req.cookies.token, SECRET,
        function (err, decoded) {

            req.body._decoded = decoded;

            console.log("decoded: ", decoded) // bar

            if (!err) {
                next();
            } else {
                res.status(401).sendFile(path.join(__dirname, "./web/build/index.html"))
            }

        })

})
app.post('/api/v1/logout', (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 300000
    });
    res.send();
})

app.get('/api/v1/profile', (req, res) => {
    USER.findOne({ email: req.body._decoded.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {
                res.send({
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    _id: user._id,
                });
            } else {
                res.send("user not found");
            }
        }
    })
})
// Post 
app.post("/api/v1/post", (req, res) => {
    const newPost = new Post({
        postText: req.body.postText,
        userId: req.body._decoded._id,
        fullName: req.body._decoded.fullName,
        email: req.body._decoded.email
    });
    newPost.save().then(() => {
        console.log("Post created");
        res.send("Post created");
    });
});

app.delete("/api/v1/post", (req, res) => {
    Post.deleteOne({ _id: req.body.id, userId: req.body._decoded._id }, (err, data) => {
        res.send("Post deleted");
    });
});

app.put("/api/v1/post", (req, res) => {
    Post.updateOne({
        _id: req.body.id,
        userId: req.body._decoded._id
    }, {
        postText: req.body.postText
    }, (err, data) => {
        res.send("Post update");
    });
});

app.get("/api/v1/posts", (req, res) => {

    const page = Number(req.query.page);

    console.log("page: ", page);

    Post.find({})
        .sort({ created: "desc" })
        .skip(page)
        .limit(2)
        .exec(function (err, data) {
            res.send(data);
        });
});


app.get("/**", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
    // res.redirect("/")
})
app.listen(PORT, ()=>{
    console.log(`Example app listening at http://localhost:${PORT}`);
}); 