const express = require("express");
const cors = require("cors");

const notes = [
  { id: 1, title: "Buy groceries", content: "Milk, eggs, bread" },
  { id: 2, title: "Meeting notes", content: "Discuss Q3 roadmap" },
  { id: 3, title: "Sagar's note", content: "hello note from sagar" },
];
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

app.get("/notes", (req, res) => {
  return res.status(200).json(notes);
});

app.post("/notes", (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body) {
    return res.status(400).json({
      message: "Note is empty",
    });
  }

  const note = {
    ...body.content,
  };
  notes.push(note);
  console.log(notes);

  return res.status(201).json({
    message: "created",
  });
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  const updatedNotes = notes.filter((note) => note.id !== Number(id));
  console.log(updatedNotes);

  res.status(204).end();
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
