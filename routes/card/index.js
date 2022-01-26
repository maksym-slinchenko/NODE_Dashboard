const express = require("express");
const router = express.Router();
const cardController = require("../../controllers/cardController");
const validate = require("./valid-card-router");
const guard = require("../../helper/guard");

router
  .get("/", guard, cardController.getAll)

  .post("/", guard, validate.createCard, cardController.create);

router
  .delete("/:cardId", guard, cardController.remove)

  .patch(
    "/:cardId",
    guard,
    validate.validationObjectId("cardId"),
    validate.updateCard,

    cardController.update
  );

router.patch(
  "/:cardId/complete",
  validate.validationObjectId("cardId"),
  validate.updateCardStatus,
  cardController.updateStatus
);
module.exports = router;
