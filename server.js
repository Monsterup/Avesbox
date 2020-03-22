const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth')
// const redis = require('./helpers/redis');
const user = require('./modules/user/routes')
const cors = require('cors');

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "https://avesbox.herokuapp.com");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS')
        return res.sendStatus(200);
    next();
});

let port = process.env.PORT || 5000;
global.config_ = require('./config');

app.use(isAuth);
app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));
app.use('/', user);

// redis.redisClient.on('connect', () => {
//     console.log('Redis connection successful');
// });

// redis.redisClient.on('error', err => {
// 	console.log(err);
// });

mongoose.connect(`${process.env.MONGODB_URI}?retryWrites=true`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    function (error) {
        if (error) console.log(error);

        console.log("connection successful");
    });

app.get('/test', (req,res) => {
    let House = require('./models/house');

    let house = new House();
    house.name = "Lorem Ipsum";
    house.save(function (err) {
        if (err)
            res.send(err);

        res.send({
            message: 'tambah data berhasil',
            data: house
        })
    });
});

app.listen(port, () => {
    console.log("App running on port " + port)
});