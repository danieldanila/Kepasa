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
  as: "mentor",
  foreignKey: {
    name: "idMentor",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
});

User.hasMany(User, {
  as: "mentees",
  foreignKey: {
    name: "idMentor",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
});

Department.hasMany(User, {
  foreignKey: {
    name: "idDepartment",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});
User.belongsTo(Department, {
  foreignKey: "idDepartment",
});

User.belongsToMany(Role, {
  through: UsersRoles,
  foreignKey: "idUser",
  otherKey: "idRole",
});
Role.belongsToMany(User, {
  through: UsersRoles,
  foreignKey: "idRole",
  otherKey: "idUser",
});

Department.hasMany(Role, {
  foreignKey: {
    name: "idDepartment",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});
Role.belongsTo(Department, {
  foreignKey: "idDepartment",
});

Role.belongsToMany(Project, {
  through: RolesProjects,
  foreignKey: "idRole",
  otherKey: "idProject",
});
Project.belongsToMany(Role, {
  through: RolesProjects,
  foreignKey: "idProject",
  otherKey: "idRole",
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
