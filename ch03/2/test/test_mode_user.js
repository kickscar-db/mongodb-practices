import User from "../model/user.js"

console.log(User)

User.create({
    name: '둘리',
    email: 'kickscar@gmail.com'
}, function(err, user){
    if(err)
        throw err;

    console.log(user);
})