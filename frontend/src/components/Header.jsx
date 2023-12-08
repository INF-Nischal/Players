import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-[10vh] px-8 flex justify-between items-center border-2">
      <h1 className="text-3xl">
        <Link to="/">Player</Link>
      </h1>
      <ul className="flex">
        <li className="mr-3 hover:bg-slate-400 hover:text-white py-2 px-4 rounded-xl">
          <Link to="/newplayer">New Player</Link>
        </li>
        <li className="hover:bg-slate-400 hover:text-white py-2 px-4 rounded-xl">
          <Link to="/players">Players</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
