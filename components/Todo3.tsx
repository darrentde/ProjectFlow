import { Box } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../src/lib";

const Todo3 = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: "", content: "" });
  const { title, content } = post;

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from("posts").select();
    setPosts(data);
    console.log("data: ", data);
  }

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
