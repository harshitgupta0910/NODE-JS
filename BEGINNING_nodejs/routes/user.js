const express = require('express');

const router = express.Router();

router.get('/', async(req, res) => {
    const allDbUsers= await User.find({});
    res.setHeader("X-MyName", "Harshit Gupta") //always add X to custom header
    return res.json({ allDbUsers });
});

app.route('/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);
        return res.json({ user });
    })
    .patch(async(req, res) => {
        // const id = Number(req.params.id);
        await User.findByIdAndUpdate(req.params.id, {last_name: "Mishra"});
        return res.json({ status: "User updated"});
    })
    .delete(async(req, res) => {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.json({ status: "User deleted" })
    });

// POST: Add a new user
router.post("/",async(req, res) => {
    const body = req.body;

    if (!body  || !body.first_name ||!body.last_name || !body.email || !body.job_title  || !body.gender) {
        return res.status(400).json({ error: "Invalid request body" });
    }

   const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    });
// console.log("result", result);
return res.status(201).json({ msg: "success"});
});

module.exports = router;