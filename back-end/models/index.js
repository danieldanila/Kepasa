const { Sequelize, DataTypes } = require("sequelize");

const Database = require("../configs/database.config");

const UserModel = require("./user.model");
const DepartmentModel = require("./department.model");
const RoleModel = require("./role.model");
const ProjectModel = require("./project.model");
const UsersRolesModel = require("./usersRoles.model");
const RolesProjectsModel = require("./rolesProjects.model");

const User = UserModel(Database, Sequelize);
const Department = DepartmentModel(Database, Sequelize);
const Role = RoleModel(Database, Sequelize);
const Project = ProjectModel(Database, Sequelize);
const UsersRoles = UsersRolesModel(Database, Sequelize);
const RolesProjects = RolesProjectsModel(Database, Sequelize);

User.belongsTo(User, {
  as: "Mentor",
  foreignKey: {
    name: "id_mentor",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});

Department.hasMany(User, {
  foreignKey: {
    name: "id_department",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});
User.belongsTo(Department, {
  foreignKey: "id_department",
});

User.belongsToMany(Role, {
  through: UsersRoles,
  foreignKey: "id_user",
  otherKey: "id_role",
});
Role.belongsToMany(User, {
  through: UsersRoles,
  foreignKey: "id_role",
  otherKey: "id_user",
});

Department.hasMany(Role, {
  foreignKey: {
    name: "id_department",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});
Role.belongsTo(Department, {
  foreignKey: "id_department",
});

Role.belongsToMany(Project, {
  through: RolesProjects,
  foreignKey: "id_role",
  otherKey: "id_project",
});
Project.belongsToMany(Role, {
  through: RolesProjects,
  foreignKey: "id_project",
  otherKey: "id_role",
});

module.exports = {
  User,
  Department,
  Role,
  Project,
  UsersRoles,
  RolesProjects,
  connection: Database,
};
