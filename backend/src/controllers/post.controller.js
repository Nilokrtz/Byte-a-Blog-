import { createService, findAllService } from "../services/post.service.js";

const createController = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    if (!title || !content || !image) {
      res.status(400).send("Submit all required fields");
    }

    await createService({
      title,
      content,
      image,
      user: { _id: "695746ea50c382d2fc64de0b" },
    });

    res.status(201).send({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findAllController = async (req, res) => {
  try {
    const posts = await findAllService();
    if (posts.length === 0) {
      return res.status(404).send({ message: "There are no posts" });
    }

    res.send(posts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { createController, findAllController };
