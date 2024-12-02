import { validationResult } from "express-validator";
import express from "express";
import passport from "passport";

class LoginController {
  static async loginForm(req, res) {
    try {
      if (req.session.user) return res.redirect("/products");
      res.render("login");
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
  static async authUser(req, res) {
    try {
      const { email, password } = req.body; // Instead of writing: const email = req.body.email; const password = req.body.password;

      req.session.user = { email, password };
      req.session.sortInAscOrder = true; // Set sorting to ascending

      res.redirect("/products");
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
  static async logout(req, res) {
    console.log("Logout request received"); // Log to verify this route is hit
    console.log(req.session); // Verify session data before logout
    try {
      // req.session.destroy((err) => {
      req.logout((err) => {
        if (err) {
          console.error("Session destroy error:", err);
          return res
            .status(500)
            .json({ error: "Could not log out, please try again." });
        }
        console.log("Session destroyed, redirecting to /login");
        //   res.clearCookie("connect.sid");
        return res.redirect("/login");
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
export default LoginController;
