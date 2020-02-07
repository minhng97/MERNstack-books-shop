const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const md5 = require("md5")

const BlogPost = require('../models/BlogPost')
const User = require('../models/user')

// An api endpoint that returns a msg
router.get('/', (req, res) => {

    fetchBlogPosts()
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log('server error: ', error)
        })
});

router.post('/save', verify, (req, res) => {
    console.log("Body: ", req.body)


    const data = req.body

    const newBlogPost = new BlogPost(data)

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: "Internal server error" })
            return;
        }
        // BlogPost
        return res.json({
            msg: "We received the post"
        });
    });

})

// USER PAGEs

// Go to login page
router.post('/log', async (req, res) => {
    var data;
    var arrUser;

    data = req.body
    arrUser = await fetchUsersData()

    validate()

    function validate() {
        arrUser = arrUser.filter(user => {
            return user.username === data.username && user.password === data.password
        })

        if (arrUser.length > 0) {
            // Verify the data
            jwt.sign(data.username, 'secretkey', (err, token) => {
                if (err) {
                    res.sendStatus(403)
                } else {
                    res.send({
                        msg: true,
                        token
                    })
                }
            })


        } else {
            res.send({ msg: false })
        }
    }
})

// Go to register page
router.get('/reg', (req, res) => {
    fetchUsersData()
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log('server error: ', error)
            res.json({ msg: "server error" })
        })
})


router.post('/reg', async (req, res) => {
    // Initial
    var data = req.body
    console.log("user from client: ", data)
    var allUsers = []
    var isUserInDatabase;

    // Functions start here

    var userIsExist = await checkUserData()

    saveUser()

    async function checkUserData() {
        allUsers = await fetchUsersData()

        isUserInDatabase = allUsers.filter(checkUser)

        if (isUserInDatabase.length > 0) { return true }
        else {
            return false
        }
    }


    function checkUser(element) {
        return (element.username === data.username)
    }

    function saveUser() {

        if (userIsExist) {
            return res.send({ isUserExist: true })
        } else {
            // Save item to database
            const { username, password } = data

            const newUser = new User({
                username,
                password: md5(password)
            })

            newUser.save((error) => {
                if (error) {
                    res.status(500).send({ msg: "500 Internal server error" })
                    return;
                }
                // User
                return res.send({
                    isUserExist: false
                });
            });

        }
    }











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

function fetchBlogPosts() {
    return Promise
        .resolve(BlogPost.find({}))
}

function fetchUsersData() {
    return Promise
        .resolve(User.find({}))
}


function verify(req, res, next) {
    const bearerHeader = req.headers['authorization'];
console.log("req: ", req.headers)
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        // Verify the post


        jwt.verify(bearerToken, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {

                req.token = bearerToken;

                next()
            }
        })


    } else {
        res.json({
            msg: 'You must login first'
        })
    }
}

module.exports = router