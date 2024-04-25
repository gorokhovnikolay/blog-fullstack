const express = require("express");
const {
	getRoles,
	editUser,
	deleteUser,
	getUsers,
} = require("../controllers/user");
const mapUser = require("../helpers/map.user");
const autenticated = require("../midllewares/isAutenticated");
const hasRole = require("../midllewares/hasRole");
const ROLE = require("../constants/role");

const router = express.Router({ mergeParams: true });

router.get("/", autenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const users = await getUsers();
		res.send({ error: null, users: users.map(mapUser) });
	} catch (e) {
		res.send({ error: e.message, user: null });
	}
});

router.get("/roles", autenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	res.send({ roles: getRoles() });
});

router.patch("/:id", autenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const user = await editUser(req.params.id, { role: req.body.roleId });
		res.send({ error: null, user: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message, user: null });
	}
});

router.delete("/:id", autenticated, hasRole([ROLE.ADMIN]), async (req, res) => {
	try {
		const user = await deleteUser(req.params.id);

		res.send({ error: null, message: "Пользаватель удален" });
	} catch (e) {
		res.send({ error: e.message, user: null });
	}
});

module.exports = router;
