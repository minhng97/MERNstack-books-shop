const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const BlogPost = require('../models/BlogPost')
const User = require('../models/user')

// An api endpoint that returns a msg
router.get('/', (req, res) => {
    
    BlogPost.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log('server error: ', error)
        })
});

router.post('/save', verify, (req, res) => {
    console.log("Body: ", req.body)

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) { res.sendStatus(403)  } 
        else {

            const data = req.body

            const newBlogPost = new BlogPost(data)
        
            newBlogPost.save((error) => {
                if (error) {
                    res.status(500).json({ msg: "Internal server error" })
                    return;
                }
                // BlogPost
                return res.json({
                    msg: "We received the data"
                });
            });
        }}
    )
})

// USER PAGEs

// Go to login page
// localhost:8080/api/login
router.get('/login', (req,res) => {
    let arrUser;
    showUsers().then(() => res.json(data))
})

// Go to register page
router.get('/reg', (req,res) => {
    User.find({})
    .then((data) => {
        res.json(data)
    })
    .catch((error) => {
        console.log('server error: ', error)
    })
})


router.post('/reg', (req, res) => {
    console.log(req.body)
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    // jwt.sign({ user }, 'secretkey', { expiresIn: '1d' }, (err, token) => {
    //     res.json({
    //         token: token
    //     })
    // })

    const data = req.body

    const newUser = new User(data)

    newUser.save((error) => {
        if (error) {
            res.status(500).json({ msg: "Internal server error" })
            return;
        }
        // User
        return res.json({
            msg: "We received the data"
        });
    });


    
})

// Verify the post
// router.post('/post', verify, (req, res) => {

//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if (err) {
//             res.sendStatus(403)
//         } else {
//             res.json({
//                 message: 'Post created...',
//                 authData
//             })
//         }
//     })
// }
// );




function verify(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;

        next()
    } else {
        res.json({
            msg: 'You must login first'
        })
    }
}

module.exports = router