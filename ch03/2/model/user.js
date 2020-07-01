import mongoose from 'mongoose';
import db from '../config/db.js';

mongoose.Promise = global.Promise;

mongoose.connect(db.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('Successfully connected to mongodb')
        mongoose.connection.close()
    })
    .catch(e => console.error(e));


const user = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    joinDate: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false
});

// autoIncrement.initialize(mongoose.connection);
// user.plugin(autoIncrement.plugin, 'User');
// module.exports = mongoose.model('User', user);

export default mongoose.model('User', user);