const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

require('../models/Message');
const message = mongoose.model('messages');
