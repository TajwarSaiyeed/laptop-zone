import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [qnas, setQNAS] = useState([]);
  useEffect(() => {
    fetch("blogs.json")
      .then((res) => res.json())
      .then((data) => setQNAS(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5">
      {qnas?.map((qna) => {
        return (
          <div key={qna.id} className="p-5 bg-base-300 rounded-md">
            <h1 className="text-xl font-bold">{qna.question}</h1>
            <p className="py-6 text-justify">{qna.answer}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
