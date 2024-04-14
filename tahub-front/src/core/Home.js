import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { isAuthenticated } from "../auth";
import { getPostings } from "../admin/apiAdmin";
import Postings from "../user/Postings";

const Home = () => {
  const { user, token } = isAuthenticated();
  const [jobs, setJobs] = useState([]);

  const loadJobs = () => {
    getPostings().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setJobs(data);
      }
    });
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Conditional rendering of Layout and Footer based on Postings component
  const renderContent = () => {
    if (jobs.length > 0) {
      return <Postings jobs={jobs} setJobs={setJobs} />;
    }
    // If no jobs are available, render only the layout without Postings
    return (
      <Layout
        title="TA HUB"
        description="Welcome to North University TA Management System"
        className="container-fluid"
      >
        {/* Other content */}
        <h2 className="mb-4">No Postings available</h2>
        {/* Other components or content */}
      </Layout>
    );
  };

  return <div>{renderContent()}</div>;
};

export default Home;
