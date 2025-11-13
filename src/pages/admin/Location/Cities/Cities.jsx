import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableCities from './TableCities';
import ModalCities from './ModalCities';
import logo from "../../../../assets/logo.png"
import { addDocument, updateDocument } from '../../../../services/firebaseService';

const inner = { name: "", description: "", imgUrl: logo }
function Cities(props) {
    const [open, setOpen] = useState(false);
    const [city, setCity] = useState(inner);
    const [error, setError] = useState(false);
    const handleClickOpen = () => {
        setCity(inner);
        setError(inner);
        setOpen(true);
    }

    const handleInputCities = (e) => {
        setCity({ ...city, [e.target.name]: e.target.value });
    }
    const handleClose = () => {

        setOpen(false);
    };

    const validation = () => {
        const newError = {};
        newError.name = city.name ? "" : "Please enter your city"
        newError.description = city.description ? "" : "Please enter description"
        setError(newError);
        return Object.values(newError).some(e => e !== "")
    }

    const addCities = async () => {
        if (validation()) {
            return;
        }
        if (city.id) {
            await updateDocument("cities", city)
        } else {
            await addDocument("cities", city);
        }

        handleClose();

    }

    const handleEditCities = (cte) => {
        handleClickOpen();
        setCity(cte);
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCity({ ...city, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <div>
            <SearchAdmin title="List Cities"
                placeholder="Search Cities..."
                handleClickOpen={handleClickOpen} />
            <TableCities handleEditCities={handleEditCities} />
            <ModalCities error={error} city={city} open={open} handleClose={handleClose} addCities={addCities} handleInputCities={handleInputCities} handleImageChange={handleImageChange} />
        </div>
    );
}

export default Cities;