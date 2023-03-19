const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const Playlist = require('./models/playlist')
const User = require('./models/user')

const resolvers = {
    Query: {
      allPlaylists: () => playlists,
      findPlaylist: (root, args) =>{ 
        playlists.find(p => p.name === args.name)
        },


      findUser: async (root, args) =>{
        console.log("find user args ",args)

        const user= await User.findById(args.id)
        return user
        // users.find(p => p.name === args.name)
        },


      me: async (root, args, context) => {
        console.log("me args context ", context.currentUser)
        const currentUser = context.currentUser
        if(!currentUser){ throw new Error('Not Authenticated in me')}
        const userId = currentUser.id
        const user = await User.findById(userId)
        if(!user) {throw new Error('User not foundd')} 
        return user
        // return context.currentUser ?  context.currentUser : null
        }
    },
    Mutation:{

        createUser: async (root, args) => {
            console.log("creating user...")
            const {username, password} = args
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)
            console.log("signup args: ", username, password)
            const user = new User({ username, passwordHash })
            console.log("saving new user : ", user)
            user.save()
              .catch(error => {
                console.log("Could not save", error)
              })

              const userForToken = {
                username: user.username,
                id: user._id,
              }
              return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    
          },

          login: async (root, args) => {

            const {username, password} = args

            console.log("login args: ", username, password)
            const user = await User.findOne({username})
            console.log("logging in to: ", user)
            const isValidPassword = user === null ? false
            : await bcrypt.compare(password, user.passwordHash) 
        
            if (!(user && isValidPassword)  ) {
              console.log("Invalid credentials")     
            }
        
            const userForToken = {
                username: user.username,
                id: user._id,
              }
          
              return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
            },

    }
}

module.exports = resolvers