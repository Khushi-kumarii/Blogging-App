export const sendToken = (user, statusCode, message, res) => {
  const token = user.getJWTToken();

  const options = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Hardcoded to 7 days
      httpOnly: true, // Secure the cookie
  };

  res.status(statusCode)
     .cookie("token", token, options)
     .json({
         success: true,
         message,
         token,
         user,
     });
};
