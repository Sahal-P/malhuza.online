const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  document_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  content: [{ type: Object, default: {} }]
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
