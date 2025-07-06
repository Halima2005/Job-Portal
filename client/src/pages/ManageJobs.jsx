import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { manageJobsData } from "../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs,setJobs] = useState(false)

  const {backendUrl,companyToken} = useContext(AppContext)

  //Function to fetch company Job Applications data
  const fetchCompanyJobs = async () => {

    try{
      const{ data} = await axios.get(backendUrl + 'api/company/list-jobs',
        {headers:{token:companyToken}}
        
      )

      if(data.success){
        setJobs(data.jobsData.reverse())
      } else{
        toast.error(data.message)
      }



    }catch(error){
        toast.error(error.message)
    }

  }
  

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left max-sm:hidden">
                #
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Job Title
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left max-sm:hidden">
                Date
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Location
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Applicants
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Visible
              </th>
            </tr>
            <tbody>
              {manageJobsData.map((job, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 ">
                    {job.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    {job.applicants}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <input className="scale-125 ml-4" type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </thead>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black text-white py-2 px-4 rounded"
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
