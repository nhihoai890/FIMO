import React, { useContext, useEffect, useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableActors from './TableActors';
import ModalActors from './ModalActors';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
import { ActorsContext } from '../../../../contexts/ActorProvider';

const inner = { name: "", description: "", imgUrl: "" }
function Actors(props) {
    const actors = useContext(ActorsContext);
    const [actor, setActor] = useState(inner);
    const [errorText, setErrorText] = useState(inner);
    const [open, setOpen] = useState(false);
    const [filteredActors, setFilteredActors] = useState([]);

    useEffect(() => {
        setFilteredActors(actors)
    }, [actors])

    const handleClickOpen = () => {
        setOpen(true);
        setActor(inner);
        setErrorText(inner);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (e) => {
        setActor({ ...actor, [e.target.name]: e.target.value })
    }

    const validation = () => {
        const newError = {};
        newError.name = actor.name ? "" : "Please enter your name"
        newError.description = actor.description ? "" : "Please enter description"
        newError.imgUrl = actor.imgUrl ? "" : "Please enter imgUrl"
        setErrorText(newError);
        return Object.values(newError).some(e => e !== "");
    }

    const handleEditActor = (act) => {
        handleClickOpen();
        setActor(act);
    }
    const addActors = async () => {
        if (validation()) {
            return;
        }
        if (actor.id) {
            await updateDocument("actors", actor);
        } else {
            await addDocument("actors", actor);
        }
        handleClose();
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setActor({ ...actor, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSearch = (query) => {
        const filtered = actors.filter(actor => actor.name.toLowerCase().includes(query.toLowerCase().trim()));
        setFilteredActors(filtered)
    }
  


    return (
        <div className='p-4' >
            <SearchAdmin title="List Actors"
                placeholder="Search Actor..."
                handleClickOpen={handleClickOpen}
                onSearch={handleSearch}
                />
            <TableActors handleEditActor={handleEditActor} actors={filteredActors}  />
            <ModalActors handleImageChange={handleImageChange} actor={actor} errorText={errorText} open={open} handleClose={handleClose} handleInput={handleInput} addActors={addActors} />
        </div>
    );
}

export default Actors;