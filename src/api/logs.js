/* eslint-disable linebreak-style */
const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const { API_KEY } = process.env;

const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    next(error);
  }
});

// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res, next) => {
  try {
    if (req.get('X-API-KEY') !== API_KEY) {
      throw new Error('UnAuthorized');
    }
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.constructor.name);

    if (error.name === 'ValidationError') {
      res.status(402);
    }
    next(error);
  }
});
module.exports = router;
