import Content from '../models/content.js'
import {contentSchema, paramsSchema, contentUpdateSchema} from '../models/contentSchema.js'

const contentController = {
  getContent: async (req, res) => {
    try {
      const validationParams = contentSchema.validate(req.query);
      if (validationParams.error) {
        return res.status(400).json({ error: validationParams.error.details[0].message });
      }
      
      const content = await Content.findOne({
        document_id: req.query.document_id,
      });
      if (!content) {
        const newContent = await Content.create(req.query);
        return res.status(200).json(newContent);
      }
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createContent: async (req, res) => {
    try {
      const validationResult = contentSchema.validate(req.body);
      if (validationResult.error) {
        return res
          .status(400)
          .json({ error: validationResult.error.details[0].message });
      }
      const newContent = await Content.create(req.body);
      res.status(201).json(newContent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateContent: async (req, res) => {
    try {
      const validationResult = contentUpdateSchema.validate(req.body);
      if (validationResult.error) {
        return res
          .status(400)
          .json({ error: validationResult.error.details[0].message });
      }
      const updatedContent = await Content.findOneAndUpdate(
        { document_id: req.body.document_id },
        req.body,
        { new: true }
      );
  
      res.status(200).json(updatedContent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};



export default contentController;
