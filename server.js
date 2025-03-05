require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql');
const connectToDB = require('./mongoconnect');
const User = require('./models/User');
const Post = require('./models/Post');
const port = process.env.PORT;

connectToDB()

const schema = buildSchema(`
  type Post {
		title:String!
		content:String!
		user:User
	  }

  type User {
    username: String!
    email: String!
    }

    input userInput{
    username: String!
    email: String!
    password: String!
    }

    input userInputLogin {
    email: String!
    password: String!
    }

  type Query {
		test:String
		usersGetAll:[User!]!
		userGetOne(id:ID!):User!
		getMyPosts(token:String!):[Post!]!
	}

  type Mutation {
    createUser(input: userInput): User
    userLogin(input: userInputLogin): String
    postCreate(title:String!,content:String!,token:String!):String
    }

`);

const auth = async (token)=>{
	const {userId} = jwt.verify(token,process.env.JWT_SECRET);
	const user = await User.findById(userId);
	return user;
}

const userQueries = {
  test:async()=>{
		const user = await User.find().populate('posts');
		return 'test'
	},
  usersGetAll:async()=>{
		const users = await User.find();
		return users;
	},
  userGetOne:async ({id})=>{
		const user = await User.findById(id).populate('posts');
		return user;
	}

}

const userMutations = {
  createUser: async ({ input }) => {
    const { username, email, password } = input;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = new User({ username, email, password: hashedPassword });
    await userCreated.save();
    return {
      username,
      email
    };
  },
  userLogin: async ({ input }) => {
    const { email, password } = input;
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password!');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password!');
    const payload = user._id;
    const token = jwt.sign({payload}, process.env.JWT_SECRET  )
    return token;
  }
}

const postQueries = {
	getMyPosts: async ({token})=>{
		const user = await auth(token);
		const posts = await Post.find({userId:user._id}).populate('userId');
		return posts.map(post=>({...post._doc,user:post.userId}));
	}
}

const postMutations = {
  postCreate: async({title,content,token})=>{
    const user = await auth(token);
		const post = new Post({title,content,userId:user._id});
		await post.save();
		return 'post created'
  }
}

const resolvers = {
  ...userQueries,
  ...userMutations,
  ...postMutations,
  ...postQueries
};

app.use('/graphql', graphqlHTTP({ schema, rootValue: resolvers, graphiql: true }));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});