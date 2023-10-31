import Tag from "../models/tag";

class TagsController {
  static getTags = async (req, res) => {
    try {
      const tags = await Tag.getAll();
      res.status(200).json(tags);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getTagById = async (req, res) => {
    const { tagId } = req.params;

    try {
      tagId = parseInt(tagId);

      const tag = await Tag.getOneById(tagId);
      res.status(200).json(tag);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getTagByName = async (req, res) => {
    const { tagName } = req.params;

    try {
      const tag = await Tag.getOneByName(tagName);
      res.status(200).json(tag);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static createTag = async (req, res) => {
    const { name, description } = req.body;

    try {
      const newTag = await Tag.createOne(name, description);
      res.status(201).json(newTag);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static deleteTag = async (req, res) => {
    const { tagId } = req.params;

    try {
      tagId = parseInt(tagId);

      const tag = await Tag.deleteOne(tagId);
      res.status(200).json(tag);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static updateTag = async (req, res) => {
    const { tagId } = req.params;
    const { name, description } = req.body;

    try {
      tagId = parseInt(tagId);

      const tag = await Tag.updateOne(tagId, name, description);
      res.status(200).json(tag);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default TagsController;
