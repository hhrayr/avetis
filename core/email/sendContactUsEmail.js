import sendEmail from './sendEmail';

export default (email) => {
  const emailOptions = email;
  emailOptions.html = email.text.replace(/\n/g, '<br>');
  return sendEmail(emailOptions);
};
