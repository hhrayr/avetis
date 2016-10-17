import nodemailer from 'nodemailer';
import smtpConfig from './smtpConfig';

class SendEmail {
  constructor(email) {
    this._email = email;
  }

  send() {
    this._getTransporter().sendMail(this._email);
    return true;
  }

  _getTransporter() {
    return nodemailer.createTransport(smtpConfig);
  }
}

export default (email) => {
  return new SendEmail(email).send();
};
