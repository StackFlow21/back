const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const { title, body, language, secret, authorId } = req.body;

    if (!title || !body || !language || !secret || !authorId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const question = await prisma.question.create({
      data: {
        title,
        body,
        language,
        secret,
        authorId: parseInt(authorId),
        tags: req.body.tags || '',
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true
          }
        }
      }
    });

    res.status(201).json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Failed to create question' });
  }
};

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

// Add a comment to a question
const addComment = async (req, res) => {
  try {
    const { questionId, body, authorId } = req.body;

    if (!questionId || !body || !authorId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        questionId: parseInt(questionId),
        authorId: parseInt(authorId)
      },
      include: {
        author: true
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Get comments for a question
const getComments = async (req, res) => {
  try {
    const { questionId } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        questionId: parseInt(questionId)
      },
      include: {
        author: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  addComment,
  getComments
};
