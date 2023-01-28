const MongoClient = require("mongodb").MongoClient;
const tokens = require("./middleware/auth");
var ObjectId = require("mongodb").ObjectId;

var database;
var collection = "admin";

const homePage = (request, response) => {
  response.send("Home Page");
};

const getAdminUsers = (request, response) => {
  database
    .collection(collection)
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      response.send(result);
    });
};

const addAdminUsers = async (request, response) => {
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;
  const token = await tokens.tokenGeneration(username, password);
  const data = {
    username: username,
    email: email,
    password: password,
    token: token,
  };
  database.collection(collection).insertOne(data, (err, result) => {
    if (err) throw err;
    response.json({ message: "Data Added Successfully" });
  });
};

const getAdminUsersById = async (request, response) => {
  if (await tokens.verifyToken(request)) {
    database
      .collection(collection)
      .find({ _id: ObjectId(request.params._id) })
      .toArray((err, result) => {
        if (err) throw err;
        response.send(result);
      });
  } else {
    response.send("Invalid Token Found!");
  }
};

const updateAdminUsers = async (request, response) => {
  let query = { _id: ObjectId(request.params._id) };
  let data = {
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
  };
  let dataset = {
    $set: data,
  };

  if (await tokens.verifyToken(request)) {
    database.collection(collection).updateOne(query, dataset, (err, result) => {
      if (err) throw err;
      response.send(data);
    });
  } else {
    response.send("Invalid Token Found!");
  }
};

const deleteAdminUsers = async (request, response) => {
  let query = { _id: ObjectId(request.params._id) };
  if (await tokens.verifyToken(request)) {
    database.collection(collection).deleteOne(query, (err, result) => {
      if (err) throw err;
      if (result.deletedCount <= 0) {
        response.send("Admin User Not Found!");
      } else {
        response.send("Data Deleted Successfully!");
      }
    });
  } else {
    response.send("Invalid Token Found!");
  }
};

const adminLogin = async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  let validEmail = database
    .collection(collection)
    .find({ email: email })
    .toArray(async (err, emailResult) => {
      if (err) response.send("email invalid");
      if (emailResult.length != 0 && password === emailResult[0].password) {
        const data = {
          username: emailResult[0].username,
          email: emailResult[0].email,
          password: emailResult[0].password,
          token: await tokens.tokenGeneration(
            emailResult[0].username,
            password
          ),
        };
        const dataset = {
          $set: data,
        };

        const query = { email: email };
        database
          .collection(collection)
          .updateOne(query, dataset, (err, result) => {
            if (err) response.send("error while updating data");
            response.send("data updated successfully in the login");
          });
      } else {
        response.send("not found");
      }
    });
};

MongoClient.connect(
  "mongodb://127.0.0.1:27017",
  { useNewUrlParser: true },
  (err, result) => {
    if (err) throw err;
    database = result.db("userAuthentication");
  }
);
module.exports = {
  homePage,
  getAdminUsers,
  addAdminUsers,
  getAdminUsersById,
  updateAdminUsers,
  deleteAdminUsers,
  adminLogin,
};
