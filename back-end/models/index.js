const { Sequelize, DataTypes } = require("sequelize");

const Database = require("../configs/database.config");

const UserModel = require("./user.model");
const DepartmentModel = require("./department.model");
const RoleModel = require("./role.model");
const ProjectModel = require("./project.model");
const UsersProjectsRolesModel = require("./usersProjectsRoles.model");
const RolesProjectsModel = require("./rolesProjects.model");
const PeriodModel = require("./period.model");
const ObjectiveModel = require("./objective.model");

const User = UserModel(Database, Sequelize);
const Department = DepartmentModel(Database, Sequelize);
const Role = RoleModel(Database, Sequelize);
const Project = ProjectModel(Database, Sequelize);
const UsersProjectsRoles = UsersProjectsRolesModel(Database, Sequelize);
const RolesProjects = RolesProjectsModel(Database, Sequelize);
const Period = PeriodModel(Database, Sequelize);
const Objective = ObjectiveModel(Database, Sequelize);

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
  foreignKey: {
    name: "idDepartment",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});

User.belongsToMany(Project, {
  through: UsersProjectsRoles,
  foreignKey: {
    name: "idUser",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
  otherKey: {
    name: "idProject",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});
Project.belongsToMany(User, {
  through: UsersProjectsRoles,
  foreignKey: {
    name: "idProject",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
  otherKey: {
    name: "idUser",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
});
UsersProjectsRoles.belongsTo(Role, {
  foreignKey: {
    name: "idRole",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
});
Role.hasMany(UsersProjectsRoles, {
  foreignKey: {
    name: "idRole",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
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
  foreignKey: {
    name: "idDepartment",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
});

Role.belongsToMany(Project, {
  through: RolesProjects,
  foreignKey: {
    name: "idRole",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
  otherKey: {
    name: "idProject",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
});
Project.belongsToMany(Role, {
  through: RolesProjects,
  foreignKey: {
    name: "idProject",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
  otherKey: {
    name: "idRole",
    type: DataTypes.UUID,
    validate: {
      isUUID: 4,
    },
  },
});

User.hasMany(Objective, {
  foreignKey: {
    name: "idUser",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});

Objective.belongsTo(User, {
  foreignKey: {
    name: "idUser",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});

Period.hasMany(Objective, {
  foreignKey: {
    name: "idPeriod",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});

Objective.belongsTo(Period, {
  foreignKey: {
    name: "idPeriod",
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
  },
});

module.exports = {
  User,
  Department,
  Role,
  Project,
  UsersProjectsRoles,
  RolesProjects,
  Period,
  Objective,
  connection: Database,
};
