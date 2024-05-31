const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let houses = [
  {
    _id: 1,
    name: "Farmhouse",
    size: 2000,
    bedrooms: 3,
    bathrooms: 2.5,
    main_image: "images/farm.webp",
  },
  {
    _id: 2,
    name: "Mountain House",
    size: 1700,
    bedrooms: 3,
    bathrooms: 2,
    main_image: "images/mountain-house.webp",
  },
  {
    _id: 3,
    name: "Lake House",
    size: 3000,
    bedrooms: 4,
    bathrooms: 3,
    main_image: "images/farm.webp",
  },
];

app.get("/api/houses", (req, res) => {
  res.send(houses);
});

app.post("/api/houses", upload.single("img"), (req, res) => {
  const result = validateHouse(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const house = {
    _id: houses.length + 1,
    name: req.body.name,
    size: req.body.size,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
  };

  if (req.file) {
    house.main_image = "images/" + req.file.filename;
  }

  houses.push(house);
  res.status(200).send(house);
});

app.put("/api/houses/:id", upload.single("img"), (req, res) => {
  let house = houses.find((h) => h._id === parseInt(req.params.id));

  if (!house) res.status(400).send("House with given id was not found");

  const result = validateHouse(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  house.name = req.body.name;
  house.description = req.body.description;
  house.size = req.body.size;
  house.bathrooms = req.body.bathrooms;
  house.bedrooms = req.body.bedrooms;

  if (req.file) {
    house.main_image = "images/" + req.file.filename;
  }

  res.send(house);
});

app.delete("/api/houses/:id", (req, res) => {
  const house = houses.find((h) => h._id === parseInt(req.params.id));

  if (!house) {
    res.status(404).send("The house with the given id was not found");
  }

  const index = houses.indexOf(house);
  houses.splice(index, 1);
  res.send(house);
});

const validateHouse = (house) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    name: Joi.string().min(3).required(),
    size: Joi.number().required(),
    bedrooms: Joi.number().required(),
    bathrooms: Joi.number().required(),
  });

  return schema.validate(house);
};

app.listen(3002, () => {
  console.log("I'm listening");
});
