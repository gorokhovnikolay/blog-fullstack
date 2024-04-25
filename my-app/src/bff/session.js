export const session = {
	list: {},
	addHash(user) {
		this.list[user.session] = user;
	},
	removeHash({ session }) {
		delete this.list[session];
	},
	checkAccess(user, accessRoles) {
		return this.list[user.session] && accessRoles.includes(user.roleId);
	},
};
