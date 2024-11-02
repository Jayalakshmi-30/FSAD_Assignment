import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async(req, res) => {
    try {
        const { fullname, email, password, role, secretQuestion, secretAnswer } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        // Hash the secret answer for security
        const hashSecretAnswer = await bcryptjs.hash(secretAnswer, 10);

        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            role: role,
            secretQuestion: secretQuestion,
            secretAnswer: hashSecretAnswer
        });

        await createdUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                role: createdUser.role,
                secretQuestion: createdUser.secretQuestion
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async(req, res) => {
    try {
        const { userName, email, password, role } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    userName: user.userName,
                    email: user.email,
                    role: user.role,
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
  export const forgotPassword = async(req, res) => {
      try {
          console.log("Received request body:", req.body);
          const { fullname, email, role, secretAnswer, newPassword } = req.body;
          // Find user by email
          const user = await User.findOne({ email });
          if (!user) {
              return res.status(400).json({ message: "User not found" });
          }

          // Verify fullname and role
          if (user.fullname !== fullname || user.role !== role) {
              return res.status(400).json({ message: "Invalid credentials" });
          }

          // Check if secretAnswer exists in database
          if (!user.secretAnswer) {
              return res.status(400).json({ message: "Secret answer not set for this user" });
          }

          // Verify secret answer
          const isSecretAnswerValid = await bcryptjs.compare(secretAnswer, user.secretAnswer);
          if (!isSecretAnswerValid) {
              return res.status(400).json({ message: "Invalid secret answer" });
          }

          // Hash new password
          const hashNewPassword = await bcryptjs.hash(newPassword, 10);
          // Update password
          user.password = hashNewPassword;
          await user.save();

          res.status(200).json({
              message: "Password updated successfully",
              user: {
                  _id: user._id,
                  fullname: user.fullname,
                  email: user.email,
                  role: user.role
              }
          });

      } catch (error) {
          console.log("Error:", error.message);
          res.status(500).json({ message: "Internal server error" });
      }
  };
