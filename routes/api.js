const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const BlogPost = require('../models/BlogPost');
const User = require('../models/user');
const Books = require('../models/books');

router.get('/', (req, res) => {
  fetchBlogPosts()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('server error: ', error);
    });
});

router.post('/save', verify, (req, res) => {
  console.log('Body: ', req.body);


  const data = req.body;

  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: 'Internal server error' });
      return;
    }
    // BlogPost
    return res.json({
      msg: 'We received the post',
    });
  });
});

// USER PAGEs

// Go to login page
router.post('/log', async (req, res) => {
  let data;
  let arrUser;

  data = req.body;
  arrUser = await fetchUsersData();

  validate();

  function validate() {
    arrUser = arrUser.filter((user) => user.username === data.username && user.password === data.password);

    if (arrUser.length > 0) {
      // Verify the data
      jwt.sign(data.username, 'secretkey', (err, token) => {
        if (err) {
          res.sendStatus(403);
        } else {
          res.send({
            msg: true,
            token,
          });
        }
      });
    } else {
      res.send({ msg: false });
    }
  }
});

// Go to register page
router.get('/reg', (req, res) => {
  fetchUsersData()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('server error: ', error);
      res.json({ msg: 'server error' });
    });
});


router.post('/reg', async (req, res) => {
  // Initial
  const data = req.body;

  let allUsers = [];
  let isUserInDatabase;

  // Functions start here

  const userIsExist = await checkUserData();

  if (userIsExist) {
    return res.send({ isUserExist: true });
  }
  saveUser();


  async function checkUserData() {
    allUsers = await fetchUsersData();

    isUserInDatabase = allUsers.filter(checkUser);

    if (isUserInDatabase.length > 0) { return true; }

    return false;
  }


  function checkUser(element) {
    return (element.username === data.username);
  }

  function saveUser() {
    // Save item to database
    const { username, password } = data;

    const newUser = new User({
      username,
      password: md5(password),
    });

    newUser.save((error) => {
      if (error) {
        res.status(500).send({ msg: '500 Internal server error' });
        return;
      }
      // User
      return res.send({
        isUserExist: false,
      });
    });
  }
});

router.post('/checkauth', verify, (req, res) => {
  console.log( 'token: ', req.token)
  res.send({
    msg: true,
    token: req.token
  });
});
// Books page

router.get('/allbooks', (req, res) => {
  fetchBooks()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.send({ msg: 'Error getting books' });
      console.log('server error: ', error);
    });
});


function fetchBlogPosts() {
  return Promise
    .resolve(BlogPost.find({}));
}

function fetchUsersData() {
  return Promise
    .resolve(User.find({}));
}

function fetchBooks() {
  return Promise
    .resolve(Books.find({}));
}

function verify(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    // Verify the post


    jwt.verify(bearerToken, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.token = bearerToken;

        next();
      }
    });
  } else {
    res.json({
      msg: 'You must login first',
    });
  }
}

module.exports = router;


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
