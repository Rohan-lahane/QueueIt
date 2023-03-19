const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  passwordHash: String,

  playlists:[
    {
        //syntax for object id as a type is from mongoose
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }
],
})


userSchema.set('toJson', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        //do not reveal passwords. 
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User

// module.exports = mongoose.model('User', schema)