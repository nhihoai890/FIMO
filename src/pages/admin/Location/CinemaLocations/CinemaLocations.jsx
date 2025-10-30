import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableCinemaLocations from './TableCinemaLocations';
import ModalCinemaLocations from './ModalCinemaLocations';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
import logo from "../../../../assets/logo.png"

const inner = { name: "", address: "", phone: "", imgUrl: logo, idCity: "", idCinema: "" }
function CinemaLocations(props) {
    const [open, setOpen] = useState(false);
    const [cinemaLocation, setCinemaLocation] = useState(inner);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setCinemaLocation(inner);
        setError(inner);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const addLocations = async () => {
        if (validation()) {
            return;
        }
        try {
            setLoading(true);
            if (cinemaLocation.id) {
                await updateDocument("cinemaLocations", cinemaLocation)
            } else {
                await addDocument("cinemaLocations", cinemaLocation);
            }

            handleClose();

        } catch (error) {
               console.error("Có lỗi xảy ra:", error);
        }finally{
            setLoading(false);
        }

    }


    const validation = () => {
        const newError = {};
        newError.name = cinemaLocation.name ? "" : "Please Enter Name CinemaLocation"
        newError.address = cinemaLocation.address ? "" : "Please Enter Address"
        newError.phone = cinemaLocation.phone ? "" : "Please Enter Phone"
        newError.idCity = cinemaLocation.idCity ? "" : "Please Choose City"
        newError.idCinema = cinemaLocation.idCinema ? "" : "Please Choose Cinema"
        setError(newError);
        return Object.values(newError).some(e => e !== "");
    }

    const handleImageChangeLocations = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCinemaLocation({ ...cinemaLocation, imgUrl: reader.result })
            };
            reader.readAsDataURL(file);
        }
    }

    const handleEditLocation = (cne) => {
        handleClickOpen();
        setCinemaLocation(cne);
    }

    const handleInputLocation = (e) => {

        setCinemaLocation({ ...cinemaLocation, [e.target.name]: e.target.value })
    }
    console.log(cinemaLocation);

    return (
        <div>
            <SearchAdmin title="List CinemaLocations" placeholder="CinemaLocations...." handleClickOpen={handleClickOpen} />
            <TableCinemaLocations handleEditLocation={handleEditLocation} />
            <ModalCinemaLocations loading={loading} error={error} addLocations={addLocations} handleImageChangeLocations={handleImageChangeLocations} open={open} handleClose={handleClose} handleInputLocation={handleInputLocation} cinemaLocation={cinemaLocation} />
        </div>
    );
}

export default CinemaLocations;