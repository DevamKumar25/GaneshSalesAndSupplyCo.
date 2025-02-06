const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const transporter = require("./nodemailer.config");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// GET route for testing the server
app.get("/", (req, res) => {
    console.log(path.join(__dirname, "public", "index.html"));
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



// POST route to handle form submission
app.post("/send", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: '"GANESH SALES AND SUPPLY COMPANY" <devamkumar758@gmail.com>', // Sender address
      to: "devamkumar758@gmail.com", // Your email to receive messages
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`, // Plain text body
    });
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
