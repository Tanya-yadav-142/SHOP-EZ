const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {

  /* ================= ADMIN CHECK ================= */
  async isAdmin(req, res) {
    try {
      const { loggedInUserId } = req.body;
      const user = await userModel.findById(loggedInUserId);
      return res.json({ role: user.userRole });
    } catch (err) {
      return res.status(404).json({ error: "User not found" });
    }
  }

  /* ================= ALL USERS ================= */
  async allUser(req, res) {
    try {
      const users = await userModel.find({});
      return res.json({ users });
    } catch {
      return res.status(404).json({ error: "Users not found" });
    }
  }

  /* ================= SIGNUP ================= */
  async postSignup(req, res) {
    try {
      let { name, email, password, cPassword } = req.body;

      if (!name || !email || !password || !cPassword) {
        return res.json({ error: "Fields must not be empty" });
      }

      if (password !== cPassword) {
        return res.json({ error: "Passwords do not match" });
      }

      if (name.length < 3 || name.length > 25) {
        return res.json({ error: "Name must be 3–25 characters" });
      }

      if (!validateEmail(email)) {
        return res.json({ error: "Email is not valid" });
      }

      if (password.length < 8 || password.length > 255) {
        return res.json({ error: "Password must be at least 8 characters" });
      }

      // ✅ normalize data
      name = toTitleCase(name);
      email = email.trim().toLowerCase();

      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        return res.json({ error: "Email already exists" });
      }

      // ✅ async hash (recommended)
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        userRole: 1,
      });

      await newUser.save();

      return res.json({
        success: "Account created successfully. Please login",
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  /* ================= SIGNIN ================= */
  async postSignin(req, res) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        return res.json({ error: "Fields must not be empty" });
      }

      // ✅ normalize email (VERY IMPORTANT)
      email = email.trim().toLowerCase();

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.json({ error: "Invalid email or password" });
      }

      // ✅ password compare
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({ error: "Invalid email or password" });
      }

      // ✅ token creation
      const token = jwt.sign(
        { _id: user._id, role: user.userRole },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        user: {
          _id: user._id,
          role: user.userRole,
          name: user.name,
          email: user.email,
        },
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Login failed" });
    }
  }
}

module.exports = new Auth();