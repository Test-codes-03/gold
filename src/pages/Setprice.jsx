import React, { useState, useEffect } from "react";
import "./Setprice.css";
import { API } from "../axios";
const Setprice = () => {
  const [savemsg, setsavemsg] = useState("");
  const [priceerror, setpriceerror] = useState({
    golden: "",
    silver: "",
    chittu: "",
  });
  const [pricedata, setpricedata] = useState({
    golden: "",
    silver: "",
    chittu: "",
  });
  useEffect(() => {
    API.get(`/prices/getPrices`)
      .then((response) => {
        const price = {
          chittu: response?.data?.[0]?.chittu,
          golden: response?.data?.[0]?.golden,
          silver: response?.data?.[0]?.silver,
        };
        setpricedata(price);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    return () => {
      setpricedata({});
    };
  }, []);
  function submitprice(e) {
    e.preventDefault();
    var aller = "";
    for (let key in pricedata) {
      const err = isValidNumber(
        key.split("price")[0].toLocaleUpperCase(),
        pricedata[key]
      );
      aller += err;
      setpriceerror((preverr) => ({
        ...preverr,
        [key]: err,
      }));
    }
    if (aller === "") {
      Saveprice();
    }
  }
  async function Saveprice() {
    try {
      const response = await API.post(
        `/prices/prices`,
        JSON.stringify(pricedata),
        {
          headers: {
            "Content-Type": "application/json", // Send data as raw JSON
          },
        }
      );
      if (response.status === 200) {
        setsavemsg("Price Change Succefull");
        setTimeout(() => {
          setsavemsg("");
        }, 2000);
      } else {
        setsavemsg("Price Change Not Chnage");
      }
    } catch (error) {
      setsavemsg(error.message);
    }
  }
  function handelpricechange(e) {
    const { name, value, id } = e.target;
    setpricedata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
    const err = isValidNumber(id, value);
    setpriceerror((preverr) => ({
      ...preverr,
      [name]: err,
    }));
  }
  function isValidNumber(type, strvalue) {
    if (!isNaN(strvalue) && !isNaN(parseFloat(strvalue))) {
      return "";
    } else {
      return `Invalid ${type.toLocaleUpperCase()} Price`;
    }
  }
  return (
    <div
      className="
w-full mx-auto overflow-auto  border rounded-md  h-full relative  flex items-center justify-center"
    >
      <form className="shadow-md shadow-black   p-2 md:p-10 rounded-lg  w-full md:w-[30%] ">
        <div className="p-3  flex  flex-col w-full ">
          <label htmlFor="goldprice" className="font-semibold mb-2">
            Gold Price
          </label>
          <input
            className="p-2   rounded-md border-2 border-green-500 outline-none "
            type="text"
            onChange={handelpricechange}
            value={pricedata.golden}
            name="golden"
            id="Gold"
          />

          <p className="text-sm text-red-600 ">{priceerror.golden}</p>
        </div>
        <div className="p-2  flex  flex-col w-full ">
          <label htmlFor="goldprice" className="font-semibold mb-2">
            Sliver Price
          </label>
          <input
            type="text"
            value={pricedata.silver}
            onChange={handelpricechange}
            name="silver"
            id="Silver"
            className="p-2   rounded-md border-2 border-green-500 outline-none "
          />
          <p className="text-sm text-red-600 ">{priceerror.silver}</p>
        </div>
        <div className="p-3  flex  flex-col w-full ">
          <label htmlFor="goldprice" className="font-semibold mb-2">
            Chit Amount
          </label>
          <input
            value={pricedata.chittu}
            type="text"
            onChange={handelpricechange}
            name="chittu"
            id="Chit"
            className="p-2   rounded-md border-2 border-green-500 outline-none "
          />

          <p className="text-sm text-red-600 ">{priceerror.chittu}</p>
        </div>
        {savemsg && (
          <p className=" text-red-600 text-center animate-pulse duration-75">
            {savemsg}
          </p>
        )}
        <div className="p-3  flex gap-3 flex-col w-full ">
          <button
            onClick={submitprice}
            className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r
   hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200]  p-3 rounded-md outline-none border-none"
          >
            <span className="font-bold text-lg text-white">Save</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setprice;
