//Members:
// Catubay Jessie Francis
// Inoc Cloyd Cydreck
// Sansait Remar

const express = require("express");
const app = express();
const PORT = 5000;
const profile = require("./profiles.json");

app.use(express.json());

//CREATE
app.post("/api/profile", (req, res) => {
  const { name, email } = req.body;
  const newUser = { name, email };
  const data = profile.push(newUser);

  res.json({
    message: "Success",
    data,
  });
});

//READ
app.get("/api/get-profiles", (req, res) => {
  res.json(profile);
});

//UPDATE
app.put("/api/update-profile", (req, res) =>{
  const { email, newName, newEmail } = req.body;

  const profileIndex = profile.findIndex((p) => p.email === email);

  if (profileIndex === -1) {
    return res.status(404).json({ message: "Profile not found" });
  }

  if(newName){
    profile[profileIndex].name = newName;
  }
  if(newEmail){
    profile[profileIndex].email = newEmail;
  }

  res.json({
    message: "Profile updated succesfully",
    data: profile[profileIndex],
  })
});

//DELETE
app.delete("/api/delete-profile", (req, res) =>{
  const { email, name } = req.body;

  const profileIndex = profile.findIndex((p) => p.email === email);

  if (profileIndex === -1) {
    return res.status(404).json({ message: "Profile not found" });
  }
  
  const deletedProfile = profile.splice(profileIndex, 1)[0];

  res.json({
    message: "Profile deleted successfully",
    data: deletedProfile,
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});