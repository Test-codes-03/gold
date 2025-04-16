import React from "react";
import { useState, useEffect } from "react";
import "./Admindashbord.css";
import * as XLSX from "xlsx";
import moment from "moment";
import { API } from "../../src/axios";
import Setprice from "./Setprice";

const Admindashbord = () => {
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isreport, setisreport] = useState(true);
  const [isfilter, setisfilter] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [filterdate, setfilterdate] = useState({
    fromdate: moment().format("YYYY-MM-DD"),
    todate: moment().format("YYYY-MM-DD"),
  });

  // Triggers API fetch
  useEffect(() => {
    if (!shouldFetch) return; // Prevents API call unless shouldFetch is true
    const fetchData = async () => {
      setisloading(true);
      try {
        const response = await API.get(`/client/getclientfilters`, {
          params: {
            fromDate: filterdate.fromdate.split("-").reverse().join("-"),
            toDate: filterdate.todate.split("-").reverse().join("-"),
          },
        });
        setdata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setisloading(false);
        setShouldFetch(false); // Reset fetch trigger AFTER API call
      }
    };

    fetchData();
  }, [shouldFetch, filterdate.fromdate, filterdate.todate]); // ✅ Include filterdate properties

  function handelfilterresponse(from) {
    if (from === "Clear") {
      setisfilter(false);
      setfilterdate({ fromdate: "", todate: "" });
      setShouldFetch(true);
    } else if (from === "Ok") {
      setisfilter(false);
      setShouldFetch(true);
    } else if (from === "Exit") {
      setisfilter(false);
    }
  }

  function handeldownload() {
    if (data.length > 0) {
      const fname = getUniqueFilename();
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(removeFirstAndLastFromList(data));
      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
      XLSX.writeFile(wb, fname);
    }
  }
  const removeFirstAndLastFromList = (arr) => {
    return arr.map((obj) => {
      const entries = Object.entries(obj); // Convert object to array
      if (entries.length <= 2) return {}; // If only 1 or 2 keys, return empty object

      const filteredEntries = entries.slice(1, -1); // Remove first and last key
      return Object.fromEntries(filteredEntries); // Convert back to object
    });
  };

  const getUniqueFilename = () => {
    const now = new Date();

    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    };

    // Format the date-time string
    const formattedDateTime = new Intl.DateTimeFormat("en-GB", options)
      .format(now)
      .replace(/\//g, "") // Remove slashes from date
      .replace(/, /g, "_") // Replace comma with underscore
      .replace(/:/g, ""); // Remove colons from time

    return `Customerlist_${formattedDateTime}.xlsx`;
  };
  function handelchangesearch(e) {
    setsearch(e.target.value);
  }

  function handeldatachange(e) {
    const { name, value } = e.target;
    setfilterdate((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  }

  function showprice() {
    if (isreport) {
      setisreport(false);
    }
  }

  function showreport() {
    if (!isreport) {
      setisreport(true);
    }
  }
  function handelfilter() {
    setisfilter(!isfilter);
  }

  return (
    <>
      <div
        className="
          w-full  
           flex    h-full pt-20 md:pt-32 relative  flex-col px-1 bg-center md:bg-cover bg-contain"
      >
        <div className="flex-col md:flex-row flex justify-center md:justify-between gap-3 w-full  my-1  ">
          <div className="flex w-full  md:w-1/2">
            <input
              onChange={handelchangesearch}
              type="text"
              placeholder="Search Here..."
              className="  w-full p-2   border-2 border-green-600 outline-none   rounded-md  placeholder-green-600"
            />
          </div>
          <div className="flex justify-between  gap-1 md:gap-2   ">
            <button
              onClick={showreport}
              className="
             bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] 
           flex  md:gap-3  px-3  md:px-5 py-2 text-white 
            font-bold rounded w-full md:w-auto justify-center "
            >
              <p className="hidden md:block">Report</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 md:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </button>

            <button
              onClick={showprice}
              className="
             bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] 
           flex  md:gap-3  px-3  md:px-5 py-2 text-white 
            font-bold rounded w-full md:w-auto justify-center "
            >
              <p className=" hidden md:block ">SetPrice</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <button
              onClick={handelfilter}
              className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] 
           flex  md:gap-3  px-3  md:px-5 py-2 text-white 
            font-bold rounded w-full md:w-auto justify-center"
            >
              <p className="hidden md:block">Filter</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 md:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </button>
            <button
              onClick={handeldownload}
              className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] 
           flex  md:gap-3 px-3 md:px-5  py-2 text-white 
            font-bold rounded w-full md:w-auto justify-center"
            >
              <p className="hidden md:block">Excel</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 md:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
            {/* <button
              onClick={() => navigate("/")}
              className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r 
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] 
           flex  md:gap-3 px-3 md:px-5 py-2 text-white
            font-bold rounded w-full md:w-auto justify-center"
              title="Exit"
            >
              <p className="hidden md:block">Logout</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 md:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                />
              </svg>
            </button> */}
          </div>
        </div>
        {isreport ? (
          <>
            {isfilter && (
              <div className="alert-overlay z-20">
                <form className="alert-box  bg-green-400 flex flex-col justify-between ">
                  <div>
                    <div className="p-3  flex  flex-col w-full  ">
                      <label
                        htmlFor="FromDate"
                        className="text-left font-semibold mb-2"
                      >
                        From Date
                      </label>
                      <input
                        className="p-2   rounded-md border-2 border-green-500 outline-none "
                        type="date"
                        onChange={handeldatachange}
                        value={filterdate.fromdate}
                        name="fromdate"
                        id="fromdate"
                      />
                    </div>
                    <div className="p-2  flex  flex-col w-full ">
                      <label
                        htmlFor="ToDate"
                        className="text-left font-semibold mb-2"
                      >
                        To Date
                      </label>
                      <input
                        type="date"
                        value={filterdate.todate}
                        onChange={handeldatachange}
                        name="todate"
                        id="todate"
                        className="p-2   rounded-md border-2 border-green-500 outline-none "
                      />
                    </div>
                  </div>
                  <div className="flex  justify-center gap-5">
                    <button
                      onClick={() => handelfilterresponse("Clear")}
                      className="bg-green-600  text-white px-6 py-2 rounded-md font-semibold"
                    >
                      Clear
                    </button>

                    <button
                      onClick={() => handelfilterresponse("Ok")}
                      className="bg-green-600  text-white px-6 py-2 rounded-md font-semibold"
                    >
                      Ok
                    </button>

                    <button
                      onClick={() => handelfilterresponse("Exit")}
                      className="bg-green-600  text-white px-6 py-2 rounded-md font-semibold"
                    >
                      Exit
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className=" w-full  mx-auto overflow-auto  border rounded-md  h-full relative ">
              {/* Table with Fixed Header */}
              <table className="w-full border-collapse  ">
                <thead className="p-2 bggoldbtn text-white sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">No</th>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Mobile</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Type</th>
                    <th className="px-3 py-2 text-left">schemes</th>
                    <th className="px-3 py-2 text-left">Amount</th>
                    <th className="px-3 py-2 text-left">Status</th>
                  </tr>
                </thead>

                {/* Scrollable Table Body with Min Height */}
                <tbody className=" overflow-auto ">
                  {data.length > 0 ? (
                    data
                      .filter((item) =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((user, index) => (
                        <tr key={index} className={`even:bg-gray-200`}>
                          <td className="p-3 text-left">{index + 1}</td>
                          <td className="p-3 text-left">{user.name}</td>
                          <td className="p-3 text-left">{user.phone_number}</td>
                          <td className="p-3 text-left">{user.email}</td>
                          <td className="p-3 text-left">{user.select_type}</td>
                          <td className="p-3 text-left">{user.schemes}</td>
                          <td className="p-3 text-left">{user.amount}</td>
                          <td className="p-3 text-left">
                            {user.paymentStatus}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className=" border p-4 text-center text-gray-500 h-[470px]"
                      >
                        {isloading ? (
                          <div className="alert-overlay z-20">
                            <div className=" w-12 h-12 md:w-36 md:h-36  border-8 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          <p className="text-start px-20 md:px-0 md:text-center font-semibold text-xl animate-pulse ease-in delay-0 text-green-600">
                            No data available
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>

                {/* Table Footer (Fixed) */}
              </table>
            </div>

            <table>
              <tfoot className="bggoldbtn   bottom-0 w-full">
                <tr className="mx-auto">
                  <td
                    colSpan="7"
                    className="   pt-2 pb-2 px-3   text-left font-semibold left-10"
                  >
                    Total : {data.length}
                  </td>
                </tr>
              </tfoot>
            </table>
          </>
        ) : (
          <Setprice />
        )}
      </div>
    </>
  );
};

export default Admindashbord;
