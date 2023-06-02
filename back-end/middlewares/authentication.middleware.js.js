const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync.util");
const { changedPasswordAfter } = require("../utils/authorization.util");
const UnauthorizedError = require("../errors/unauthorizedError");
const ForbiddenError = require("../errors/forbiddenError");
const User = require("../models").User;

const middleware = {
  protect: catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      next(
        new UnauthorizedError(
          "You are not logged in! Please log in to get access."
        )
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findByPk(decoded.id);

    if (!currentUser) {
      return next(
        new UnauthorizedError(
          "The user belonging to this token does no longer exist."
        )
      );
    }

    if (changedPasswordAfter(currentUser.passwordChangedAt, decoded.iat)) {
      return next(
        new UnauthorizedError(
          "User recently changed password! Please log in again."
        )
      );
    }

    req.user = currentUser;
    next();
  }),

  restrictToAdministrator: catchAsync(async (req, res, next) => {
    if (req.user.isAdministrator === false) {
      return next(
        new ForbiddenError("You do not have permission to perform this action.")
      );
    }

    next();
  }),
};

module.exports = middleware;