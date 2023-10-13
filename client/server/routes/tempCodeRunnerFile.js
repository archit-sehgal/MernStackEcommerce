const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {authenticateJwt,secretKey}=require("../middleware/auth")
const mongoose = require("mongoose");
const { User, Admin, Product } = require("../db");
const router= express.Router();