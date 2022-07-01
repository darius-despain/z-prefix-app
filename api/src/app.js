const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');

app.use(cors());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

app.use(express.json())

app.get('/', (req, res) => {
  console.log(`servicing GET for /`);
  res.set("Access-Control-Allow-Origin", "*");
  res.status(200).send('App root route running');
})

app.get('/posts', (req, res) => {
  console.log(`servicing GET for /posts`);
  knex('posts')
    .join('users', 'users.id', '=', 'posts.user_id')
    .select('posts.id as id',
      'posts.title as title',
      'posts.content as content',
      'users.username as author',
      'posts.created_at as created_at'
    )
    .then(data => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    })
})

app.get('/posts/:postId', (req, res) => {
  let { postId } = req.params;
  // console.log(params)
  console.log(`servicing GET for /posts/${postId}`);

  //only runs if postId is a number. Will crash if runs with a non-integer
  if(!isNaN(parseInt(postId))){
    knex('posts')
    .join('users', 'users.id', '=', 'posts.user_id')
    .select('posts.id as id',
        'posts.title as title',
        'posts.content as content',
        'users.username as author',
        'posts.created_at as created_at'
      )
    .where('posts.id', '=', postId)
    .then(data => {
      if(data.length > 0) {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).send(data);
      } else {
        res.status(404).send()
      }
    })
  }
})

app.get('/posts/user/:username', (req, res) => {
  let { username } = req.params;
  // console.log(params)
  console.log(`servicing GET for /posts/user/${username}`);

  knex('posts')
  .join('users', 'users.id', '=', 'posts.user_id')
  .select('posts.id as id',
      'posts.title as title',
      'posts.content as content',
      'users.username as author',
      'posts.created_at as created_at'
    )
    .where('users.username', '=', username)
    .then(data => {
      if(data.length > 0) {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).send(data);
      } else {
        res.status(404).send()
      }
    })
})

app.post('/posts/user/:username', async (req, res) => {
  let { username } = req.params;
  console.log(`servicing POST for /posts/user/${username}`);
  let body = req.body;
  let validreq = false;
  let validUser = false;
  let userId = 0;
  let keys = ['title', 'content', 'created_at'];

  if (body[keys[0]] && body[keys[1]] && body[keys[2]]) {
    if(body.created_at.charAt(10) === 'T' && body.created_at.charAt(body.created_at.length - 1) === 'Z') {
      validreq = true;
      // console.log('Valid req', validreq)
    }
  }

  if(username) {
    await knex('users')
      .select('*')
      .where('users.username', '=', username)
      .then(data => {
        if (data.length > 0) {
          validUser = true;
          userId = data[0].id
        } else {
          validUser = false;
        }
      })
  }

  let filteredBody = {
    title: body.title,
    content: body.content,
    user_id: userId,
    created_at: body.created_at,
  }

  if(validUser && validreq) {
    knex('posts')
      .returning(['id', 'title', 'content', 'user_id', 'created_at'])
      .insert(filteredBody)
      .then(data => {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).json(data);
      })
  } else {
    res.status(404).send()
  }
})

app.patch('/posts/:postId', async (req, res) => {
  let { postId } = req.params;
  console.log(`servicing PATCH for /posts/${postId}`);
  let body = req.body;
  let validreq = false;

  let keys = ['title', 'content', 'created_at'];

  if (body[keys[0]] || body[keys[1]] || body[keys[2]]) {
    if(body[keys[2]]){
      if(body.created_at.charAt(10) === 'T' && body.created_at.charAt(body.created_at.length - 1) === 'Z') {
        validreq = true;
        // console.log('Valid req', validreq)
      }
    } else {
      validreq = true;
    }
  }

  if(validreq) {
    knex('posts')
      .where('posts.id', '=', postId)
      .update(body, keys)
      .then(() => {
        knex('posts')
          .select('*')
          .where('posts.id', '=', postId)
          .then(data => {
            res.set("Access-Control-Allow-Origin", "*");
            res.status(200).json(data);
          })
        })
      } else {
    res.status(404).send()
  }
})

app.delete('/posts/:postId', (req, res) => {
  let { postId } = req.params;
  console.log(`servicing DELETE for /posts/${postId}`);

  knex('posts')
    .where('id', '=', postId)
    .del()
    .then(data => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json(`Number of records deleted: ${data}`)
    })
})

