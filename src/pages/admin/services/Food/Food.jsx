import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableFood from './TableFood';
import ModalFood from './ModalFood';
import logo from "../../../../assets/logo.png"
import { addDocument, updateDocument } from '../../../../services/firebaseService';
const inner = { name: "", imgUrl: logo, price: "", idCinemaLocation: "", discount: "" }

function Food(props) {
  const [open, setOpen] = useState(false);
  const [food, setFood] = useState(inner);
  const [error, setError] = useState(false);

  const handleClickOpen = () => {
    setFood(inner)
    setError(inner)
    setOpen(true);
  };

  const handleInputFood = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value })
  }

  const validation = () => {
    const newError = {};
    newError.name = food.name ? "" : "Please Enter Name Food"
    newError.price = food.price ? "" : "Please Enter Price"
    newError.idCinemaLocation = food.idCinemaLocation ? "" : "Please Choose Cinema"
    newError.discount = food.discount ? "" : "Please Enter Discount"
    setError(newError);
    return Object.values(newError).some(e => e !== "")
  }

  const handleClose = () => {
    setOpen(false);
  };

  const addFood = async () => {
    if (validation()) {
      return;
    }
    if (food.id) {
      await updateDocument("food", food)
    } else {
      await addDocument("foods", food)
    }

    handleClose();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFood({ ...food, imgUrl: reader.result })
      }
      reader.readAsDataURL(file);
    }

  }
  const handleEditFood = (f) => {
    handleClickOpen();
    setFood(f);

  }
  return (
    <>
      <SearchAdmin title="List Foods" placeholder="Search Food..." handleClickOpen={handleClickOpen} />
      <TableFood handleEditFood={handleEditFood} />
      <ModalFood open={open} handleClose={handleClose} handleInputFood={handleInputFood} food={food} addFood={addFood} handleImageChange={handleImageChange} error={error} />
    </>

  );
}

export default Food;