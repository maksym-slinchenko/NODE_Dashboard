const Card = require("../model/cardModel");
const { HttpCode } = require("../helper/constants");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cards = await Card.getAll(userId, req.query);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { cards },
    });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const card = await Card.create(req.body, userId);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        card,
      },
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cardId = req.params.cardId;
    const card = await Card.remove(cardId, userId);
    if (card) {
      return res.status(HttpCode.CREATED).json({
        status: "success",
        code: HttpCode.CREATED,
        data: {
          card,
          message: "card deleted",
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        data: { message: "Data not found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cardId = req.params.cardId;
    const card = await Card.update(cardId, req.body, userId);

    if (card) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { card },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        data: { message: "Data not found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cardId = req.params.cardId;
    const card = await Card.updateStatus(cardId, req.body, userId);

    if (req.body) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          card,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        data: { message: "Data not found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  update,
  updateStatus,
  remove,
  create,
};
