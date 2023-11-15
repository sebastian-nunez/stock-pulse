import axios from "axios";
import { TAGS_BASE_URL } from "../utils/constants.js";
import { validateTagDetails } from "../utils/validator.js";

class TagsAPI {
  static getAllTags = async () => {
    const res = await axios.get(TAGS_BASE_URL);
    validateTagDetails(res.data[0]); // validate the first tag

    return res.data;
  };

  static getTagById = async (tagId) => {
    const res = await axios.get(`${TAGS_BASE_URL}/${tagId}`);
    const validatedTag = validateTagDetails(res.data);

    return validatedTag;
  };

  static getTagByName = async (tagName) => {
    const res = await axios.get(`${TAGS_BASE_URL}/byName/${tagName}`);
    const validatedTag = validateTagDetails(res.data);

    return validatedTag;
  };

  static deleteTag = async (tagId) => {
    const res = await axios.delete(`${TAGS_BASE_URL}/${tagId}`);
    const deletedTag = res.data;

    return deletedTag;
  };

  static createTag = async (tagDetails) => {
    const validatedTag = validateTagDetails(tagDetails);

    const body = JSON.stringify(validatedTag);
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(TAGS_BASE_URL, body, { headers });
    const createdTag = res.data;

    return createdTag;
  };

  static updateTag = async (tagDetails) => {
    const validatedTag = validateTagDetails(tagDetails);

    if (validatedTag.tag_id === undefined) {
      throw new Error("Tag id is required!");
    }

    const body = JSON.stringify(validatedTag);
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.patch(
      `${TAGS_BASE_URL}/${validatedTag.tag_id}`,
      body,
      {
        headers,
      },
    );
    const updatedTag = res.data;

    return updatedTag;
  };
}

export default TagsAPI;
