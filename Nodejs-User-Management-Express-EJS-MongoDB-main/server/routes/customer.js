const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../controllers/authmiddleware");
const multer = require("multer");
//image upload

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("image");

/**
 *  Customer Routes
 */
router.get("/", checkAuthenticated, customerController.homepage);
router.get("/download", checkAuthenticated, customerController.downloadData);
router.get("/about", checkAuthenticated, customerController.about);
router.get("/add", checkAuthenticated, customerController.addCustomer);
router.post("/add", upload, customerController.postCustomer);
router.get("/view/:id", checkAuthenticated, customerController.view);
router.get("/edit/:id", checkAuthenticated, customerController.edit);
router.put(
  "/edit/:id",
  checkAuthenticated,
  upload,
  customerController.editPost
);
router.delete(
  "/edit/:id",
  checkAuthenticated,
  customerController.deleteCustomer
);

// newly added

router.post(
  "/confirm-delete/:id",
  checkAuthenticated,
  customerController.confirmDeleteCustomer
);

router.post("/search", checkAuthenticated, customerController.searchCustomers);

router.get("/arris", checkAuthenticated, customerController.arrisPage);

module.exports = router;
