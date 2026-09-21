//BACKEND SCRIPT as Node Server + Express JS
/*
    Backend server processes browsers tasks as requests and responses, render pug templates
    , serves css, js, and images for the browser, db management , user authentication, forms management, and apis creation
*/
"use strict";

const express = require("express");
const path = require("path");
const { projects } = require("./data/data.json"); //declare the data file so can be shown in the browser
//Setting { projects }, will directly target the projects property inside de json

//const bodyParser = require("body-parser"); //for parsing browser DATA REQUESTS
//app.use(bodyParser.urlencoded({ extended: false })); // HANDLES DATA THAT THE BROWSER SENDS

const app = express();
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

// create the browser path /static, with the method express.static() relates the physical archives and folders in public to the /static browser path
app.use("/static", express.static(path.join(__dirname, "public"))); //any archive the browser requests will be retrieved by the node server
//node receives a request to show a /static archive and looks for it in the public folder as it is declared to be related to the static browser path

//set the root path
app.get("/", (req, res) => {
  //pass DATA as THE LET DECLARED IN THE PUG FILE, for respond with json files theres no need to parse()
  res.render("index", { data: projects }); //renders index.pug template
  //locals are the variables declared in the template
});

app.get("/about", (req, res) => {
  res.render("about");
});

//project routes id, in this path the id will be equal to the project id property value in the data file
app.get("/:id", (req, res) => {
  const { id } = req.params; //store the number in the path so we can target the corresponding project in Data

  //Set prepare the data so the pug template can access the data.
  //Target each property of the
  const projectNo = id;
  const projectTitle = projects[id].project_title;
  const projectName = projects[id].project_name;
  const projectDesc = projects[id].description;
  const projectTech = projects[id].technologies;
  const projectLive = projects[id].live_link;
  const proGitlink = projects[id].github_link;
  const proImgs = projects[id].image_urls;

  //set all data in a single obj so the template can access the data by the property name and its value
  const templateData = {
    projectNo,
    projectTitle,
    projectName,
    projectDesc,
    projectTech,
    projectLive,
    proGitlink,
    proImgs,
  };

  res.render("project", templateData);
});

app.listen(3000);
console.log("running on port 3000");
