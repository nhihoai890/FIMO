import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableCinema from './TableCinema';
import ModalCinema from './ModalCinema';
import { addDocument, updateDocument } from '../../../../services/firebaseService';

const inner = { name: "", imgUrl: "" };
function Cinema(props) {
    const [cinema, setCinema] = useState(inner);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(inner);
    const handleClickOpen = () => {
        setOpen(true);
        setCinema(inner);
        setError(inner);
    };
    const handleClose = () => setOpen(false);

    const addCinema = async () => {
        if (validation()) {
            return;
        }
        if (cinema.id) {
            updateDocument("cinemas", cinema);
        } else {
            await addDocument("cinemas", cinema);
        }

        handleClose();
    }
    const validation = () => {
        const newError = {};
        newError.name = cinema.name ? "" : "Please enter cinema";
        setError(newError);
        return Object.values(newError).some(e => e !== "");
    }
    const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCinema({ ...cinema, imgUrl: reader.result });
            };
            reader.readAsDataURL(file)
        }
    }

    const handleEditCinema = (cnn) => {
        handleClickOpen();
        setCinema(cnn);
    }
    const handleInput = (e) => {
        setCinema({ ...cinema, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <SearchAdmin title="List Cinema" placeholder="Search Cinema..." handleClickOpen={handleClickOpen} />
            <TableCinema handleEditCinema={handleEditCinema} />
            <ModalCinema open={open} handleClose={handleClose} cinema={cinema} handleImage={handleImage} handleInput={handleInput} addCinema={addCinema} error={error} />
        </div>
    );
}

export default Cinema;