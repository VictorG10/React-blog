import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Navbar from "./Navbar";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { Route, Routes, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      dateTime: "July 01, 2021 11:17:36 Am",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima reprehenderit maiores voluptas obcaecati praesentium ipsum. Ad sint quidem accusamus non, molestiae nam repellendus? Expedita cum sapiente unde? Quas, nam.",
    },
    {
      id: 2,
      title: "My Second Post",
      dateTime: "July 01, 2021 11:17:36 Am",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima reprehenderit maiores voluptas obcaecati praesentium ipsum. Ad sint quidem accusamus non, molestiae nam repellendus? Expedita cum sapiente unde? Quas, nam.",
    },
    {
      id: 3,
      title: "My Third Post",
      dateTime: "July 01, 2021 11:17:36 Am",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima reprehenderit maiores voluptas obcaecati praesentium ipsum. Ad sint quidem accusamus non, molestiae nam repellendus? Expedita cum sapiente unde? Quas, nam.",
    },
    {
      id: 4,
      title: "My Fourth Post",
      dateTime: "July 01, 2021 11:17:36 Am",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima reprehenderit maiores voluptas obcaecati praesentium ipsum. Ad sint quidem accusamus non, molestiae nam repellendus? Expedita cum sapiente unde? Quas, nam.",
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  // const history = useHistory();

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, dateTime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    // history.pushState('/')
  };

  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    // history.push("/");
  };
  return (
    <div className="App">
      <Header title="React Js Blog" />
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path="/" element={<Home posts={searchResults} />} />
        <Route
          exact
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          exact
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
