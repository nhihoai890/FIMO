import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import CategoryProvider from "./contexts/CategoryProvider";
import ActorProvider from "./contexts/ActorProvider";
import DirectorsProvider from "./contexts/DirectorsProvider";
import { CinemaProvider } from "./contexts/CinemaProvider";
import CitiesProvider from "./contexts/CitiesProvider";
import MovieProvider from "./contexts/MovieProvider";
import CinemaLocationProvider from "./contexts/CinemaLocationProvider";
import TypeChairProvider from "./contexts/TypeChairProvider";
import RoomProvider from "./contexts/RoomProvider";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CategoryProvider>
      <ActorProvider>
        <DirectorsProvider>
          <CinemaProvider>
            <CitiesProvider>
              <MovieProvider>
                <CinemaLocationProvider>
                  <TypeChairProvider>
                    <RoomProvider>
                      <App />
                    </RoomProvider>

                  </TypeChairProvider>
                </CinemaLocationProvider>
              </MovieProvider>
            </CitiesProvider>
          </CinemaProvider>
        </DirectorsProvider>
      </ActorProvider>
    </CategoryProvider>
  </BrowserRouter>
);
