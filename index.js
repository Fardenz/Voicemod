require("dotenv").config();
const appListen = require("./src/api").appListen;
const MongoClient = require("mongodb");

MongoClient.connect(process.env.DB_STRING, { useNewUrlParser: true }, function(
	err,
	client
) {
	if (err) console.log(err);

	console.log("Connected successfully to server");
	const db = client.db(process.env.DB_NAME);
	const user = db.collection("user");

	appListen(3333, user);
});
