import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";

const Blogs = () => {
  const [qnas, setQNAS] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // axios user for getting blogs data
    setLoading(true);
    axios.get(`${process.env.REACT_APP_SERVER}/blogs`).then((data) => {
      setLoading(false);
      setQNAS(data.data);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5">
      {qnas?.map((qna) => {
        return (
          <div key={qna._id} className="p-5 bg-base-300 rounded-md">
            <h1 className="text-xl font-bold">{qna.question}</h1>
            <p className="py-6 text-justify">{qna.answer}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
