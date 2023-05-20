const express = require("express");
const router = express.Router();//create new router
let data = [ 
  {
    id: 1,
    title: "Create a project",
    order: 1,
    completed: true,
    createdOn: new Date(),
  },
  {
    id: 2,
    title: "Take a cofféé",
    order: 2,
    completed: true,
    createdOn: new Date(),
  },
  {
    id: 3,
    title: "Write new article",
    order: 3,
    completed: true,
    createdOn: new Date(),
  },
  {
    id: 4,
    title: "Walk toward home",
    order: 4,
    completed: false,
    createdOn: new Date(),
  },
  {
    id: 5,
    title: "Have some dinner",
    order: 5,
    completed: false,
    createdOn: new Date(),
  },
];
router.get("/", function (req, res) {
  res.status(200).json(data);
});

router.get("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  let found = data.find(function (item) {
    return item.id == id;
  });
  if (found) {
    return res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", function (req, res) {
  console.log(req.body);
  let newItem = req.body;

  const id = data[data.length - 1].id + 1;
  const createdOn = new Date();
  newItem = { id, ...newItem, createdOn };
  data.push(newItem);
  res.status(201).json(newItem);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  data = data.filter((item) => item.id !== id);
  res.status(200).json({ message: `Successfully deleted id ${id}` });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTitle = req.body.title;
  const updatedOrder = req.body.order;
  const updatedCompleted = req.body.completed;
  let message;
  let status;
  let itemIndex = data.findIndex((item) => item.id == id);
  if (itemIndex !== -1) {
    data[itemIndex].title = updatedTitle;
    data[itemIndex].order = updatedOrder;
    data[itemIndex].completed = updatedCompleted;
    message = `Successfully updated item with id: ${id}`;
    status = 200;
  } else {
    message = `Item not found with id :${id}`;
    status = 400;
  }
  res.status(status).json({ message });
});
module.exports = router;
