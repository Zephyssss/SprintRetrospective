const router = require("express").Router();
const {verifyToken}= require("../controllers/auth.controller.js");
import {test} from "../controllers/test.js"

router.get("/",(req,res)=>{
    console.log("oooo")
})

module.exports = router;