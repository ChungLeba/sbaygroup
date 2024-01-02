"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import Link from "next/link";
import Popup from "./modal";
import Slider from "./_components/slider";
import { MdAirplanemodeActive } from "react-icons/md";
import { MdHotel } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si";
import { PiMegaphoneFill } from "react-icons/pi";
import { ImLocation } from "react-icons/im";
import { FaHandsHelping } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import Select from 'react-select'
import Search from "./_components/search";
import { format, addDays } from "date-fns";

export default function Home() {




  const popularPack = [
    {
      img: 'm-3.jpg'
    },
    {
      img: 'm-12.jpg'
    },
    {
      img: 'm-36.jpg'
    },
    {
      img: 'm-doc-quyen.jpg'
    }]
  const popularFly = [1, 2, 3, 4]
  const popularRoom = [1, 2, 3, 4]
  const popularCar = [1, 2, 3]
  const popularBana = [1, 2, 3, 4, 5, 6]
  const popularTool = [1, 2, 3]


  return (
    <>
      {/* <div className="flex flex-col bg-cover" style={{ backgroundImage: "url('/img/bg-02.jpg')" }}>
        <h2 className=" mt-48 text-4xl text-white font-bold text-center"> Đặt nhanh, ưu đãi lớn</h2>
        <div className=" max-w-7xl mx-auto mt-10" >
          <div className="border-b border-gray-200 shadow-xl dark:border-red-700 rounded-md mb-5">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center bg-white rounded-lg dark:text-gray-400">
              <li>
                <a href="#" className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                  <MdAirplanemodeActive className="mr-1 w-4 mt-0.5" />
                  Vé máy bay
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                  <MdHotel className="mr-1 w-4 mt-0.5" />
                  Khách sạn
                </a>
              </li>
              <li>
                <a href="https://datxe.sbayvietnam.com" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                  <FaCar className="mr-1 w-4 mt-0.5" />
                  Đặt xe
                </a>
              </li>
              <li>
                <a href="https://datve.sbayvietnam.com" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                  <ImLocation className="mr-1 w-4 mt-0.5" />
                  Vé Bà Nà
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                  <SiYourtraveldottv className="mr-1 w-4 mt-0.5" />
                  Tour du lịch
                </a>
              </li>

            </ul>
          </div>
          <div className="flex flex-row space-x-5 mb-5 justify-between ...">
            <Select
              options={options}
              className="w-full " />
            <Select
              options={options}
              className="w-full" />
          </div>
          <div className="flex flex-row space-x-5 justify-between mb-5 ...">
            <input className="g-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400" type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />
            <input className="g-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400" type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />

          </div>
          <div className="flex flex-row mb-32 ...">
            <button type="button" className="text-white bg-red-500 min-w-full max-w-sm hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Tìm kiếm</button>
          </div>

        </div>

      </div> */}
      <section className="bg-white dark:bg-gray-900" style={{ backgroundImage: "url('/img/bg-02.jpg')" }}>
        <div className=" lg:my-24 max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 lg:gap-4 mx-auto p-5 lg:py-24">
          <Search></Search>
          <div className="my-auto mx-auto invisible lg:visible">
            <Image
              src={"/img/air-plan.png"}
              alt={"Vietnam airline logo"}
              width={500}
              height={500}

            />
          </div>

        </div>
      </section>
      <div className=" -mt-16 bg-white mx-auto rounded-3xl p-5">
        <div className="flex flex-col max-w-7xl mx-auto  justify-between py-2">
          <h2 className=" text-sm font-bold text-center"> Đối tác tin cậy</h2>
          <div className="  max-w-7xl grid grid-cols-2 lg:grid-cols-4 mx-auto">
            <Image
              src={"/img/vietnam-airline.png"}
              width={512}
              height={288}
              alt={"Vietnam airline logo"}
              className=" w-36 rounded-full"
            />
            <Image
              src={"/img/vietjet.png"}
              width={512}
              height={288}
              alt={"Vietjet logo"}
              className=" w-32 rounded-full"
            />
            <Image
              src={"/img/Bamboo_Airways.png"}
              width={512}
              height={288}
              alt={"Bamboo logo"}
              className=" w-32 rounded-full"
            />
            <Image
              src={"/img/Pacific_Airlines.png"}
              width={512}
              height={288}
              alt={"Sbay group logo"}
              className=" w-32 rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col max-w-7xl mx-auto  justify-between py-2">
          <h2 className=" text-xl font-bold text-center mt-14"> Hợp tác đại lý</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4  justify-center ...">
            {popularPack.map((e, i) => {
              return (
                <div key={i} className="  hover:bg-red-100 rounded-lg p-5 drop-shadow-md ...">
                  <Image
                    src={"/img/" + e.img}
                    width={512}
                    height={288}
                    alt={"Vietnam airline logo"}
                    className=" w-32 h-32 m-5 rounded-md mx-auto"
                  />
                  <h3 className="text-center font-bold">Gói M3</h3>
                  <p className="text-center text-sm">Cung cấp VÉ MÁY BAY của 5 hãng hàng không Nội địa</p>
                  <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full max-w-sm my-5">Liên hệ tư vấn</button>
                </div>
              )
            })}


          </div>
        </div>
        <div className="flex flex-col max-w-7xl mx-auto  justify-between py-2">
          <h2 className=" text-xl font-bold text-center my-10"> Các chuyến bay thông dụng</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 justify-center ...">
            {popularFly.map((e, i) => {
              return (
                <div key={i} className="  hover:bg-red-100 rounded-lg p-5 drop-shadow-md ...">
                  <Image
                    src={"/img/mangjet.jpg"}
                    width={512}
                    height={288}
                    alt={"Vietnam airline logo"}
                    className=" w-36 rounded-full mx-auto"
                  />
                  <p className=" text-xs text-end">Từ </p>
                  <p className=" font-light text-xl text-red-500 text-end">720.000VND*</p>
                  <p className=" text-sm text-end">Một chiều/Phổ thông</p>
                  <h3 className="text-start font-bold">Hà Nội (HAN) đến TP. Hồ Chí Minh (SGN)</h3>
                  <p className="text-start text-sm">Cung cấp VÉ MÁY BAY của 5 hãng hàng không Nội địa</p>
                  <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full max-w-sm my-5">Đặt vé ngay</button>
                </div>
              )
            })}


          </div>
        </div>
        <div className="flex flex-col max-w-7xl mx-auto  justify-between py-2">
          <h2 className=" text-xl font-bold text-center my-10"> Phòng khách sạn</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4  justify-center ...">
            {popularRoom.map((e, i) => {
              return (
                <div key={i} className="  hover:bg-yellow-100 rounded-lg p-5 drop-shadow-md ...">
                  <Image
                    src={"/img/standard-douple.webp"}
                    width={512}
                    height={288}
                    alt={"Vietnam airline logo"}
                    className=" w-full rounded-lg mx-auto"
                  />
                  <p className=" text-xs text-end">Từ </p>
                  <p className=" font-light text-xl text-red-500 text-end">150.000VND*</p>
                  <p className=" text-sm text-end">Một giường đôi</p>
                  <h3 className="text-start font-bold">Standard Double</h3>
                  <p className="text-start text-sm">Phù hợp với nghỉ đêm một mình</p>
                  <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full max-w-sm my-5">Đặt phòng ngay</button>
                </div>
              )
            })}


          </div>
        </div>

        <div className="flex flex-col max-w-7xl mx-auto  justify-between py-2">
          <h2 className=" text-xl font-bold text-center my-10"> Dịch vụ xe</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3  justify-center ...">
            {popularCar.map((e, i) => {
              return (
                <div key={i} className="  hover:bg-yellow-100 rounded-lg p-5 drop-shadow-md ...">
                  <Image
                    src={"/img/xe-5-cho.png"}
                    width={512}
                    height={288}
                    alt={"Vietnam airline logo"}
                    className=" w-full rounded-lg mx-auto"
                  />
                  <p className=" text-xs text-end">Từ </p>
                  <p className=" font-light text-xl text-red-500 text-end">12.000VND*</p>
                  <p className=" text-sm text-end">km</p>
                  <h3 className="text-start font-bold">Xe 7 chỗ</h3>
                  <p className="text-start text-sm">Phù hợp với gia đình có con nhỏ</p>
                  <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full max-w-sm my-5">Đặt xe ngay</button>
                </div>
              )
            })}


          </div>
        </div>

        <div className="flex flex-col max-w-7xl mx-auto justify-between py-2">
          <h2 className=" text-xl font-bold text-center my-10"> Dịch vụ vé Bà Nà</h2>
          <div className="grid grid-cols-3 xl:grid-cols-6  justify-center ...">
            {popularBana.map((e, i) => {
              return (
                <div key={i} className="  hover:bg-blue-100 rounded-lg p-5 drop-shadow-md ...">
                  <Image
                    src={"/img/cap-treo-bana.jpg"}
                    width={512}
                    height={288}
                    alt={"Vietnam airline logo"}
                    className="m-5 w-32 h-32 rounded-full mx-auto"
                  />
                  <p className=" text-xs text-end">Từ </p>
                  <p className=" font-light text-xl text-red-500 text-end">550.000VND*</p>
                  <p className=" text-sm text-end">Vé</p>
                  <h3 className="text-start font-bold">Cáp treo Bà Nà</h3>
                  <p className="text-start text-sm">Phù hợp với gia đình có con nhỏ</p>
                  <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full max-w-sm my-5">Đặt vé ngay</button>
                </div>
              )
            })}


          </div>
        </div>

        <div className="flex flex-col max-w-7xl mx-auto  justify-between py-2">
          <h2 className=" text-xl font-bold text-center my-10"> Tool marketing</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3  justify-center ...">
            {popularTool.map((e, i) => {
              return (
                <div key={i} className="  hover:bg-blue-100 rounded-lg p-5 drop-shadow-md ...">
                  <Image
                    src={"/img/facebook.png"}
                    width={512}
                    height={288}
                    alt={"Vietnam airline logo"}
                    className="m-10 w-36 h-36 rounded-full mx-auto"
                  />
                  <p className=" text-xs text-end">Từ </p>
                  <p className=" font-light text-xl text-green-500 text-end">550.000VND*</p>
                  <p className=" text-sm text-end">Vé</p>
                  <h3 className="text-start font-bold">Facebook Marketing</h3>
                  <p className="text-start text-sm">Tiếp cận người dùng trong nhóm</p>
                  <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full max-w-sm my-5">Dùng thử ngay</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>


    </>
  );
}
