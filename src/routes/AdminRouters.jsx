import React from 'react';
import DashBoard from '../pages/admin/dashboard/DashBoard';
import Categories from '../pages/admin/categories/Categories';
import Actors from '../pages/admin/cast_and_crew/Actor/Actors';
import Directors from '../pages/admin/cast_and_crew/Directors/Directors';
import { Route, Routes } from 'react-router-dom';
import Movie from '../pages/admin/media_maganement/Movie/Movie';
import MovieScreening from '../pages/admin/media_maganement/MovieScreening/MovieScreening';
import Cinema from '../pages/admin/Location/Cinema/Cinema';
import CinemaLocations from '../pages/admin/Location/CinemaLocations/CinemaLocations';
import Cities from '../pages/admin/Location/Cities/Cities';
import Food from '../pages/admin/services/Food/Food';
import Rooms from '../pages/admin/seating/Room/Rooms'
import TypeChairs from '../pages/admin/seating/TypeChairs/TypeChairs';
import UserPage from '../pages/admin/manager_user/UserPage';
import Orders from '../pages/admin/services/orders/Orders';
function AdminRouters(props) {
    const routers = [
        {
            path : "/",
            element : <DashBoard />
        },
        {
            path : "/movie",
            element : <Movie />
        },
        {
             path : "/moviescreening",
            element : <MovieScreening />
        },
        {
            path : "/categories",
            element: <Categories />
        },
        {
            path: "/actors",
            element: <Actors />
        },
        
        {
            path: "/directors",
            element: <Directors />
        },
        {
            path: "/cinema",
            element: <Cinema />
        },
        {
            path: "/cinemalocations",
            element: <CinemaLocations />
        },
      {
            path: "/cities",
            element: <Cities />
        },
          {
            path: "/orders",
            element: <Orders />
        },
          {
            path: "/foods",
            element: <Food />
        },
        {
            path: "/rooms",
            element: <Rooms />
        },
        {
            path: "/typechairs",
            element: <TypeChairs />
        },

        {
            path: "/user-pages",
            element: <UserPage />
        }

    ]   
    return (
        <div>
            <Routes>
                 {routers.map(e => (
                    <Route key={e.path}  path={e.path} element={e.element} />
                 ))}
            </Routes>
        </div>
    );
}

export default AdminRouters;