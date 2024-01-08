import cookie from 'cookie';
import Cookies from 'js-cookie';

export const setClientCookie = (name, value, options) => {
  Cookies.set(name, value, options);
};

export const getClientCookie = (name) => {
  return Cookies.get(name);
};

export const removeClientCookie = (name) => {
  Cookies.remove(name);
};

export const setServerCookie = (res, name, value, options) => {
  res.setHeader('Set-Cookie', cookie.serialize(name, value, options));
};

export const getServerCookie = (req, name) => {
  const parsedCookies = cookie.parse(req.headers.cookie || '');
  return parsedCookies[name];
};

export const removeServerCookie = (res, name) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(name, '', {
      maxAge: -1,
    }),
  );
};
