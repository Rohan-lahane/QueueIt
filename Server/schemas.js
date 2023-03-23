
const typeDefs = `
  type User {
    _id: ID! 
    username: String!
    passwordHash: String!
    playlists: [ID!]!
    
  },

  type Playlist {
    title: String!
    creator: String!
    description: String
    songs: [Song]
    id: ID!
  },

  type Token {
    value: String!
  }

  type Song {
    title: String!
    link: String!
    platform: String! 
  },

  type Query {
    findPlaylist (title: String!): [Playlist!]!
    getPlaylistById (var: String!): Playlist!    
    findUser(id: String!): User
    me: User!
    getAllPlaylists : [Playlist]

  }

  type Mutation{

    createUser(username: String!, password: String! ): Token
    login(username: String!, password: String!) : Token
    addPlaylist(title: String!, creatorId: String!): Playlist

  }

  type Subscription{
    playlistAdded: Playlist!
  }

`

module.exports = typeDefs