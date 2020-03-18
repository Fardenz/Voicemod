const app = require("express")();
var bodyParser = require("body-parser");
var userCollection;

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.status(200);
	res.send("Voicemod Aplication");
});

app.post("/user", (req, res) => {
	//create user
	// not checking if any field is null
	// we use email as ID
	let newUser = {
		nombre: req.body.nombre,
		apellidos: req.body.apellidos,
		email: req.body.email,
		contrasenya: req.body.contrasenya,
		pais: req.body.pais,
		telefono: req.body.telefono,
		codigoPostal: req.body.codigoPostal
	};
	userCollection.insertOne(newUser, err => {
		if (err) {
			res.status(500);
			throw err;
		}

		res.status(200);
		res.json({
			status: "OK",
			message: "inserted"
		});
	});
});

app.put("/user", (req, res) => {
	//modify
	userCollection.findOne(
		{
			email: req.body.email
		},
		function(err, result) {
			if (err) {
				res.status(500);
				throw err;
			}

			// we use contrasenya as secret token

			if (req.body.contrasenya === result.contrasenya) {
				if (req.body.nuevaContrasenya)
					req.body.contrasenya = req.body.nuevaContrasnya;

				let modifiedUser = {
					...result,
					nombre: req.body.nombre,
					apellidos: req.body.apellidos,
					email: req.body.email,
					contrasenya: req.body.contrasenya,
					pais: req.body.pais,
					telefono: req.body.telefono,
					codigoPostal: req.body.codigoPostal
				};

				userCollection.updateOne(
					{
						email: req.body.email
					},
					modifiedUser,
					function(err, res) {
						if (err) {
							res.status(500);
							throw err;
						}
						res.status(200);
						res.json({
							status: "OK",
							message: "updated"
						});
					}
				);
			}
		}
	);
});

app.delete("/user/:email", (req, res) => {
	// we should check log in token before deleting
	// also we should logically delete, not pysically

	userCollection.deleteOne({ email: req.params.email }, (err, obj) => {
		if (err) {
			res.status(500);
			throw err;
		}
		res.status(200);
		res.json({
			status: "OK",
			message: "deleted"
		});
	});
});

app.post("/user/login", (req, res) => {
	userCollection.findOne(
		{
			email: req.body.email
		},
		function(err, result) {
			if (err) {
				res.status(500);
				throw err;
			}

			if (req.body.contrasenya === result.contrasenya) {
				res.status(200);
				res.json({
					status: "OK",
					message: "updated",
					loginToken: "sadfasdfas"
				});
			}
		}
	);
});

const appListen = function(port, collection) {
	app.listen(port);
	userCollection = collection;
};

module.exports = { appListen };
