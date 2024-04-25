const { verify } = require("../helpers/token");
const User = require("../models/User");

module.exports = async function (req, res, next) {
	try {
		const tokenData = verify(req.cookies.token);

		if (!tokenData) {
			res.send({ error: "Пользаватель не авторизован" });
			return;
		}
		const user = await User.findOne({ _id: tokenData.id });

		req.user = user;

		next();
	} catch (e) {
		res.send({
			error: "Пользаватель не существует или что то пошло не так",
		});
	}
};
