const todoModel = require("../models/Todo");
const { empty } = require("../helpers/string");
const request = require("supertest");
const app = require("../app");

describe("POST /api/todo  adding new todo", () => {
  test("new todo can be added", async () => {
    const response = await request(app).post("/api/todo").send({
      title: "new todo list",
    });
    expect(response.status).toBe(201);
  });

  test("invalid request is not allowed", async () => {
    const response = await request(app).post("/api/todo").send({});
    expect(response.status).toBe(400);
  });
});

describe("PUT /api/todo update endpoint", () => {
  test("todo can be completed", async () => {
    const res = await request(app).post("/api/todo").send({
      title: "new todo list",
    });
    const response = await request(app)
      .put(`/api/todo/${res.body.data.id}`)
      .send({
        status: "completed",
      });
    expect(response.status).toBe(200);
  });

  test("invalid request is not allowed", async () => {
    const res = await request(app).post("/api/todo").send({
      title: "new todo list",
    });
    const response = await request(app)
      .put(`/api/todo/${res.body.data.id}`)
      .send({});
    expect(response.status).toBe(400);
  });
});

describe("GET /api/todo/:id get a single todo endpoint", () => {
  test("todo can be completed", async () => {
    const title = "new todo list";
    const res = await request(app).post("/api/todo").send({
      title,
    });
    const response = await request(app).get(`/api/todo/${res.body.data.id}`);
    expect(response.status).toBe(200);
    expect(response.body.data.todo[0].title).toBe(title);
  });
});

describe("GET /api/todo endpoint", () => {
  test("can get all todo", async () => {
    const response = await request(app).get(`/api/todo`);
    expect(response.status).toBe(200);
    expect(response.body.data.todo.length).toBeGreaterThan(1);
  });
});

describe("DELETE /api/todo/:id delete a single todo endpoint", () => {
  test("todo can be deleted", async () => {
    const title = "new todo list";
    const res = await request(app).post("/api/todo").send({
      title,
    });
    let response = await request(app).delete(`/api/todo/${res.body.data.id}`);
    expect(response.status).toBe(200);
    response = await request(app).get(`/api/todo/${res.body.data.id}`);
    expect(response.body.data.todo.length).toBe(0);
  });
});
