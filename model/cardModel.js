const Card = require("./schemas/card");

const getAll = async (userId) => {
  const result = await Card.find({ owner: userId }).populate({
    path: "owner",
    select: "email",
  });
  return result;
};

const create = async (body, userId) => {
  const result = await Card.create({ ...body, owner: userId });
  return result;
};

const update = async (contactId, body, userId) => {
  const result = await Card.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const updateStatus = async (contactId, status, userId) => {
  const result = await Card.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...status },
    { new: true }
  );
  return result;
};

const remove = async (contactId, userId) => {
  const result = await Card.findByIdAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

module.exports = {
  getAll,
  remove,
  create,
  update,
  updateStatus,
};
