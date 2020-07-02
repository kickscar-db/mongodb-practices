import mongoose from 'mongoose';
import db from './config/db.js';

mongoose.connect(db.url, {
    //useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 1000
})
    .catch(e => {
        console.log(e.constructor.toString());
        console.log(e.name == 'MongoNetworkError');
    })
    .then((o) => {

        console.log('Successfully connected to mongodb-', o)

        // User.create({
        //     name: '둘리',
        //     email: 'kickscar@gmail.com'
        // }, function (err, user) {
        //     if (err)
        //         throw err;
        //
        //     console.log(user);
        //     mongoose.connection.close()
        // });

    })