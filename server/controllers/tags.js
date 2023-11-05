import Tag from "../models/tag.js";
import { validateTagDetails } from "../utils/validator.js";

class TagsController {
  static getTags = async (req, res) => {
    try {
      const tags = await Tag.getAll();

      if (tags.length === 0) {
        res.status(404).json({ message: "No tags found!" });
        return;
      }

      res.status(200).json(tags);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getTagById = async (req, res) => {
    let { tagId } = req.params;

    try {
      tagId = parseInt(tagId);

      const tag = await Tag.getOneById(tagId);

      if (!tag) {
        res.status(404).json({ message: "Tag not found!" });
        return;
      }

      res.status(200).json(tag);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getTagByName = async (req, res) => {
    const { tagName } = req.params;

    try {
      const tag = await Tag.getOneByName(tagName);

      if (!tag) {
        res.status(404).json({ message: "Tag not found!" });
        return;
      }

      res.status(200).json(tag);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static createTag = async (req, res) => {
    let { name, description } = req.body;

    try {
      validateTagDetails({ name, description });

      const createdTag = await Tag.createOne(name, description);

      if (!createdTag) {
        res.status(409).json({ message: "Tag already exists!" });
        return;
      }

      res
        .status(201)
        .json({ message: "Tag created successfully!", createdTag });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static deleteTag = async (req, res) => {
    let { tagId } = req.params;

    try {
      tagId = parseInt(tagId);

      const deletedTag = await Tag.deleteOne(tagId);

      if (!deletedTag) {
        res.status(404).json({ message: "Tag not found!" });
        return;
      }

      res
        .status(200)
        .json({ message: "Tag deleted successfully!", deletedTag });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static updateTag = async (req, res) => {
    let { tagId } = req.params;
    const { name, description } = req.body;

    try {
      validateTagDetails({ name, description });
      tagId = parseInt(tagId);

      const updatedTag = await Tag.updateOne(tagId, name, description);

      if (!updatedTag) {
        res.status(404).json({ message: "Tag not found!" });
        return;
      }

      res
        .status(200)
        .json({ message: "Tag updated successfully!", updatedTag });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default TagsController;
