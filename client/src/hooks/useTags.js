import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import TagsAPI from "../services/TagsAPI";
import { TAGS_QUERY_KEY } from "../utils/constants";

/**
 *  Custom hook to delete, update, and create tags
 * @param {Function} onSuccessAction callback function to execute after a successful action
 * @returns {Object} deleteTag, updateTag, createTag
 */
const useTags = ({ onSuccessAction }) => {
  // react-query
  const queryClient = useQueryClient();

  const deleteTag = useMutation(TagsAPI.deleteTag, {
    onSuccess: (response) => {
      queryClient.invalidateQueries([TAGS_QUERY_KEY]);

      const tagName = response.deletedTag.name;
      toast.success(`${tagName} successfully deleted!`);

      onSuccessAction();
    },
  });

  const updateTag = useMutation(TagsAPI.updateTag, {
    onSuccess: (response) => {
      queryClient.invalidateQueries([TAGS_QUERY_KEY]);

      const tagName = response.updatedTag.name;
      toast.success(`${tagName} successfully updated!`);

      onSuccessAction();
    },
  });

  const createTag = useMutation(TagsAPI.createTag, {
    onSuccess: (response) => {
      queryClient.invalidateQueries([TAGS_QUERY_KEY]);

      const tagName = response.createdTag.name;
      toast.success(`${tagName} successfully created!`);

      onSuccessAction();
    },
  });

  return { deleteTag, updateTag, createTag };
};

export default useTags;
