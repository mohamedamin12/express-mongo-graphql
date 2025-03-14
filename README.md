# express-mongo-graphql

express-mongo-graphql is a simple backend application designed to help developers learn how to integrate GraphQL with Express.js and MongoDB. This project serves as an educational resource, providing a clear example of how to build a GraphQL API that supports basic operations such as querying and mutating data. It offers hands-on experience with concepts like schema design, resolvers, and MongoDB interactions, making it an ideal starting point for those looking to understand GraphQL in a practical context.

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/ibrahimabdalrhman/express-mongo-graphql.git
   ```
2. Navigate to the project directory
   ```
   cd express-mongo-graphql
   ```
3. Install dependencies:
    ```
      npm install
    ```
4. Set up environment variables:
   * Create a file named .env in the root directory of your project.
   * Add the following variables to the .env file:
    ```
    MONGO_URI=your_mongodb_uri
    JWT_SECRET_KEY=your_jwt_secret_key
    PORT=4000
    ```
  * Make sure to replace your_mongodb_uri with your actual MongoDB connection string and your_jwt_secret_key with a secure key of your choice.

### Configuration
Ensure that MongoDB is running locally or via a cloud service. Verify that your .env file is configured with the correct MongoDB URI and JWT secret key.

### Usage
To start the application, use the following command:
```
npm start
```
The server will start by default on http://localhost:4000/graphql, where you can interact with the API using the GraphiQL interface.
  
