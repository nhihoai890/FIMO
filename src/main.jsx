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
import FoodProvider from "./contexts/FoodProvider";
import MovieScreeningProvider, { MovieScreeningContext } from "./contexts/MovieScreeningProvider";
import AccountProvider from "./contexts/AccountProvider";
import { NotificationProvider } from "./contexts/NotificationProvider";
import AuthsProvider from "./contexts/AuthsProvider";
import BookingProvider from "./contexts/BookingProvider";
import ItemFoodsProvider from "./contexts/ItemFoodsProvider";


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
                      <FoodProvider>
                        <MovieScreeningProvider>
                          <AccountProvider>
                            <NotificationProvider>
                              <AuthsProvider>
                                <BookingProvider>
                                  <ItemFoodsProvider>
                                    <App />
                                  </ItemFoodsProvider>
                                </BookingProvider>
                              </AuthsProvider>
                            </NotificationProvider>
                          </AccountProvider>
                        </MovieScreeningProvider>
                      </FoodProvider>
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
