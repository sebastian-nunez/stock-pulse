import axios from "axios";
import { validateTagDetails } from "../../../server/utils/validator.js";

const TAGS_BASE_URL = "/api/tags";

class TagsAPI {
  static getAllTags = async () => {
    const res = await axios.get(TAGS_BASE_URL);
    const tags = res.data;

    return tags;
  };

  static getTagById = async (tagId) => {
    const res = await axios.get(`${TAGS_BASE_URL}/${tagId}`);
    const tag = res.data;

    return tag;
  };

  static getTagByName = async (tagName) => {
    const res = await axios.get(`${TAGS_BASE_URL}/byName/${tagName}`);
    const tag = res.data;

    return tag;
  };

  static deleteTag = async (tagId) => {
    const res = await axios.delete(`${TAGS_BASE_URL}/${tagId}`);
    const deletedTag = res.data;

    return deletedTag;
  };

  static createTag = async (tagDetails) => {
    validateTagDetails(tagDetails);

    const body = JSON.stringify(tagDetails);
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(TAGS_BASE_URL, body, { headers });
    const createdTag = res.data;

    return createdTag;
  };

  static updateTag = async (tagDetails) => {
    validateTagDetails(tagDetails);

    if (tagDetails.tag_id === undefined) {
      throw new Error("Tag id is required!");
    }

    const body = JSON.stringify(tagDetails);
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.patch(
      `${TAGS_BASE_URL}/${tagDetails.tag_id}`,
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
