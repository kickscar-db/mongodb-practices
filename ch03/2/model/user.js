import mongoose from 'mongoose';

const user = new mongoose.Schema({
    email: String,
    name: String
},{
    versionKey: false
});

// autoIncrement.initialize(mongoose.connection);
// user.plugin(autoIncrement.plugin, 'User');
// module.exports = mongoose.model('User', user);

export default mongoose.model('User', user);