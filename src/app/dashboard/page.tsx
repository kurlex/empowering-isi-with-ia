"use client";
import { FaBarsStaggered } from "react-icons/fa6";
import { SharedStateContextProvider } from "../context/SharedStateContext";
import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chat/Chat";

const page = () => {
  return (
    <SharedStateContextProvider>
      <div className="drawer lg:drawer-open">
        <input type="checkbox" id="my-drawer-2" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="drawer-button lg:hidden fixed top-6 right-6"
          >
            <FaBarsStaggered className="w-8 h-8 text-primary" />
          </label>
          <div className="bg-base-200 min-h-screen">
            <Chat />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <Sidebar />
        </div>
      </div>
    </SharedStateContextProvider>
  );
};

export default page;
