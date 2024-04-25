module.exports = function (roles) {
	return function (req, res, next) {
		if (!roles.includes(req.user.role)) {
			res.send({ error: "Доступ запрещен" });
			return;
		}

		next();
	};
};
