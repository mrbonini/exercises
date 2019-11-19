const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {console.error(`server tentou iniciar, mas falhou ${err}`)})
mongoose.connection.once('open', () => {
   console.log('conectado menó')
})

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mrbonini:Kaique123@graphql-practice-tscgs.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true },);
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(collection)
//   // perform actions on the collection object
//   client.close();
// });


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000, () => {
    console.log('listening for requests on port 4000');
});