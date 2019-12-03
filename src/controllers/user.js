const User = require('../modals/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const addUser = (req, res) => {
    const {username, password, email} = req.body
    if(!username || !password || !email){
        return res.status(400).json({message : 'invalid credentials'})
    }
     
    User.findOne({email}).then((user) => {
        if(user){
            return res.status(400).json(`${user.username} already exists`)
        }

        const newUser = new User({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email
        })
    
        bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(newUser.password, salt, (err, hash) =>{
               if(err){
                   return res.json(err)
               }
               newUser.password = hash
               newUser.save().then((data) => {
                   jwt.sign({id : data.id},"shoppingList_jwtToken", {expiresIn : 3600}, (err, token) => {
                       if(err) return res.json(err)
                       res.json({user : data, token, msg : 'user created successfully'})
                   })
                }).catch(err => res.json(err))
           })
        })
    })
}

const auth = (req, res, next) => {
    const tokenValue = req.header('x-auth-token')
    try{
        const decoded = jwt.verify(tokenValue, "shoppingList_jwtToken")
        req.user = decoded
        next()
    }catch(err){
        res.status(401).json({msg : 'Token is not valid'})
    } 
}

const getUser = (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
}

const logoutUser = (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
}

const validateUser = (req, res) => {
    const { email, password} = req.body;

    User.findOne({email}).then(user => {
        if(!user){
            return res.json('user does not exist')
        }

        bcrypt.compare(password, user.password).then(isMathch => {
            if(!isMathch){
                return res.status(404).json({msg :'Invalid credentials'})
            }
            jwt.sign({id : user.id},"shoppingList_jwtToken", {expiresIn : 3600}, (err, token) => {
                if(err) return res.json(err)
                res.json({user : user, token, msg : 'user validated successfully'})
            })
        })
    })
}

const deleteUser = (req, res) => {
    const email = req.params.email
    User.findOneAndDelete({email}).then((item)  => res.json(item))
}

exports.deleteUser = deleteUser
exports.addUser = addUser
exports.getUser = getUser
exports.validateUser = validateUser
exports.auth = auth
exports.logoutUser = logoutUser