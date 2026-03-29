const express = require("express");
const router = express.Router();
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Idea = require("../models/Idea");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// POST — Analyze Startup Idea

router.post("/validate", async (req, res) => {

  try {

    const { title, description, market } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
You are a startup validation AI.

Analyze the startup idea and return ONLY JSON.

Startup Idea:
Title: ${title}
Description: ${description}
Market: ${market}

Return JSON exactly like this:

{
 "validationScore": number between 0 and 100,
 "strengths": ["point1","point2"],
 "weaknesses": ["point1","point2"],
 "marketPotential": "text",
 "suggestions": ["point1","point2"]
}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    text = text.replace(/```json|```/g, "").trim();

    const analysis = JSON.parse(text);

    const idea = new Idea({
      title,
      description,
      market,
      validationScore: analysis.validationScore,
      analysis: analysis
    });

    await idea.save();

    res.json({
      message: "Idea analyzed successfully",
      data: analysis
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "AI analysis failed"
    });

  }

});


// GET — Fetch All Ideas

router.get("/", async (req, res) => {

  try {

    const ideas = await Idea.find().sort({ createdAt: -1 });

    res.json({
      message: "Ideas fetched successfully",
      data: ideas
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch ideas"
    });

  }

});


// GET — Fetch Single Idea

router.get("/:id", async (req, res) => {

  try {

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        message: "Idea not found"
      });
    }

    res.json({
      message: "Idea fetched successfully",
      data: idea
    });

  } catch (error) {

    res.status(500).json({
      message: "Error fetching idea"
    });

  }

});


module.exports = router;