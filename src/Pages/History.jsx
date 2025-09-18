import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import HistoryVideo from '../components/Video/HistoryVideo';
function History() {
  return (
    <>

      <main className="flex-1 px-8 mt-0  pt-20 min-h-screen " >
        {/* <!-- Header --> */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" >Watch History</h1>
          <p className="text-gray-800 dark:text-gray-200" >Keep track of videos you've watched</p>
        </div>

        {/* <!-- Controls --> */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6" >
          <div className="flex items-center gap-4" >
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium flex justify-center items-center cursor-pointer" >
              <MdDeleteForever />
              Clear all history
            </button>

          </div>
          <div className="flex items-center gap-2" >
            <input type="text" placeholder="Search history..." className="bg-gray-300 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-800 dark:text-gray-800" />
            <button className="bg-gray-300 cursor-pointer hover:bg-gray-500 px-3 py-2 rounded-lg" >
              <IoSearchSharp />
            </button>
          </div>
        </div>

        {/* <!-- History List --> */}
        <div className="space-y-4" data-id="history-list">
          {/* <!-- Today --> */}
          <div data-id="history-today-section">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200" >All</h2>


           
            <div className="space-y-4 flex-1 justify-center items-center gap-5 " >
              <HistoryVideo />
              <HistoryVideo />
              <HistoryVideo />
            </div>
          </div>
        </div>
      </main>





    </>
  )
}

export default History