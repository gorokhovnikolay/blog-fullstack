module.exports = function (user) {
	return {
		login: user.login,
		roleId: user.role,
		id: user.id,
	};
};
