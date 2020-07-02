import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import mongoose from 'mongoose';
import connection from '../config/db.js';
import User from "../model/user.js"

mongoose.Promise = global.Promise;
chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;
chai.should();

describe('test: Model User', function () {

    before(function () {
        /* before hook function */
    });

    it('connect to mongo mydb', function () {
        const { url, options } = connection;
        return mongoose.connect(url, options).should.not.be.rejected;
    });

    it('Save User', function () {
        const user = new User({
            name: '마이콜',
            email: 'michol@kickscar.me'
        });
        return user.save().should.eventually.be.equal(user);
    });

    it('Fetch Users', function () {
        return User.find({name: '마이콜'}).should.eventually.be.length(1);
    });

    it('Update User', async function () {
        const user = await User.findOne({name: '마이콜'});
        user.email = 'michol@gmail.com';

        return user.save().should.eventually.be.deep.equal(user);
    });

    it('Remove User', async function () {
        const user = await User.findOne({name: '마이콜'});
        return user.remove().should.eventually.be.deep.equal(user);
    });

    after(async function () {
        await mongoose.connection.dropCollection('users');
        mongoose.connection.close();
    });
});
