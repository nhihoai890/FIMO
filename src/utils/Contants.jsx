import { BiSolidCategoryAlt } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { FaBowlFood } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdDashboard, MdEventSeat, MdGroup } from "react-icons/md";

export const LISTMENU = [
   {
      name: "Dashboard",
      path: "/",
      icon: <MdDashboard />,
      items: []
   },
   {
      name: "Categories",
      path: "/categories",
      icon: <BiSolidCategoryAlt />,
      items: []
   },

   {

      title: "CinemaManager",
      icon: <CiImageOn />,
      items: [
         {
            name: "Movie",
            path: "/movie"
         },
         {
            name: "MovieScreening",
            path: "/moviescreening"
         },
      ]
   },
   {
      title: "Location",
      icon: <IoLocationSharp />,
      items: [
         {
            name: "Cities",
            path: "/cities"
         },
         {
            name: "CinemaLocations",
            path: "/cinemalocations"
         },
         {
            name: "Cinema",
            path: "/cinema"
         }
      ]
   },
   {
      title: "Cast and Crew",
      icon: <MdGroup />,
      items: [
         {
            name: "Actors",
            path: "/actors"
         },
         {
            name: "Directors",
            path: "/directors"
         },
      ]
   },
   {
      title: "Seating",
      icon: <MdEventSeat />,
      items: [
         {
            name: "TypeChairs",
            path: "/typechairs"
         },
         {
            name: "Room",
            path: "/rooms"
         }

      ]
   },
   {
      title: "Services",
      icon: <FaBowlFood />,
      items: [
         {
            name: "Foods",
            path: "/foods"
         },
         {
            name: "Booking",
            path: "/booking"
         },
      ]
   },

]

export const ROLES = {
    ADMIN: 'admin',        // Quản trị viên cấp cao
    MODERATOR: 'moderator', // Quản trị viên cấp trung (người kiểm duyệt)
    USER: 'user',          // Người dùng thông thường
};