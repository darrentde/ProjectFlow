/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
import { Box } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../src/lib";

const Todo3 = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: "", content: "" });
  const { title, content } = post;

  async function fetchPosts() {
    const { data } = await supabase.from("posts").select();
    setPosts(data);
    console.log("data: ", data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function createPost() {
    await supabase.from("posts").insert([{ title, content }]).single();
    setPost({ title: "", content: "" });
    fetchPosts();
  }

  return (
    <Box>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <Input
        placeholder="Content"
        value={content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      />
      <Button onClick={createPost}>Create Post</Button>

      {/* Disabled no shadow line for whole file */}
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </Box>
  );
};

export default Todo3;
