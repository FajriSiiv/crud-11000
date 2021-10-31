import React, { useState, useEffect } from "react";
import axios from "axios";
import { async } from "q";

function App() {
  const [titleData, setTitleData] = useState("");
  const [authorData, setAuthorData] = useState("");
  const [languageData, setLanguageData] = useState("");
  const [socialData, setSocialData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/posts", {})
      .then(res => setSocialData(res.data))
      .catch(err => console.log(err));
  }, []);

  const hanldeSubmit = e => {
    e.preventDefault();
    console.log({ titleData, authorData, languageData });
    axios
      .post("http://localhost:8000/posts", {
        title: titleData,
        author: authorData,
        language: languageData
      })
      .then(res => setSocialData(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <div>
        <div>
          <label>Title</label>
          <input type="text" value={titleData} onChange={e => setTitleData(e.target.value)} />
        </div>
        <div>
          <label>Author</label>
          <input type="text" value={authorData} onChange={e => setAuthorData(e.target.value)} />
        </div>
        <div>
          <label>Language</label>
          <input type="text" value={languageData} onChange={e => setLanguageData(e.target.value)} />
        </div>
        <button onClick={hanldeSubmit}>Submit</button>
      </div>

      {socialData
        ? socialData.map(item => (
            <div key={item.key}>
              <h4>Title: {item.title}</h4>
              <h5>Author: {item.author} </h5>
              <h5>Language: {item.language} </h5>
            </div>
          ))
        : null}
    </div>
  );
}

export default App;
