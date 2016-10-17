import sendContactUsEmail from '../../core/email/sendContactUsEmail';

class Email {
  sendContactUs(payload) {
    return sendContactUsEmail({
      to: 'info@avet.is',
      from: payload.email,
      replayTo: payload.email,
      subject: `ContactUs: email from "${payload.companyName || payload.email}"`,
      text: payload.message,
    });
  }
}

export default new Email();
