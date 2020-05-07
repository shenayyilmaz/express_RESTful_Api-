const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

// validation with Joi
const validateCourse = (course) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
};
////////////

// basic get
app.get("/", (req, res) => {
  res.send("helloo word");
});

// get all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// get one course with id
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  res.send(courses);
});

// create course
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// update course
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(result.error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

// delete course
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const index = courses.indexOf(course);

  courses.splice(index, 1);
  res.send(courses);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen ${port} port`));
