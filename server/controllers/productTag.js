import ProductTag from "../models/productTag.js";

class ProductTagController {
    static getProductTags = async (req, res) => {
        try {
            const productTags = await ProductTag.getAll();

            if (!productTags) {
                res.status(404).json({ message: "No product tags found!" });
                return;
            }

            res.status(200).json(productTags);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    static getProductsWithTag = async (req, res) => {
        const { tagId } = req.params;

        try {
            const products = await ProductTag.getAllProducts(tagId);

            if (!products) {
                res.status(404).json({ message: "No products found!" });
                return;
            }

            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    static getTagsOfProduct = async (req, res) => {
        const { productId } = req.params;

        try {
            const tags = await ProductTag.getAllTags(productId);

            if (!tags) {
                res.status(404).json({ message: "No tags found!" });
                return;
            }

            res.status(200).json(tags);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    static deleteProductTag = async (req, res) => {
        const { productId } = req.params;

        try {
            const deletedProductTag = await ProductTag.deleteOne(productId);

            if (!deletedProductTag) {
                res.status(404).json({ message: "Product tag not found!" });
                return;
            }

            res.status(200).json(deletedProductTag);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    static deleteAllTagsOfProduct = async (req, res) => {
        const { productId } = req.params;

        try {
            const deletedProductTag = await ProductTag.deleteAllTags(productId);

            if (!deletedProductTag) {
                res.status(404).json({ message: "Product tag not found!" });
                return;
            }

            res.status(200).json(deletedProductTag);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

}

export default ProductTagController;