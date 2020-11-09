const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const UserAdmin = require("./user.admin")

const options = {
  resources: [UserAdmin],
};

module.exports = options;
