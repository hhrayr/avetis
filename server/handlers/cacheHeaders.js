export default (req, res, next) => {
  const expiresInDays = 1;
  const date = new Date();
  const expires = new Date(date);
  expires.setDate(expires.getDate() + expiresInDays);
  res.set({
    date: date.toUTCString(),
    expires: expires.toUTCString(),
    'Cache-Control': 'public, max-age=86400000',
  });
  next();
};
