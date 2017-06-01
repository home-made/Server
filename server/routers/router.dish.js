const Router = require("express").Router();
const dishController = require("../controllers/controller.dish");
const multer = require('multer');

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in 54 Megabytes
  limits: { fileSize: 52428800 },
});
Router.get("/dish/0/:chefId",dishController.getInactiveDishes)

Router.get("/dish/1/:chefId",dishController.getActiveDishes)

//post new dish
Router.post("/dish/add", dishController.addDish);

//upload dish image
Router.post("/dish/image", upload.single('theseNamesMustMatch'),dishController.addDishImage);

//update a dish
Router.put("/dish/", dishController.updateDish);

//delete a dish
Router.delete("/dish", dishController.deleteDish);

module.exports = Router;
