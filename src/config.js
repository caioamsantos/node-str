global.SALT_KEY = process.env.SALT_KEY;
global.EMAIL_TMPL = process.env.EMAIL_TMPL;

module.exports = {
    connectionString: process.env.MONGODB_URI,
    sendgridKey: process.env.SENDGRID_KEY,
}