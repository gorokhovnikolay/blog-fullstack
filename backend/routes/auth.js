const express = require("express");
const { register, login } = require("../controllers/user");
const mapUser = require("../helpers/map.user");

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
	try {
		const { user, token } = await register(
			req.body.login,
			req.body.password
		);
		res.cookie("token", token).send({ user: mapUser(user), error: null });
	} catch (e) {
		res.send({
			user: null,
			error: e.message || "Неизвестная ошибка",
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password);
		res.cookie("token", token).send({ user: mapUser(user), error: null });
	} catch (e) {
		res.send({ user: null, error: e.message || "Неизвестная ошибка" });
	}
});

router.post("/logout", async (req, res) => {
	try {
		res.cookie("token", "").send({});
	} catch (e) {
		res.send({ user: null, error: e.message || "Неизвестная ошибка" });
	}
});

module.exports = router;
