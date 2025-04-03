const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const { title, body, tags } = req.body;

    const question = await prisma.question.create({
      data: {
        title,
        body,
        tags
      }
    });

    res.status(201).json({message: "Question created successfully!"});
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Failed to create question" });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

module.exports = {
  createQuestion,
  getQuestions
};
