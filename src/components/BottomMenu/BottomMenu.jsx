import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { HouseFill, ListUl } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import { HiMiniQueueList } from "react-icons/hi2";
import { useLocation } from "react-router-dom";




function BottomMenu() {

  const location = useLocation();

  return (
    <nav className="navbar fixed-bottom bg-dark border-top border-secondary p-0 mt-4">
      <div className="d-flex w-100 text-center" style={{ height: "60px" }}>
        {/* Botão Aluguéis */}
        <div
          className="flex-fill d-flex align-items-center justify-content-center border-end border-secondary"
          style={{ width: "50%" }}
        >
          <Link
            to="/"
            className={`text-decoration-none d-flex flex-column align-items-center justify-content-center ${location.pathname === "/" ? "text-info" : "text-white"
              }`}
          >
            <FaHouse size={22} />
            <span className="small">Aluguéis</span>
          </Link>
        </div>

        {/* Botão Fila */}
        <div
          className="flex-fill d-flex align-items-center justify-content-center"
          style={{ width: "50%" }}
        >
          <Link
            to="/fila"
            className={`text-decoration-none d-flex flex-column align-items-center justify-content-center ${location.pathname === "/fila" ? "text-info" : "text-white"
              }`}
          >
            <HiMiniQueueList size={22} />
            <span className="small">Fila</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default BottomMenu;
