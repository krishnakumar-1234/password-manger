"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faEye,
  faEyeSlash,
  faTrash,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [inputs, setInputs] = useState({
    urlWeb: "",
    username: "",
    password: "",
  });
  const [entries, setEntries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Load entries from localStorage on component mount
    const storedEntries = localStorage.getItem("entries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    // Save entries to localStorage whenever entries change
    if (entries.length > 0) {
      localStorage.setItem("entries", JSON.stringify(entries));
    }
  }, [entries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = () => {
    if (inputs.urlWeb && inputs.username && inputs.password) {
      setEntries([...entries, inputs]);
      setInputs({ urlWeb: "", username: "", password: "" });
      toast.success("Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDelete = (index) => {
    const newEntries = entries.filter((entry, i) => i !== index);
    setEntries(newEntries);
    toast.warn("Entry deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div className="container mx-auto p-5">
        <div className="bg-gray-700 rounded p-2 pt-8">
          <div className="w-full flex items-center mb-2 ">
            <input
              className="w-[97.90%] h-10 rounded-full bg-gray-800 text-white p-4 mb-2 widthHundred"
              type="text"
              name="urlWeb"
              id="urlWeb"
              placeholder="Enter Website URL"
              value={inputs.urlWeb}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex items-center justify-center gap-2 mb-2 flexDirection">
            <input
              className="w-[60%] h-10 rounded-full bg-gray-800 text-white p-4 widthHundred"
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={inputs.username}
              onChange={handleChange}
            />
            <div className="w-[40%] flex items-center widthHundred">
              <input
                className="w-[100%] h-10 rounded-full bg-gray-800 text-white p-4"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
                value={inputs.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="ml-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="text-white eye"
                />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end pr-8">
            <button
              type="button"
              className="w-[200px] text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center widthHundred"
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save!
            </button>
          </div>
        </div>
        <div className="mt-5 tableContainer">
          <div className="innerTableContainer">
            <table className="w-full table-auto border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border border-gray-800 px-4 py-2">
                    Website URL
                  </th>
                  <th className="border border-gray-800 px-4 py-2">Username</th>
                  <th className="border border-gray-800 px-4 py-2">Password</th>
                  <th className="border border-gray-800 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className="bg-gray-900 text-white">
                    <td className="border border-gray-800 px-4 py-2">
                      {entry.urlWeb}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {entry.username}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {entry.password}
                    </td>
                    <td className="border border-gray-800 px-4 py-2 flex items-center justify-center gap-2">
                      <button onClick={() => handleCopy(entry.urlWeb)}>
                        <FontAwesomeIcon icon={faCopy} className="text-white" />
                      </button>
                      <button onClick={() => handleCopy(entry.username)}>
                        <FontAwesomeIcon icon={faCopy} className="text-white" />
                      </button>
                      <button onClick={() => handleCopy(entry.password)}>
                        <FontAwesomeIcon icon={faCopy} className="text-white" />
                      </button>
                      <button onClick={() => handleDelete(index)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-white"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
