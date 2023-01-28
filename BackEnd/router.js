const express = require("express");
const apis = require("./controller");
const router = express.Router();

router.get("/", apis.homePage);

router.get("/adminUsers", apis.getAdminUsers);

router.get("/adminUsers/:_id", apis.getAdminUsersById);

router.post("/loginAdmin", apis.adminLogin);

router.post("/addAdmin", apis.addAdminUsers);

router.put("/updateAdminUsers/:_id", apis.updateAdminUsers);

router.delete("/deleteAdminUsers/:_id", apis.deleteAdminUsers);

module.exports = router;
