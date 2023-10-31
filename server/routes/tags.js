import express from "express";
import TagsController from "../controllers/tags.js";

const router = express.Router();

router.get("/", TagsController.getTags);
router.get("/:tagId", TagsController.getTagById);
router.get("/byName/:tagName", TagsController.getTagByName);
router.post("/", TagsController.createTag);
router.delete("/:tagId", TagsController.deleteTag);
router.patch("/:tagId", TagsController.updateTag);

export default router;
