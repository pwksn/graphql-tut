const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mongoDB
mongoose.connect(
	'mongodb+srv://pwksn:CIoXNMpjFFBEtCgv@cluster0.yw27m.mongodb.net/?retryWrites=true&w=majority'
);
mongoose.connection.once('open', () => {
	console.log('connected to database.');
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(4000, () => {
	console.log('Listening for requests on port 4000.');
});
