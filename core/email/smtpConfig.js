const smtpConfig = {
  host: 'mail.mailspot.info',
  auth: {
    username: 'info@avet.is',
    password: 'Yerevan2016',
  },
};

export default `smtps://${smtpConfig.auth.username.replace('@', '%40')}:` +
  `${smtpConfig.auth.password}@${smtpConfig.host}`;
