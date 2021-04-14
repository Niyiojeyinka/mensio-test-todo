const todoModel = require("../models/Todo");
const { empty } = require("../helpers/string");

exports.addTodo = async (req, res) => {
  try {
    if (empty(req.body.title)) {
      throw new Error("Title is Required");
    }
    const result = await todoModel.insert({
      title: req.body.title,
      status: "pending",
    });

    return res.status(201).json({
      result: 1,
      error: [],
      message: "Todo created Successfuly",
      data: { id: result.insertId },
    });
  } catch (e) {
    return res.status(400).json({
      result: 0,
      error: e.toString(),
      message: "Error Occured",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    if (empty(req.params.id) || empty(req.body.status)) {
      throw new Error(
        "Both id header parameter and status body parameter are Required"
      );
    }
    const result = await todoModel.update(req.params.id, req.body.status);
    if (result.affectedRows == 1) {
      return res.status(200).json({
        result: 1,
        error: [],
        message: "Todo updated Successfuly",
        data: [],
      });
    }

    throw new Error("Couldn't update the todo status");
  } catch (e) {
    return res.status(400).json({
      result: 0,
      error: e.toString(),
      message: "Error Occured",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    if (empty(req.params.id)) {
      throw new Error("Both id header parameter is Required");
    }
    const result = await todoModel.delete(req.params.id);

    if (result.affectedRows == 1) {
      return res.status(200).json({
        result: 1,
        error: [],
        message: "Todo deleted Successfuly",
        data: [],
      });
    }

    throw new Error("Couldn't delete the todo");
  } catch (e) {
    return res.status(400).json({
      result: 0,
      error: e.toString(),
      message: "Error Occured",
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    if (empty(req.params.id)) {
      throw new Error("Both id header parameter is Required");
    }
    const todo = await todoModel.selectOne(req.params.id);

    return res.status(200).json({
      result: 1,
      error: [],
      message: "Todo received Successfuly",
      data: { todo },
    });
  } catch (e) {
    return res.status(400).json({
      result: 0,
      error: e.toString(),
      message: "Error Occured",
    });
  }
};

exports.getAllTodo = async (req, res) => {
  try {
    const todo = await todoModel.selectAll();

    return res.status(200).json({
      result: 1,
      error: [],
      message: "Todo received Successfuly",
      data: { todo },
    });
  } catch (e) {
    return res.status(400).json({
      result: 0,
      error: e.toString(),
      message: "Error Occured",
    });
  }
};
