const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/role");

// register

async function register(login, password) {
	if (!password) {
		throw new Error("Не указан пароль");
	}
	const passwordHash = await bcrypt.hash(password, 10);

	const user = await User.create({ login, password: passwordHash });
	const token = generate({ id: user.id });

	return { user, token };
}

// login

async function login(login, password) {
	const user = await User.findOne({ login });

	if (!user) {
		throw new Error("Пользавателя не существует");
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error("Пароль не верен");
	}
	const token = generate({ id: user.id });

	return { user, token };
}

// get users

function getUsers() {
	return User.find();
}

// get roles

function getRoles() {
	return [
		{ id: ROLES.ADMIN, name: "Admin" },
		{ id: ROLES.MODERATOR, name: "Moderator" },
		{ id: ROLES.USER, name: "User" },
	];
}

// edit user (roles)
async function editUser(id, data) {
	const user = await User.findByIdAndUpdate(id, data, {
		returnDocument: "after",
	});
	return user;
}
// delete user

async function deleteUser(id) {
	return User.deleteOne({ _id: id });
}

module.exports = {
	register,
	login,
	editUser,
	deleteUser,
	getRoles,
	getUsers,
};
