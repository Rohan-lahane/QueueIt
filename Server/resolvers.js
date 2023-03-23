const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {PubSub} = require('graphql-subscriptions')
const pubsub = new PubSub()


const Playlist = require('./models/playlist')
const User = require('./models/user')
const { response } = require('express')


const resolvers = {
    Query: {
      getAllPlaylists: async() => 
      {
        const playlists = await Playlist.find()
        console.log("all playlists: ", playlists)
        return playlists
      },

      findPlaylist: async  (root, args) =>{ 
        console.log("findPlaylist args, " , args)
         try{
        const playlists = await Playlist.find(
           {title: {$regex: args.title, $options: 'i' }},
        )
 
        console.log("the playlists we found : ",  playlists)
 
        return playlists
 
       } catch (error) {
         throw new Error(' could not get playlist ', {error})
       }
       },

       getPlaylistById: async  (root, args) =>{ 
        console.log("get Playlist by id  args, " , args)
         try{
        const playlist = await Playlist.findById(args.var)
        console.log("the playlists we found : ",  playlist)
 
        return playlist
 
       } catch (error) {
         throw new Error(' could not get playlist ', {error})
       }
       },


      findUser: async (root, args, context) =>{
        console.log("find user args ",args)

        console.log("logged in user context", context)
        const user= await User.findById(args.id).populate('playlists')
        console.log("found user: ", user)
        return {
          _id: user._id,
          username: user.username,
          playlists: user.playlists.map((playlist)=>playlist._id)
        }
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
              return { value: jwt.sign(userForToken, process.env.JWT_SECRET, {expiresIn:600*60}) }
    
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
      
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET,{expiresIn:600*60}) }
      },

      addPlaylist : async(root, args)=>{
        console.log("add playlist args: ", args)
        const user = await User.findById(args.creatorId)
        const playlist = new Playlist({
          title: args.title,
          creator: user.id
        })

        const addedPlaylist = await playlist.save()
        user.playlists = user.playlists.concat(addedPlaylist._id)
        await user.save()

        pubsub.publish('PLAYLIST_ADDED', {playlistAdded: addedPlaylist})
        return addedPlaylist
      }
    },

    Subscription: {
      playlistAdded: {
        subscribe: ()=>{
          console.log("playlist added subscription called in backend")
          pubsub.asyncIterator('PLAYLIST_ADDED')

        }
      }
    }
}

module.exports = resolvers