//user registration endpoint
app.post('/users', async (req, res) => {
  console.log(`servicing POST for /users`);

  let body = req.body;
  let validreq = false;
  let validUsername = false;
  let filteredBody = {};
  let hashedPassword;
  let userNamePromise;

  let keys = ['first_name', 'last_name', 'username', 'password'];

  if (body[keys[0]] && body[keys[1]] && body[keys[2]] && body[keys[3]]) {
    validreq = true;
    hashedPassword = bcrypt.hash(body.password, 10).then((hash) => {
      filteredBody = {
        'first_name': body[keys[0]],
        'last_name': body[keys[1]],
        'username': body[keys[2]],
        'password': hash,
      }
    });
    userNamePromise = knex('users')
      .where('username', '=', body.username)
      .select('*')
      .then(data => {
        if(data.length > 0) {
          validUsername = false
        } else {
          validUsername = true;
        }
      })
  }
  await Promise.all([hashedPassword, userNamePromise]);
  if(validreq && validUsername) {
    knex('users')
      .returning(['id', 'first_name', 'last_name', 'username'])
      .insert(filteredBody)
      .then(data => {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).send(data)
      })
  } else if(!validUsername) {
    res.status(404).send('username is taken');
  } else  {
    res.status(400).send('invalid request');
  }
} )

//user login endpoint
app.post('/login', async (req, res) => {
  console.log(`servicing POST for /login`);

  let body = req.body;
  let validreq = false;
  let keys = ['username', 'password'];

  if(body[keys[0]] && body[keys[1]]) {
    validreq = true;
  }

  if(validreq) {
    knex('users')
      .where('users.username', '=', body.username)
      .select('password')
      .then(data => {
        if(data.length > 0) {
          bcrypt.compare(body.password, data[0].password)
          .then(results => {
            if(results) {
              res.set("Access-Control-Allow-Origin", "*");
              res.status(200).send('authenticated')
            } else {
              res.set("Access-Control-Allow-Origin", "*");
              res.status(400).send('invalid password')
            }
          })
        } else {
          res.status(404).send('invalid username');
        }
      })
  } else {
    res.status(404).send('invalid request');
  }
})

//user profile get endpoint
app.get('/users/:username', (req, res) => {
  let { username } = req.params;
  console.log(`servicing GET for /users/${username}`);
  if(isNaN(parseInt(username))){
    knex('users')
      .where('username', '=', username)
      .select(
        'id',
        'first_name',
        'last_name',
        'username'
      )
      .then(data => {
        if(data.length > 0) {
          res.set("Access-Control-Allow-Origin", "*");
          res.status(200).send(data);
        } else {
          res.status(404).send()
        }
      })
  } else {
    console.log('invalid username')
  }
})

//update user profile endpoint
app.patch('/users/:id', async (req, res) => {
  let { id } = req.params;
  console.log(`servicing PATCH for /users/${id}`);

  let body = req.body;
  let validreq = false;
  let validUsername = true;
  let filteredBody = {};
  let hashedPassword;
  let userNamePromise;
  let keys = ['first_name', 'last_name', 'username', 'password'];
  console.log(`body: `, body)
  if (body[keys[0]] || body[keys[1]] || body[keys[2]] || body[keys[3]]) {
    validreq = true;
    if(body[keys[0]]){
      filteredBody.first_name = body.first_name
    }
    if(body[keys[1]]){
      filteredBody.last_name = body.last_name
    }
    if(body[keys[2]]){
      userNamePromise = knex('users')
        .where('username', '=', body.username)
        .select('*')
        .then(data => {
          if(data.length > 0) {
            validUsername = false
          } else {
            validUsername = true;
            filteredBody.username = body.username;
          }
        })
    }
    if(body[keys[3]]){
      hashedPassword = bcrypt.hash(body.password, 10).then((hash) => {
        filteredBody.password = hash;
      });
    }
  }
  await Promise.all([hashedPassword, userNamePromise]);
  console.log('filtered body: ', filteredBody);
  if(validreq && validUsername) {
    knex('users')
      .where('users.id', '=', id)
      .update(filteredBody)
      .returning(['id', 'first_name', 'last_name', 'username'])
      .then(data => {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).send(data)
      })
  } else if(!validUsername) {
    res.status(404).send('username is taken');
  } else  {
    res.status(400).send('invalid request');
  }
})

//delete user endpoint
app.delete('/users/:id', (req, res) => {
  let { id } = req.params;
  console.log(`servicing DELETE for /users/${id}`);
  knex('posts')
    .where('user_id', '=', id)
    .del()
    .then( () => {
      knex('users')
        .where('users.id', '=', id)
        .del()
        .then(data => {
          res.set("Access-Control-Allow-Origin", "*");
          res.status(200).json(`Number of records deleted: ${data}`)
        })
    })
})

module.exports = app;

