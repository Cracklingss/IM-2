// Members:
// Jessie Francis Catubay
// Cloyd Inoc Cydreck
// Remar Sansait

const express = require("express");
const app = express();
const PORT = 5000;
const profile = require("./profiles.json");

//middleware
app.use(express.json());

//CREATE
app.post("/api/create-profile", (req, res) => {
  const { name, age, year } = req.body;
  const newUser = { name, age, year };
  const data = profile.push(newUser);

  res.json({
    message: "Profile added",
    data: newUser,
  });
});

//READ
app.get("/api/get-profile", (req, res) => {
  res.json(profile);
});

// UPDATE
app.put("/api/update-profile", (req, res) => {
  const { name, newName, newAge, newYear, } = req.body;

  const profileIndex = profile.findIndex((p) => p.name === name);

  if(profileIndex === -1){
    return res.status(404).json({ message: "Profile not found!" });
  }

  if(newName){
    profile[profileIndex].name = newName;
  }
  if(newAge){
    profile[profileIndex].age = newAge;
  }
  if(newYear){
    profile[profileIndex].year = newYear;
  }

  res.json({ message: "Updated Successfully!" });
});

// DELETE
app.delete("/api/delete-profile", (req, res) =>{
  const { name } = req.body;

  const profileIndex = profile.findIndex((p) => p.name = name);

  if(profileIndex === -1){
    return res.json({ message: "Profile Not Found" });
  }

  const deletedProfile = profile.splice(profileIndex, 1)[0];
  
  res.json({
    message: "Profile Deleted Successfully",
    data: deletedProfile
  });
});

app.listen(PORT, () => {
  console.log(`http:localhost:${PORT}`);
})
