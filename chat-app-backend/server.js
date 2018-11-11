const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'shayanb',
    password : 'shayandude9',
    database : 'chatapp'
  }
});

const app = express();

// middlewares

app.use(bodyParser.json());
app.use(cors());

// middlewares

app.get('/', (req,res) => {
	res.send(db.users);
})

app.post('/signin', (req,res) => {
	db.select('email','hash').from('login')
	.where('email','=', req.body.email)
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		if(isValid){
			return db.select('*').from('users')
				.where('email','=', req.body.email)
				.then(user => {
					res.json(user[0]);
				})
				.catch(err => res.status(400).json('unable to get user'))
		} else {
			res.status(400).json('wrong username or password')
		}
	})
	.catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req,res) => {
	const { email,password,firstname,lastname,username } = req.body;

	const hash = bcrypt.hashSync(password, saltRounds);
	console.log(hash);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
					firstname:firstname,
					lastname:lastname,
					username:username,
					email:loginEmail[0],
					joined: new Date()
				})
			.then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json("Unable to register"))
})

app.get('/profile/:username', (req,res) => {
	const { username } = req.params;
	db.select('*').from('users').where({
			username: username
	}).then(user => {
		if(user.length) {
			res.status(200).json(user[0])
		} else {
			res.status(404).json('not found')
		}
	}).catch(err => res.status(404).json('error getting user'))
});

app.listen( 3000, () => {
	console.log('server is running on port 3000');
})