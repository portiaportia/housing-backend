const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/houses", (req, res) => {
  const houses = [
    {
      name: "Farmhouse",
      size: 2000,
      bedrooms: 3,
      bathrooms: 2.5,
      features: ["wrap around porch", "attached garage"],
      main_image: "images/farm.webp",
      floor_plans: [
        {
          name: "Main Level",
          image: "images/farm-floor1.webp",
        },
        {
          name: "Basement",
          image: "images/farm-floor2.webp",
        },
      ],
    },
    {
      name: "Mountain House",
      size: 1700,
      bedrooms: 3,
      bathrooms: 2,
      features: ["grand porch", "covered deck"],
      main_image: "images/mountain-house.webp",
      floor_plans: [
        {
          name: "Main Level",
          image: "images/mountain-house1.webp",
        },
        {
          name: "Optional Lower Level",
          image: "images/mountain-house2.webp",
        },
        {
          name: "Main Level Slab Option",
          image: "images/mountain-house3.jpg",
        },
      ],
    },
    {
      name: "Lake House",
      size: 3000,
      bedrooms: 4,
      bathrooms: 3,
      features: ["covered deck", "outdoor kitchen", "pool house"],
      main_image: "images/farm.webp",
      floor_plans: [
        {
          name: "Main Level",
          image: "images/lake-house1.webp",
        },
        {
          name: "Lower Level",
          image: "images/lake-house2.webp",
        },
      ],
    },
  ];

  res.send(houses);
});

app.listen(3001, () => {
  console.log("I'm listening");
});
