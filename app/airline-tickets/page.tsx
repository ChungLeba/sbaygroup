"use client";
import { useState, useEffect } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaRegCalendar, FaRegCalendarCheck } from "react-icons/fa";
import Select from 'react-select'
import { format, addDays } from "date-fns";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { da, vi } from 'date-fns/locale';
import Notfound from "./notfound";
import Searching from "./search";

export default function AirLineTicket({ params }: { params: { slug: string } }) {
  const router = useRouter()

  let searchParams = useSearchParams()
  // console.log('searchParams', searchParams.get('a'));
  const itineraryType = searchParams.get('t') || '2'
  const dataUrl = {
    action: searchParams.get('a'),
    ItineraryType: itineraryType,
    StartPoint: searchParams.get('sp'),
    EndPoint: searchParams.get('ep'),
    DepartureDate: format(new Date(searchParams.get('dp') || Date.now()), "dd/MM/yyyy", { locale: vi }),
    ReturnDate: format(new Date(searchParams.get('rd') || Date.now()), "dd/MM/yyyy", { locale: vi }),
    Adult: searchParams.get('ad'),
    Children: searchParams.get('ch'),
    Infant: searchParams.get('ba')
  };
  // console.log('searchParams', dataUrl);


  const [departData, setDepartData] = useState<any>([])
  const [returnData, setReturnData] = useState<any>([])


  const [passenger, setPassenger] = useState({
    Adult: searchParams.get('ad'),
    Children: searchParams.get('ch'),
    Infant: searchParams.get('ba')
  })
  useEffect(() => {
    console.log('useEffect ...');
    setDepartData([])
    setReturnData([])
    setSearchStatus(true)
    const url = "https://flight.sbaygroup.com/inc/api-datcho-private.php";

    let rawData = `{\r\n    \"action\": \"` + dataUrl.action + `\",\r\n    \"ItineraryType\": ` + dataUrl.ItineraryType + `,\r\n    \"StartPoint\": \"` + dataUrl.StartPoint + `\",\r\n    \"EndPoint\": \"` + dataUrl.EndPoint + `\",\r\n    \"DepartureDate\": \"` + dataUrl.DepartureDate + `\",\r\n    \"ReturnDate\": \"` + dataUrl.ReturnDate + `\",\r\n    \"Adult\": ` + dataUrl.Adult + `,\r\n    \"Children\": ` + dataUrl.Children + `,\r\n    \"Infant\": ` + dataUrl.Infant + `\r\n}`
    console.log('data', dataUrl);
    const search = async () => {
      const res = await fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "text/plain",
        },
        body: rawData,
      });
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      } else {
        const data = await res.json();
        console.log("flight", data);
        if (data.Data) {
          let departData = []
          for (const key in data.Data.DepartureFlights) {
            // console.log('key', key, ReturnFlights[key]);
            departData.push(data.Data.DepartureFlights[key])
          }
          let returnData = []
          for (const key in data.Data.ReturnFlights) {
            // console.log('key', key, ReturnFlights[key]);
            returnData.push(data.Data.ReturnFlights[key])
          }
          setDepartData(departData)
          setReturnData(returnData)
          setSearchStatus(false)
          setNotFound(false)
        } else {
          setSearchStatus(false)
          setNotFound(true)
        }
      }
    }
    search()
  }, [dataUrl.DepartureDate, dataUrl.ReturnDate])

  const airportOptions = [
    { value: 'HAN', label: 'Hà Nội', type: 'Miền Bắc' },
    { value: 'HPH', label: 'Hải Phòng', type: 'Miền Bắc' },
    { value: 'DIN', label: 'Điện Biên Phủ', type: 'Miền Bắc' },
    { value: 'VDO', label: 'Vân Đồn', type: 'Miền Bắc' },
    { value: 'SGN', label: 'Hồ Chí Minh', type: 'Miền Nam' },
    { value: 'PQC', label: 'Phú Quốc', type: 'Miền Nam' },
    { value: 'VCA', label: 'Cần Thơ', type: 'Miền Nam' },
    { value: 'VCS', label: 'Côn Đảo', type: 'Miền Nam' },
    { value: 'VKG', label: 'Kiên Giang', type: 'Miền Nam' },
    { value: 'DAD', label: 'Đà Nẵng', type: 'Miền Trung' },
    { value: 'CXR', label: 'Nha Trang', type: 'Miền Trung' },
    { value: 'DLI', label: 'Đà Lạt', type: 'Miền Trung' },
    { value: 'HUI', label: 'Huế', type: 'Miền Trung' },
    { value: 'BMV', label: 'Ban Mê Thuột', type: 'Miền Trung' },
    { value: 'PXU', label: 'PleiKu', type: 'Miền Trung' },
    { value: 'TBB', label: 'Phú Yên', type: 'Miền Trung' },
    { value: 'THD', label: 'Thanh Hóa', type: 'Miền Trung' },
    { value: 'UIH', label: 'Qui Nhơn', type: 'Miền Trung' },
    { value: 'VCL', label: 'Chu Lai', type: 'Miền Trung' },
    { value: 'VDH', label: 'Quảng Bình', type: 'Miền Trung' },
    { value: 'VII', label: 'Vinh', type: 'Miền Trung' },
    { value: 'BKK', label: 'Băng Cốc', type: 'Châu Á' },
    { value: 'CAN', label: 'Quảng Châu', type: 'Châu Á' },
    { value: 'HKG', label: 'Hồng Kông', type: 'Châu Á' },
    { value: 'KUL', label: 'Kuala Lumpur', type: 'Châu Á' },
    { value: 'ICN', label: 'Seoul, Incheon', type: 'Châu Á' },
    { value: 'SHA', label: 'Thượng Hải', type: 'Châu Á' },
    { value: 'SIN', label: 'Singapore', type: 'Châu Á' },
    { value: 'TPE', label: 'Đài Bắc', type: 'Châu Á' },
    { value: 'TYO', label: 'Tokyo', type: 'Châu Á' },
    { value: 'KOS', label: 'Campuchia', type: 'Châu Á' },
    { value: 'AMS', label: 'Amsterdam', type: 'Châu Âu' },
    { value: 'CPH', label: 'Cô-pen-ha-gen', type: 'Châu Âu' },
    { value: 'FRA', label: 'Frankfurt', type: 'Châu Âu' },
    { value: 'LON', label: 'London', type: 'Châu Âu' },
    { value: 'PAR', label: 'Paris', type: 'Châu Âu' },
    { value: 'PRG', label: 'Praha', type: 'Châu Âu' },
    { value: 'STO', label: 'Stockholm', type: 'Châu Âu' },
    { value: 'ZRH', label: 'Zurich', type: 'Châu Âu' },
    { value: 'DFW', label: 'Dallas', type: 'Châu Úc' },
    { value: 'HOU', label: 'Houston', type: 'Châu Úc' },
    { value: 'LAX', label: 'Los Angeles', type: 'Châu Úc' },
    { value: 'MEL', label: 'Men-bơn', type: 'Châu Úc' },
    { value: 'NYC', label: 'New York', type: 'Châu Úc' },
    { value: 'SFO', label: 'San Francisco', type: 'Châu Úc' },
    { value: 'SYD', label: 'Sydney', type: 'Châu Úc' },
    { value: 'YTO', label: 'Toronto', type: 'Châu Úc' },
    { value: 'YVR', label: 'Vancouver', type: 'Châu Úc' },
  ]

  const findFrom: any = airportOptions.find(({ value }) => value === searchParams.get('sp'))
  console.log('findFrom', findFrom);
  const findTo: any = airportOptions.find(({ value }) => value === searchParams.get('ep'))
  // console.log('findFrom', findFrom);
  // console.log({
  //   from: findFrom?.label,
  //   to: findTo?.label
  // });
  const [trip, setTrip] = useState<any>({
    from: findFrom?.label + ', ' + findFrom?.label + ' (' + findFrom?.value + ')',
    to: findTo?.label + ', ' + findTo?.label + ' (' + findTo?.value + ')'
  })

  /* Form search */
  const defaultDepart = findFrom
  const defaultReturn = findTo

  const [defaultDepartTime, setDefaultDepartTime] = useState(format(new Date(), 'yyyy-MM-dd', { locale: vi }))
  const [defaultReturnTime, setDefaultReturnTime] = useState(format(addDays(new Date(), 2), 'yyyy-MM-dd', { locale: vi }))
  const [minDate, setMinDate] = useState(format(addDays(new Date(), 0), 'yyyy-MM-dd', { locale: vi }))
  const [maxDate, setMaxDate] = useState(format(addDays(new Date(), 365), 'yyyy-MM-dd', { locale: vi }))
  /* Time choose */
  const [typeOfTicket, setTypeOfTicket] = useState<number>(parseInt(itineraryType))
  /* Select depart */
  const [selectedDepartAirport, setSelectedDepartAirport] = useState(defaultDepart.value);
  const onChangeDepart = (e: any) => {
    console.log('e', e);
    setSelectedDepartAirport(e.value)
  }
  /* Select return */
  const [selectedReturnAirport, setSelectedReturnAirport] = useState(defaultReturn.value);
  const onChangeReturn = (e: any) => {
    console.log('e', e);
    setSelectedReturnAirport(e.value)
  }
  /* Time choose */
  const [departTime, setDepartTime] = useState(defaultDepartTime)
  const [returnTime, setReturnTime] = useState(defaultReturnTime)
  /* Passengers choose */
  const [Adult, setAdult] = useState(1)
  const [Children, setChildren] = useState(0)
  const [Infant, setInfant] = useState(0)

  /*  */
  const [searchStatus, setSearchStatus] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const searchfn = async () => {
    // setSearchStatus(true)
    // setDepartData([])
    // setReturnData([])
    // console.log(selectedDepartAirport, selectedReturnAirport);
    // const url = "https://flight.sbaygroup.com/inc/api-datcho-private.php";
    const data = {
      action: 'DOMSearchFlights',
      ItineraryType: typeOfTicket,
      StartPoint: selectedDepartAirport,
      EndPoint: selectedReturnAirport,
      DepartureDate: format(new Date(departTime), "MM/dd/yyyy", { locale: vi }),
      ReturnDate: format(new Date(returnTime), "MM/dd/yyyy", { locale: vi }),
      Adult: Adult,
      Children: Children,
      Infant: Infant
    };
    router.push('/airline-tickets?a=DOMSearchFlights&t=' + data.ItineraryType + '&sp=' + data.StartPoint + '&ep=' + data.EndPoint + '&dp=' + data.DepartureDate + '&rd=' + data.ReturnDate + '&ad=' + data.Adult + '&ch=' + data.Children + '&ba=' + data.Infant)

    // let rawData = `{\r\n    \"action\": \"` + data.action + `\",\r\n    \"ItineraryType\": ` + data.ItineraryType + `,\r\n    \"StartPoint\": \"` + data.StartPoint + `\",\r\n    \"EndPoint\": \"` + data.EndPoint + `\",\r\n    \"DepartureDate\": \"` + data.DepartureDate + `\",\r\n    \"ReturnDate\": \"` + data.ReturnDate + `\",\r\n    \"Adult\": ` + data.Adult + `,\r\n    \"Children\": ` + data.Children + `,\r\n    \"Infant\": ` + data.Infant + `\r\n}`
    // console.log('data', data);

    // const res = await fetch(url, {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "Content-Type": "text/plain",
    //   },
    //   body: rawData,
    // });
    // if (!res.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   throw new Error("Failed to fetch data");
    // } else {
    //   const data = await res.json();
    //   console.log("flight search btn", data);
    //   if (data.Data) {
    //     let departData = []
    //     for (const key in data.Data.DepartureFlights) {
    //       // console.log('key', key, ReturnFlights[key]);
    //       departData.push(data.Data.DepartureFlights[key])
    //     }
    //     let returnData = []
    //     for (const key in data.Data.ReturnFlights) {
    //       // console.log('key', key, ReturnFlights[key]);
    //       returnData.push(data.Data.ReturnFlights[key])
    //     }
    //     setDepartData(departData)
    //     setReturnData(returnData)
    //     setSearchStatus(false)
    //     setNotFound(false)

    //   } else {
    //     setSearchStatus(false)
    //     setNotFound(true)
    //   }
    // }

  }

  const [show, setShow] = useState(false)
  // const showChoosePassengers = function () {
  //   setShow(true)
  // }
  const weekChoose =
    [
      {
        dayOfWeek: format(new Date(), "EEEE", { locale: vi }),
        date: format(new Date(), "dd/MM", { locale: vi }),
        dateStandar: format(new Date(), "MM/dd/yyyy", { locale: vi }),
      },
      {
        dayOfWeek: format(addDays(new Date(), 1), 'EEEE', { locale: vi }),
        date: format(addDays(new Date(), 1), 'dd/MM', { locale: vi }),
        dateStandar: format(addDays(new Date(), 1), "MM/dd/yyyy", { locale: vi }),
      },
      {
        dayOfWeek: format(addDays(new Date(), 2), 'EEEE', { locale: vi }),
        date: format(addDays(new Date(), 2), 'dd/MM', { locale: vi }),
        dateStandar: format(addDays(new Date(), 2), "MM/dd/yyyy", { locale: vi }),
      },
      {
        dayOfWeek: format(addDays(new Date(), 3), 'EEEE', { locale: vi }),
        date: format(addDays(new Date(), 3), 'dd/MM', { locale: vi }),
        dateStandar: format(addDays(new Date(), 3), "MM/dd/yyyy", { locale: vi }),
      },
      {
        dayOfWeek: format(addDays(new Date(), 4), 'EEEE', { locale: vi }),
        date: format(addDays(new Date(), 4), 'dd/MM', { locale: vi }),
        dateStandar: format(addDays(new Date(), 4), "MM/dd/yyyy", { locale: vi }),
      },
      {
        dayOfWeek: format(addDays(new Date(), 5), 'EEEE', { locale: vi }),
        date: format(addDays(new Date(), 5), 'dd/MM', { locale: vi }),
        dateStandar: format(addDays(new Date(), 5), "MM/dd/yyyy", { locale: vi }),
      },
      {
        dayOfWeek: format(addDays(new Date(), 6), 'EEEE', { locale: vi }),
        date: format(addDays(new Date(), 6), 'dd/MM', { locale: vi }),
        dateStandar: format(addDays(new Date(), 6), "MM/dd/yyyy", { locale: vi }),
      },
      {
        dayOfWeek: format(addDays(new Date(), 7), 'EEEE', { locale: vi }),
        date: format(addDays(new Date(), 7), 'dd/MM', { locale: vi }),
        dateStandar: format(addDays(new Date(), 7), "MM/dd/yyyy", { locale: vi }),
      }
    ]
  const searchInDateDepart = function (e: any) {
    // console.log(e.target.getAttribute('data-dateStandar'));
    const dateChoose = e.target.getAttribute('data-dateStandar')
    router.push('/airline-tickets?a=DOMSearchFlights&t=' + typeOfTicket + '&sp=' + selectedDepartAirport + '&ep=' + selectedReturnAirport + '&dp=' + dateChoose + '&rd=' + format(new Date(returnTime), "MM/dd/yyyy", { locale: vi }) + '&ad=' + Adult + '&ch=' + Children + '&ba=' + Infant)
  }

  const searchInDateReturn = function (e: any) {
    // console.log(e.target.getAttribute('data-dateStandar'));
    const dateChoose = e.target.getAttribute('data-dateStandar')
    router.push('/airline-tickets?a=DOMSearchFlights&t=' + typeOfTicket + '&sp=' + selectedDepartAirport + '&ep=' + selectedReturnAirport + '&dp=' + format(new Date(departTime), "MM/dd/yyyy", { locale: vi }) + '&rd=' + dateChoose + '&ad=' + Adult + '&ch=' + Children + '&ba=' + Infant)
  }
  return (
    <div className=" mt-32 bg-white mx-auto rounded-3xl p-5">
      <div className="flex bg-amber-500 rounded-xl min-h-max flex-col max-w-7xl mx-auto justify-between">
        <div className=" flex flex-row space-x-2 p-3">
          <div className="flex items-center">
            <input id="typeOfTicket-radio-1" onChange={() => { setTypeOfTicket(1) }} type="radio" defaultChecked={typeOfTicket === 1} name="typeOfTicket-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="typeOfTicket-radio-1" className="ms-2 text-sm font-medium text-white">Một chiều</label>
          </div>
          <div className="flex items-center">
            <input id="typeOfTicket-radio-2" onChange={() => { setTypeOfTicket(2) }} type="radio" defaultChecked={typeOfTicket === 2} name="typeOfTicket-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="typeOfTicket-radio-2" className="ms-2 text-sm font-medium text-white">Khứ hồi</label>
          </div>
        </div>
        <div className=" grid grid-cols-12 my-auto">
          <div className=" col-span-12 xl:col-span-4 px-3 flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-5 mb-5 justify-between ...">
            <div className=" flex flex-col space-y-1 w-full">
              <div className=' flex flex-row'>
                <FaPlaneDeparture className="mr-1 w-3 mt-0.5 text-white" />
                <label htmlFor="from" className="block text-sm font-medium text-white dark:text-white">Từ</label>
              </div>
              <Select
                id="from"
                placeholder="Nơi đi"
                options={airportOptions}
                defaultValue={defaultDepart}
                formatOptionLabel={(airportOptions: any) => {
                  return (
                    <>
                      <div className='flex flex-col'>
                        <p className='font-bold text-sm'>{airportOptions.label + ' (' + airportOptions.value + ')'}</p>
                        <span className=' text-xs'>{airportOptions.type}</span>
                      </div>
                    </>
                  )
                }}
                onChange={onChangeDepart}
                className="w-full " />
            </div>
            <div className=" flex flex-col space-y-1 w-full">
              <div className=' flex flex-row'>
                <FaPlaneArrival className="mr-1 w-3 mt-0.5 text-white" />
                <label htmlFor="to" className="block text-sm font-medium text-white dark:text-white">Đến</label>
              </div>
              <Select
                id="to"
                placeholder="Nơi đến"
                options={airportOptions}
                defaultValue={defaultReturn}
                formatOptionLabel={(airportOptions: any) => {
                  return (
                    <>
                      <div className='flex flex-col'>
                        <p className='font-bold text-sm'>{airportOptions.label + ' (' + airportOptions.value + ')'}</p>
                        <span className=' text-xs'>{airportOptions.type}</span>
                      </div>
                    </>
                  )
                }}
                onChange={onChangeReturn}
                className="w-full" />
            </div>
          </div>

          <div className=" col-span-12 xl:col-span-4 px-3 flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-5 justify-between ...">
            <div className=" flex flex-col space-y-1 w-full">
              <div className=' flex flex-row'>
                <FaRegCalendar className="mr-1 w-3 mt-0.5 opacity-70 text-white" />
                <label htmlFor="fromDate" className="block text-sm font-medium text-white">Ngày đi</label>
              </div>
              <input
                onChange={(e: any) => { setDepartTime(e.currentTarget.value) }}
                id="fromDate"
                className="g-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400" type="date"
                name="trip-start"
                value={departTime}
                min={minDate}
                max={maxDate} />            </div>
            <div className=" flex flex-col space-y-1 w-full">
              <div className=' flex flex-row'>
                <FaRegCalendarCheck className="mr-1 w-3 mt-0.5 opacity-70 text-white" />
                <label htmlFor="toDate" className="block text-sm font-medium text-white">Ngày đến</label>
              </div>
              <input
                onChange={(e: any) => { setReturnTime(e.currentTarget.value) }}
                id="toDate"
                className="g-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400"
                type="date"
                name="trip-start"
                value={returnTime}
                min={minDate}
                max={maxDate} />
            </div>
          </div>

          <div className='relative col-span-6 xl:col-span-2 px-3 flex flex-col space-y-2 lg:space-y-0 lg:flex-row justify-between ...'>

            <div className=' col-span-4'>
              <label htmlFor="first_name" className="block mb-1 text-sm font-medium text-white">Số lượng khách</label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={Adult + ' n.lớn, ' + Children + ' trẻ em, ' + Infant + ' em bé'}
                onClick={() => setShow(true)}

                required />
            </div>
            {show == true &&
              <div onMouseLeave={() => setShow(false)} className="absolute col-span-4 top-20 bg-amber-500 rounded-xl p-5 shadow-lg ...">
                <form className="max-w-xs mb-3">
                  <label htmlFor="aldult-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Người lớn (từ 12 tuổi):</label>
                  <div className="relative flex items-center max-w-[10rem]">
                    <button onClick={() => { Adult > 1 && setAdult(Adult - 1) }} type="button" id="decrement-button" data-input-counter-decrement="aldult-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <input type="text"
                      id="aldult-input"
                      data-input-counter aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={Adult}
                      placeholder="1"
                      required />
                    <button onClick={() => { Adult > 0 && setAdult(Adult + 1) }} type="button" id="increment-button" data-input-counter-increment="aldult-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </form>
                <form className="max-w-xs mb-3">
                  <label htmlFor="child-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trẻ em (từ 2-12 tuổi):</label>
                  <div className="relative flex items-center max-w-[10rem]">
                    <button onClick={() => { Children >= 1 && setChildren(Children - 1) }} type="button" id="decrement-button" data-input-counter-decrement="child-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="child-input"
                      data-input-counter aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={Children}
                      placeholder="0" required />
                    <button onClick={() => { Children >= 0 && setChildren(Children + 1) }} type="button" id="increment-button" data-input-counter-increment="child-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </form>
                <form className="max-w-xs">
                  <label htmlFor="baby-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Em bé (dưới 2 tuổi):</label>
                  <div className="relative flex items-center max-w-[10rem]">
                    <button onClick={() => { Infant >= 1 && setInfant(Infant - 1) }} type="button" id="decrement-button" data-input-counter-decrement="baby-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <input type="text" id="baby-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={Infant}
                      placeholder="0" required />
                    <button onClick={() => { Infant >= 0 && setInfant(Infant + 1) }} type="button" id="increment-button" data-input-counter-increment="baby-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            }


          </div>
          <div className=" col-span-6 xl:col-span-2 px-3 flex flex-col justify-between ...">
            <label className="block text-sm font-medium text-white invisible">Tìm</label>
            <button
              onClick={searchfn}
              type="button"
              className="text-white mb-5 bg-blue-600 min-w-full max-w-sm hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm h-10">Tìm kiếm</button>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-12 gap-4 max-w-7xl mx-auto py-2">
        <div className="xl:grid hidden xl:visible xl:col-span-3 shadow-xl ... rounded-xl">
          <div className="flex flex-col space-y-5 p-5">
            <div className="flex flex-col space-y-5 p-5 border-b-2">
              <h3>Hiển thị giá</h3>
              <div className="flex items-center mb-4">
                <input checked id="priceRadio1" type="radio" value="" name="priceRadio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="priceRadio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Giá bao gồm thuế phí</label>
              </div>
              <div className="flex items-center">
                <input id="priceRadio2" type="radio" value="" name="priceRadio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="priceRadio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Giá chưa gồm thuế phí</label>
              </div>
            </div>
            <div className="flex flex-col space-y-5 p-5 border-b-2">
              <h3>Sắp xếp</h3>
              <div className="flex items-center mb-4">
                <input checked id="priceLowRadio" type="radio" value="" name="sortRadio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="sortRadio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Giá (Thấp tới Cao)</label>
              </div>
              <div className="flex items-center">
                <input id="timeStartRadio" type="radio" value="" name="sortRadio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="sortRadio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thời gian khởi hành</label>
              </div>
              <div className="flex items-center mb-4">
                <input id="byAir" type="radio" value="" name="sortRadio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="sortRadio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hãng hàng không</label>
              </div>
            </div>
            <div className="flex flex-col space-y-5 p-5 border-b-2">
              <h3>Hãng hàng không</h3>
              <div className="flex items-center mb-4">
                <input checked id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bamboo Airways</label>
              </div>
              <div className="flex items-center">
                <input checked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vietjet Air</label>
              </div>

              <div className="flex items-center">
                <input checked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vietnam Airlines</label>
              </div>

              <div className="flex items-center">
                <input checked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vietravel Airlines</label>
              </div>
              <div className="flex flex-col space-y-3">
                <button type="button" className="text-white bg-green-600 min-w-full max-w-sm hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm h-10 my-auto">Copy text</button>
                <button type="button" className="text-white bg-green-600 min-w-full max-w-sm hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm h-10 my-auto">Chụp ảnh</button>
                <button type="button" className="text-white bg-green-600 min-w-full max-w-sm hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm h-10 my-auto">Xóa bộ lọc</button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid col-span-12 xl:col-span-9">

          {
            typeOfTicket == 1 &&
            <div>
              <div className=" text-sm max-h-36 shadow-xl ... rounded-xl font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <div className=" text-start pt-2 bg-red-100">
                  <h1 className="text-black mx-3 text-xl font-bold">{trip.from} - {trip.to}</h1>
                  <p className=" mx-3">{passenger.Adult + ' (người lớn), ' + passenger.Children + ' (trẻ em),' + passenger.Infant + ' (em bé)'} - đi ngày {format(new Date(searchParams.get('dp') || Date.now()), "dd/MM/yyyy", { locale: vi })}</p>
                </div>
                <ul className="flex flex-row justify-between ...">
                  {weekChoose.map((e: any, i: number) => {
                    return (
                      <>
                        {
                          format(new Date(dataUrl.DepartureDate), "MM/dd", { locale: vi }) == e.date
                            ?
                            <li key={'weekChoose' + i} className="mx-auto border-b-2 border-red-600">
                              <button data-dateStandar={e.dateStandar} onClick={(e) => searchInDateDepart(e)} className="inline-block p-2 border-b-2 border-transparent rounded-t-lg text-red-600">
                                {e.dayOfWeek} <br />
                                {e.date}</button>
                            </li>
                            :
                            <li key={'weekChoose' + i} className="mx-auto border-b-2 border-red-100">
                              <button data-dateStandar={e.dateStandar} onClick={(e) => searchInDateDepart(e)} className="inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                {e.dayOfWeek} <br />
                                {e.date}</button>
                            </li>
                        }
                      </>


                    )
                  })}


                </ul>
              </div>

              {searchStatus == false ?
                <div className="flex flex-col space-y-5 mt-5">
                  {departData.map((e: any, i: number) => {
                    return (
                      <>
                        <div className=" grid grid-cols-12 h-20 shadow-md ... rounded-xl hover:bg-stone-100">
                          <div className="grid col-span-8 xl:col-span-2 border-r-2 px-3">
                            <div className="flex items-center gap-4">
                              {e.AirlineCode == 'VJ' &&
                                <img className="w-10 h-10 rounded-full" src="/img/vj.png" alt="vietjet" />
                              }
                              {e.AirlineCode == 'VN' &&
                                <img className="w-10 h-10 rounded-full" src="/img/vn.png" alt="vietjet" />
                              }
                              {e.AirlineCode == 'QH' &&
                                <img className="w-10 h-10 rounded-full" src="/img/qh.png" alt="vietjet" />
                              }
                              {e.AirlineCode == 'VU' &&
                                <img className="w-10 h-10 rounded-full" src="/img/vu.png" alt="vietjet" />
                              }
                              <div className="font-medium dark:text-white">
                                <div>{e.AirlineCode}</div>
                                <div className=" flex flex-row xl:flex-col text-xs text-gray-500 dark:text-gray-400">
                                  <p>{e.FlightNumber}</p>
                                  <p className=" block xl:hidden">- 02h 10m - Bay thẳng</p>
                                </div>
                                <p className=" block xl:hidden text-xs">Từ: {format(new Date(e.StartDate), "HH:mm", { locale: vi })}, đến: {e.EndDate}</p>

                              </div>
                            </div>
                          </div>
                          <div className=" hidden xl:grid grid-cols-6 col-span-4 xl:col-span-7 border-r-2 p-3">
                            <div className=" col-span-6 xl:col-span-1 px-3">
                              <p className="text-center">{format(new Date(e.StartDate), "HH:mm", { locale: vi })}</p>
                              <p className="text-center bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{e.StartPoint}</p>
                            </div>
                            <div className="col-span-6 xl:col-span-4">
                              <div className="flex flex-row space-x-3">
                                <FaPlaneDeparture className="w-4 my-auto" />
                                <div className="flex flex-col w-full space-y-2">
                                  <p className="text-center text-xs">{e.Duration + ' phút'}</p>
                                  <div className="border-dashed border-b-2 ..."></div>
                                  {e.Stops == 0 &&
                                    <p className="text-center text-xs">Bay thẳng</p>
                                  }
                                </div>
                                <FaPlaneArrival className="w-4 my-auto" />
                              </div>
                            </div>
                            <div className=" col-span-6 xl:col-span-1 px-3">
                              <p className="text-center">{format(new Date(e.EndDate), "HH:mm", { locale: vi })}</p>
                              <p className="text-center bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{e.EndPoint}</p>
                            </div>

                          </div>
                          <div className="grid col-span-4 xl:col-span-3">
                            <Link href="/order" className="flex flex-col px-5 space-y-1">
                              <h4 className="text-red-600 text-lg font-bold text-center">{e.TotalPrice.toLocaleString()}</h4>
                              <button type="button" className="text-white bg-red-600 min-w-full max-w-sm hover:bg-red-200 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs h-8 my-auto"> Chọn</button>
                            </Link>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                :
                <Searching></Searching>
              }
              {notFound == true &&
                <Notfound></Notfound>
              }
            </div>
          }

          {
            typeOfTicket == 2 &&
            <>
              <div>
                <div className=" text-sm max-h-36 shadow-xl ... rounded-xl font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  <div className=" text-start pt-2 bg-red-100">
                    <h1 className="text-black mx-3 text-xl font-bold">{trip.from} - {trip.to}</h1>
                    <p className=" mx-3">{passenger.Adult + ' (người lớn), ' + passenger.Children + ' (trẻ em),' + passenger.Infant + ' (em bé)'} - đi ngày {format(new Date(searchParams.get('dp') || Date.now()), "dd/MM/yyyy", { locale: vi })}</p>
                  </div>
                  <ul className="flex flex-row justify-between ...">
                    {weekChoose.map((e: any, i: number) => {
                      return (
                        <>
                          {
                            format(new Date(dataUrl.DepartureDate), "MM/dd", { locale: vi }) == e.date
                              ?
                              <li key={'weekChoose' + i} className="mx-auto border-b-2 border-red-600">
                                <button data-dateStandar={e.dateStandar} onClick={(e) => searchInDateDepart(e)} className="inline-block p-2 border-b-2 border-transparent rounded-t-lg text-red-600">
                                  {e.dayOfWeek} <br />
                                  {e.date}</button>
                              </li>
                              :
                              <li key={'weekChoose' + i} className="mx-auto border-b-2 border-red-100">
                                <button data-dateStandar={e.dateStandar} onClick={(e) => searchInDateDepart(e)} className="inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                  {e.dayOfWeek} <br />
                                  {e.date}</button>
                              </li>
                          }
                        </>
                      )
                    })}
                  </ul>
                </div>
                {searchStatus == false
                  ?
                  <div className="flex flex-col space-y-5 mt-5">
                    {departData.map((e: any, i: number) => {
                      return (
                        <>
                          <div className=" grid grid-cols-12 h-20 shadow-md ... rounded-xl hover:bg-stone-100">
                            <div className="grid col-span-8 xl:col-span-2 border-r-2 px-3">
                              <div className="flex items-center gap-4">
                                {e.AirlineCode == 'VJ' &&
                                  <img className="w-10 h-10 rounded-full" src="/img/vj.png" alt="vietjet" />
                                }
                                {e.AirlineCode == 'VN' &&
                                  <img className="w-10 h-10 rounded-full" src="/img/vn.png" alt="vietjet" />
                                }
                                {e.AirlineCode == 'QH' &&
                                  <img className="w-10 h-10 rounded-full" src="/img/qh.png" alt="vietjet" />
                                }
                                {e.AirlineCode == 'VU' &&
                                  <img className="w-10 h-10 rounded-full" src="/img/vu.png" alt="vietjet" />
                                }
                                <div className="font-medium dark:text-white">
                                  <div>{e.AirlineCode}</div>
                                  <div className=" flex flex-row xl:flex-col text-xs text-gray-500 dark:text-gray-400">
                                    <p>{e.FlightNumber}</p>
                                    <p className=" block xl:hidden">- 02h 10m - Bay thẳng</p>
                                  </div>
                                  <p className=" block xl:hidden text-xs">Từ: {format(new Date(e.StartDate), "HH:mm", { locale: vi })}, đến: {e.EndDate}</p>

                                </div>
                              </div>
                            </div>
                            <div className=" hidden xl:grid grid-cols-6 col-span-4 xl:col-span-7 border-r-2 p-3">
                              <div className=" col-span-6 xl:col-span-1 px-3">
                                <p className="text-center">{format(new Date(e.StartDate), "HH:mm", { locale: vi })}</p>
                                <p className="text-center bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{e.StartPoint}</p>
                              </div>
                              <div className="col-span-6 xl:col-span-4">
                                <div className="flex flex-row space-x-3">
                                  <FaPlaneDeparture className="w-4 my-auto" />
                                  <div className="flex flex-col w-full space-y-2">
                                    <p className="text-center text-xs">{e.Duration + ' phút'}</p>
                                    <div className="border-dashed border-b-2 ..."></div>
                                    {e.Stops == 0 &&
                                      <p className="text-center text-xs">Bay thẳng</p>
                                    }
                                  </div>
                                  <FaPlaneArrival className="w-4 my-auto" />
                                </div>
                              </div>
                              <div className=" col-span-6 xl:col-span-1 px-3">
                                <p className="text-center">{format(new Date(e.EndDate), "HH:mm", { locale: vi })}</p>
                                <p className="text-center bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{e.EndPoint}</p>
                              </div>

                            </div>
                            <div className="grid col-span-4 xl:col-span-3">
                              <Link href="/order" className="flex flex-col px-5 space-y-1">
                                <h4 className="text-red-600 text-lg font-bold text-center">{e.TotalPrice.toLocaleString()}</h4>
                                <button type="button" className="text-white bg-red-600 min-w-full max-w-sm hover:bg-red-200 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs h-8 my-auto"> Chọn</button>
                              </Link>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  :
                  <Searching></Searching>
                }
                {notFound == true &&
                  <Notfound></Notfound>
                }
              </div>
              <div className="my-10">
                <div className=" text-sm max-h-36 shadow-xl ... rounded-xl font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  <div className=" text-start pt-2 bg-red-100">
                    <h1 className="text-black mx-3 text-xl font-bold">{trip.to} - {trip.from}</h1>
                    <p className=" mx-3">{passenger.Adult + ' (người lớn), ' + passenger.Children + ' (trẻ em),' + passenger.Infant + ' (em bé)'} - về ngày {format(new Date(searchParams.get('rd') || Date.now()), "dd/MM/yyyy", { locale: vi })}</p>
                  </div>
                  <ul className="flex flex-row justify-between ...">
                    {weekChoose.map((e: any, i: number) => {
                      console.log(format(new Date(dataUrl.ReturnDate), "MM/dd", { locale: vi }), format(new Date(e.dateStandar), "dd/MM", { locale: vi }))
                      return (
                        <>
                          {
                            format(new Date(dataUrl.ReturnDate), "MM/dd", { locale: vi }) == format(new Date(e.dateStandar), "dd/MM", { locale: vi })
                              ?
                              <li key={'weekChoose' + i} className="mx-auto border-b-2 border-red-600">
                                <button data-dateStandar={e.dateStandar} onClick={(e) => searchInDateReturn(e)} className="inline-block p-2 border-b-2 border-transparent rounded-t-lg text-red-600">
                                  {e.dayOfWeek} <br />
                                  {e.date}</button>
                              </li>
                              :
                              <li key={'weekChoose' + i} className="mx-auto border-b-2 border-red-100">
                                <button data-dateStandar={e.dateStandar} onClick={(e) => searchInDateReturn(e)} className="inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                  {e.dayOfWeek} <br />
                                  {e.date}</button>
                              </li>
                          }
                        </>
                      )
                    })}
                  </ul>
                </div>
                <div className="flex flex-col space-y-5 mt-5">
                  {returnData.map((e: any, i: number) => {
                    return (
                      <>
                        <div className=" grid grid-cols-12 h-20 shadow-md ... rounded-xl hover:bg-stone-100">
                          <div className="grid col-span-8 xl:col-span-2 border-r-2 px-3">
                            <div className="flex items-center gap-4">
                              {e.AirlineCode == 'VJ' &&
                                <img className="w-10 h-10 rounded-full" src="/img/vj.png" alt="vietjet" />
                              }
                              {e.AirlineCode == 'VN' &&
                                <img className="w-10 h-10 rounded-full" src="/img/vn.png" alt="vietjet" />
                              }
                              {e.AirlineCode == 'QH' &&
                                <img className="w-10 h-10 rounded-full" src="/img/qh.png" alt="vietjet" />
                              }
                              {e.AirlineCode == 'VU' &&
                                <img className="w-10 h-10 rounded-full" src="/img/vu.png" alt="vietjet" />
                              }                          <div className="font-medium dark:text-white">
                                <div>{e.AirlineCode}</div>
                                <div className=" flex flex-row xl:flex-col text-xs text-gray-500 dark:text-gray-400">
                                  <p>{e.FlightNumber}</p>
                                  <p className=" block xl:hidden">- 02h 10m - Bay thẳng</p>
                                </div>
                                <p className=" block xl:hidden text-xs">Từ: {format(new Date(e.StartDate), "HH:mm", { locale: vi })}, đến: {e.EndDate}</p>

                              </div>
                            </div>
                          </div>
                          <div className=" hidden xl:grid grid-cols-6 col-span-4 xl:col-span-7 border-r-2 p-3">
                            <div className=" col-span-6 xl:col-span-1 px-3">
                              <p className="text-center">{format(new Date(e.StartDate), "HH:mm", { locale: vi })}</p>
                              <p className="text-center bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{e.StartPoint}</p>
                            </div>
                            <div className="col-span-6 xl:col-span-4">
                              <div className="flex flex-row space-x-3">
                                <FaPlaneDeparture className="w-4 my-auto" />
                                <div className="flex flex-col w-full space-y-2">
                                  <p className="text-center text-xs">{e.Duration + ' phút'}</p>
                                  <div className="border-dashed border-b-2 ..."></div>
                                  {e.Stops == 0 &&
                                    <p className="text-center text-xs">Bay thẳng</p>
                                  }
                                </div>
                                <FaPlaneArrival className="w-4 my-auto" />
                              </div>
                            </div>
                            <div className=" col-span-6 xl:col-span-1 px-3">
                              <p className="text-center">{format(new Date(e.EndDate), "HH:mm", { locale: vi })}</p>
                              <p className="text-center bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{e.EndPoint}</p>
                            </div>

                          </div>
                          <div className="grid col-span-4 xl:col-span-3">
                            <Link href="/order" className="flex flex-col px-5 space-y-1">
                              <h4 className="text-red-600 text-lg font-bold text-center">{e.TotalPrice.toLocaleString()}</h4>
                              <button type="button" className="text-white bg-red-600 min-w-full max-w-sm hover:bg-red-200 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs h-8 my-auto"> Chọn</button>
                            </Link>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                {searchStatus == false
                  ?
                  <div className="flex flex-col space-y-5 mt-5">
                    {departData.map((e: any, i: number) => {
                      return (
                        <>
                          <div className=" grid grid-cols-12 h-20 shadow-md ... rounded-xl hover:bg-stone-100">
                            <div className="grid col-span-8 xl:col-span-2 border-r-2 px-3">
                              <div className="flex items-center gap-4">
                                {e.AirlineCode == 'VJ' &&
                                  <img className="w-10 h-10 rounded-full" src="/img/vj.png" alt="vietjet" />
                                }
                                {e.AirlineCode == 'VN' &&
                                  <img className="w-10 h-10 rounded-full" src="/img/vn.png" alt="vietjet" />
                                }
                                {e.AirlineCode == 'QH' &&
                                  <img className="w-10 h-10 rounded-full" src="/img/qh.png" alt="vietjet" />
                                }
                                {e.AirlineCode == 'VU' &&
                                  <img className="w-10 h-10 rounded-full" src="/img/vu.png" alt="vietjet" />
                                }
                                <div className="font-medium dark:text-white">
                                  <div>{e.AirlineCode}</div>
                                  <div className=" flex flex-row xl:flex-col text-xs text-gray-500 dark:text-gray-400">
                                    <p>{e.FlightNumber}</p>
                                    <p className=" block xl:hidden">- 02h 10m - Bay thẳng</p>
                                  </div>
                                  <p className=" block xl:hidden text-xs">Từ: {format(new Date(e.StartDate), "HH:mm", { locale: vi })}, đến: {e.EndDate}</p>

                                </div>
                              </div>
                            </div>
                            <div className=" hidden xl:grid grid-cols-6 col-span-4 xl:col-span-7 border-r-2 p-3">
                              <div className=" col-span-6 xl:col-span-1 px-3">
                                <p className="text-center">{format(new Date(e.StartDate), "HH:mm", { locale: vi })}</p>
                                <p className="text-center bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{e.StartPoint}</p>
                              </div>
                              <div className="col-span-6 xl:col-span-4">
                                <div className="flex flex-row space-x-3">
                                  <FaPlaneDeparture className="w-4 my-auto" />
                                  <div className="flex flex-col w-full space-y-2">
                                    <p className="text-center text-xs">{e.Duration + ' phút'}</p>
                                    <div className="border-dashed border-b-2 ..."></div>
                                    {e.Stops == 0 &&
                                      <p className="text-center text-xs">Bay thẳng</p>
                                    }
                                  </div>
                                  <FaPlaneArrival className="w-4 my-auto" />
                                </div>
                              </div>
                              <div className=" col-span-6 xl:col-span-1 px-3">
                                <p className="text-center">{format(new Date(e.EndDate), "HH:mm", { locale: vi })}</p>
                                <p className="text-center bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{e.EndPoint}</p>
                              </div>

                            </div>
                            <div className="grid col-span-4 xl:col-span-3">
                              <Link href="/order" className="flex flex-col px-5 space-y-1">
                                <h4 className="text-red-600 text-lg font-bold text-center">{e.TotalPrice.toLocaleString()}</h4>
                                <button type="button" className="text-white bg-red-600 min-w-full max-w-sm hover:bg-red-200 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs h-8 my-auto"> Chọn</button>
                              </Link>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  :
                  <Searching></Searching>
                }
                {notFound == true &&
                  <Notfound></Notfound>
                }
              </div>
            </>

          }

        </div>


      </div>
    </div>
  );
}
