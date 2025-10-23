const { User, userSalarySchema } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
  register: async (body) => {
    try {
      const existingUser = await User.findOne({ email: body.email });
      if (existingUser) return "UserExist";

      const { password, ...userData } = body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await User.create({ ...userData, password: hashedPassword });
      return createdUser;
    } catch (error) {
      console.error("Error in register:", error);N
      throw new Error(error.message || "Failed to create user");
    }
  },

login: async (body) => {
    try {
      const { email, password } = body;

      const user = await User.findOne({ email });
      if (!user) return "UserNotExist";

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return "InvalidPassword";
// console.log("jwt checking===>", process.env.JWT_SECRET )
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return { user, token };
    } catch (error) {
      console.error("Error in login:", error);
      throw new Error(error.message || "Login failed");
    }
  },

};
