const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const Difficulty = {
  EASY: "Easy",
  NORMAL: "Normal",
  HARD: "Hard",
};
const Category = {
  STUFF: "Stuff",
  FAMILY: "Family",
  HEALTH: "Health",
  LEARNING: "Learning",
  LEISURE: "Leisure",
  WORK: "Work",
};

const Type = {
  TASK: "Task",
  CHALLENGE: "Challenge",
};

const Status = {
  INCOMPLETE: "Incomplete",
  COMPLETE: "Complete",
};

module.exports = {
  Type,
  HttpCode,
  Difficulty,
  Category,
  Status,
};
