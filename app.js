"use strict";

const express = require("express");
const path = require("path");
const { projects } = require("./data/data.json"); //declare the data file so can be shown in the browser
//Setting { projects }, will directly target the projects property inside de json

const app = express();
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "public"))); //any archive the browser requests will be retrieved by the node server
//node receives a request to show a /static archive and looks for it in the public folder as it is declared to be related to the static browser path

app.get("/", (req, res) => {
  //pass DATA as THE LET DECLARED IN THE PUG FILE, for respond with json files theres no need to parse()
  res.render("index", { data: projects }); //renders index.pug template
  //locals are the variables declared in the template
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:id", (req, res) => {
  const { id } = req.params;

  const project = projects.find((item) => String(item.id) === id); // take the only object that is related to the path id

  if (!project) {
    return res.status(404).render("notfound");
  }
  //use the const project and its properties
  const templateData = {
    projectNo: project.id,
    title: project.title,
    projectName: project.name,
    projectDesc: project.description,
    projectTech: project.technologies,
    projectLive: project.live_link,
    proGitlink: project.github_link,
    proImgs: project.image_urls,
  };

  res.render("project", templateData);
});

app.use((req, res) => {
  res.status(404).render("notfound"); //with this handler i target the 404 error and render my pug page
});

app.listen(3000);
console.log("running on port 3000");
