
import React from 'react';
import NowShowing from '../pages/client/movie/NowShowing';
import ComingSoon from '../pages/client/movie/ComingSoon';
import Schedule from '../pages/client/schedule/Schedule';
import Cinema from '../pages/client/cinema/Cinema';
import Community from '../pages/client/contact/Community';
import Contact from '../pages/client/contact/Contact';
import Main from '../pages/client/main/Main';
import { Route, Routes } from 'react-router-dom';
import Details from '../pages/client/detail/Details';
import Booking from '../pages/client/booking/Booking';
import Order from '../pages/client/combo/Order';
import Payment from '../pages/client/payment/Payment';



function ClientRouters(props) {
    const routers = [

        {
            path: "/nowshowing",
            element: <NowShowing />
        },

        {
            path: "/comingsoon",
            element: <ComingSoon />
        },

        {
            path: "/schedule",
            element: <Schedule />
        },

        {
            path: "/cine",
            element: <Cinema />
        },

        {
            path: "/community",
            element: <Community />
        },

        {
            path: "/main",
            element: <Main />
        },

        {
            path: "/contact",
            element: <Contact />
        },
        {
            path: "/details/:id",
            element: <Details />
        },

        {
            path: "/booking/:id/:showtime",
            element: <Booking />
        },
        {
            path: "/order/:id/:idLocation",
            element: <Order />
        },
        {
            path: "/payment",
            element:<Payment />
        }

    ]
    return (
        <div>
            <Routes>
                 <Route path="/" element={<Main />} />
                {
                    routers.map(e => (
                        <Route path={e.path} element={e.element} />
                    ))
                }
            </Routes>
        </div>
    );
}

export default ClientRouters;