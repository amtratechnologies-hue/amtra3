import crypto from 'node:crypto';
import { env } from '../config/env.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from '../utils/ApiError.js';
import { successResponse } from '../utils/apiResponse.js';

function regenerateSession(session) {
  return new Promise((resolve, reject) => {
    session.regenerate((error) => (error ? reject(error) : resolve()));
  });
}

function saveSession(session) {
  return new Promise((resolve, reject) => {
    session.save((error) => (error ? reject(error) : resolve()));
  });
}

function destroySession(session) {
  return new Promise((resolve, reject) => {
    session.destroy((error) => (error ? reject(error) : resolve()));
  });
}

export function createAdminController({
  adminAuthService,
  config = env.admin,
}) {
  return {
    async login(req, res) {
      const { username, password } = req.body;
      const admin = await adminAuthService.authenticate(username, password);

      if (!admin) {
        throw new ApiError(
          HTTP_STATUS.UNAUTHORIZED,
          'Invalid username or password.',
        );
      }

      // Regenerate the session ID on login to prevent session fixation.
      await regenerateSession(req.session);

      const csrfToken = crypto.randomBytes(32).toString('hex');

      req.session.admin = admin;
      req.session.csrfToken = csrfToken;

      await saveSession(req.session);

      res
        .status(HTTP_STATUS.OK)
        .json(
          successResponse('Signed in successfully.', { admin, csrfToken }),
        );
    },

    async logout(req, res) {
      await destroySession(req.session);

      res.clearCookie(config.cookieName, {
        httpOnly: true,
        secure: config.cookieSecure,
        sameSite: config.cookieSameSite,
        path: config.cookiePath,
      });

      res
        .status(HTTP_STATUS.OK)
        .json(successResponse('Signed out successfully.'));
    },

    me(req, res) {
      if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(32).toString('hex');
      }

      res.status(HTTP_STATUS.OK).json(
        successResponse('Authenticated.', {
          admin: req.session.admin,
          csrfToken: req.session.csrfToken,
        }),
      );
    },
  };
}
