//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Using bod-parser
app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
  res.sendFile(__dirname +"/signup.html");
});


//sol3 -- worked
app.post('/', (req, res) => {
  var fName = req.body.fName
  var lName = req.body.lName
  var email = req.body.email
  const listId = "b753aa18f4"
  var userData = {
  members: [{
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fName,
      LNAME: lName
    }
  }]};
 mailchimp.setConfig({
   apiKey: "1489cddc8b0f1977ed23f1560ac87f4e-us20",
   server: "us20",
 });
 const run = async () => {
  try {
    const response = await mailchimp.lists.batchListMembers(listId, userData );
    console.log(response);
    res.sendFile(__dirname + "/success.html");
   } catch (err) {
     console.log(err.status);
     res.sendFile(__dirname + "/failure.html");
   }
  };
  run();
//res.send("<p>Thanks for your submission</p>")
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});
