export function noToken(req, res, next) {
  if (!req.cookies.token) {
    res.redirect("/login");
    return;
  }

  next();
}

export function isToken(req, res, next) {
  if (req.cookies.token) {
    res.redirect("/");
    return;
  }

  next();
}
