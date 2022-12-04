const pgUser = require("../models/pgUser");

const session = require('express-session');

const userController = {
    render: (req, res, next) => {
        return res.render("userlogin");
    },

    renderRegister: (req, res, next) => {
        return res.render("userregister");
    },

    handleRegister: async (req, res, next) => {
        const data = req.body;
        try {
            const result = await pgUser.addUser(data);
            if (typeof result === "string") {
                return res.status(200).json(result);
            }
            return res.status(200).json({ result: "redirect", url: "/user" });
        } catch (err) {
            console.log(err);
        }
    },

    handleLogin: async (req, res, next) => {
        const data = req.body;
        try {
            const result = await pgUser.checkLoginUser(data);
            if (result !== false) {
                req.session.uid = result.ID;
                return res.status(200).json({ result: "redirect", url: "/movie" });
            } else {
                return res.status(200).json("Login failed!");
            }
        } catch (err) {
            console.log(err);
        }
    },

    handleLogout: (req, res, next) => {
        delete req.session.uid;
        return res.render("userlogin");
    },

    findAll: async (req, res, next) => {
        try {
            const data = await pgUser.allUser();
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};

module.exports = userController;
