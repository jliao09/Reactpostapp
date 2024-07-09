import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  users,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay goes here
  await sleep(5000);
  res.json(posts);
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === id);

  if (post) {
    const author = users.find((user) => user.id === post.userId);
    const authorName = author ? author.email.split("@")[0] : "Unknown";

    res.json({ ...post, authorName });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
  //res.json(posts[0]);
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret") as IDecodedUser;
    const user = findUserById(decodedUser.id);

    if (!user) throw new Error("User not found");

    const newPost = {
      ...req.body,
      id: posts.length + 1,
      userId: user.id,
    };

    addPost(newPost);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.put("/api/posts/:id", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret") as IDecodedUser;
    const user = findUserById(decodedUser.id);

    if (!user) throw new Error("User not found");

    const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id, 10));

    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (posts[postIndex].userId !== user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    posts[postIndex] = { ...posts[postIndex], ...req.body };
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401).json({ error });
  }
});


app.listen(port, () => console.log("Server is running"));
