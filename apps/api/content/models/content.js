import mongoose from 'mongoose'

const ContentSchema = new mongoose.Schema({
  document_id: { type: String, required: true, unique: true },
  content: { type: String, default: undefined }
});

const Content = mongoose.model('Content', ContentSchema);

export default Content;
