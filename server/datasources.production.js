'use strict';

module.exports = {
  mongodb: {
    connector: 'mongodb',
    name: 'mongodb',
    host: 'mongodb',
    port: 27017,
    user: 'MySnookerSkills',
    password: process.env.MYSNOOKERSKILLS_MONGODB_PASSWORD,
    database: 'MySnookerSkills',
  },
  emailFromSteff: {
    name: 'emailFromSteff',
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: 'mail.mysnookerskills.com',
        secure: true,
        port: 465,
        tls: {
          'rejectUnauthorized': true,
        },
        auth: {
          user: 'steff@mysnookerskills.com',
          pass: process.env.EMAIL_PASSWORD_STEFF,
        },
      },
    ],
  },
  emailFromInfo: {
    name: 'emailFromInfo',
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: 'mail.mysnookerskills.com',
        secure: true,
        port: 465,
        tls: {
          'rejectUnauthorized': true,
        },
        auth: {
          user: 'info@mysnookerskills.com',
          pass: process.env.EMAIL_PASSWORD_INFO,
        },
      },
    ],
  },
  emailFromPrivacy: {
    name: 'emailFromPrivacy',
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: 'mail.mysnookerskills.com',
        secure: true,
        port: 465,
        tls: {
          'rejectUnauthorized': true,
        },
        auth: {
          user: 'privacy@mysnookerskills.com',
          pass: process.env.EMAIL_PASSWORD_PRIVACY,
        },
      },
    ],
  },
  emailFromAdmin: {
    name: 'emailFromAdmin',
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: 'mail.mysnookerskills.com',
        secure: true,
        port: 465,
        tls: {
          'rejectUnauthorized': true,
        },
        auth: {
          user: 'admin@mysnookerskills.com',
          pass: process.env.EMAIL_PASSWORD_ADMIN,
        },
      },
    ],
  },
  emailFromSupport: {
    name: 'emailFromSupport',
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: 'mail.mysnookerskills.com',
        secure: true,
        port: 465,
        tls: {
          'rejectUnauthorized': true,
        },
        auth: {
          user: 'support@mysnookerskills.com',
          pass: process.env.EMAIL_PASSWORD_SUPPORT,
        },
      },
    ],
  },
  emailFromRegistration: {
    name: 'emailFromRegistration',
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: 'mail.mysnookerskills.com',
        secure: true,
        port: 465,
        tls: {
          'rejectUnauthorized': true,
        },
        auth: {
          user: 'registration@mysnookerskills.com',
          pass: process.env.EMAIL_PASSWORD_REGISTRATION,
        },
      },
    ],
  },
  emailFromAccount: {
    name: 'emailFromAccount',
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: 'mail.mysnookerskills.com',
        secure: true,
        port: 465,
        tls: {
          'rejectUnauthorized': true,
        },
        auth: {
          user: 'account@mysnookerskills.com',
          pass: process.env.EMAIL_PASSWORD_ACCOUNT,
        },
      },
    ],
  },
};
