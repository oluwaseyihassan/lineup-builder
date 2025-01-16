import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const AllLineUps = () => {
  const [allLineUps, setAllLineUps] = useState([]);
  const [loading, setLoading] = useState(false);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    const fetchAllLineUps = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://lineup-builder-server.onrender.com/line-ups");
        const data = await response.json();
        setAllLineUps(data);
        console.log(data);
        console.log("fetched")
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchAllLineUps();
  }, []);
  return (
    <div className=" text-white max-w-[1440px] mx-auto px-2 mb-5">
      <h1 className="text-3xl font-bold text-center my-5">All LineUps</h1>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      <div className=" ">
        {!loading &&
          allLineUps.reverse().map((lineUp, index) => {
            return (
              <Link
                to={`/lineup/${lineUp._id}`}
                key={index}
                className=" bg-[#1D1D1D] mb-1 block py-1 px-3 first:rounded-t-md last:rounded-b-md"
              >
                <div>{lineUp.team} - {lineUp.formation}</div>
                <p className=" text-[8px] text-[#9F9F9F]">
                  {timeAgo
                    .format(new Date(`${lineUp.createdAt}`))
                    .replace("from now", "")}
                </p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default AllLineUps;
