import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableTypeChairs from './TableTypeChairs';
import ModalTypeChairs from './ModalTypeChairs';
import logo from "../../../../assets/logo.png"
import { addDocument, updateDocument } from '../../../../services/firebaseService';

const inner = { name: "", imgUrl: logo, price: 0 }
function TypeChairs(props) {
   const [typechair, setTypeChair] = useState(inner);
   const [open, setOpen] = useState(false);
   const [error, setError] = useState(inner)

   const handleClickOpen = () => {
      setOpen(true);
      setTypeChair(inner);
      setError(inner);
   }
   const handleClose = () => {
      setOpen(false);
   }

   const handleEditTypeChair = (tps) => {
      handleClickOpen();
      setTypeChair(tps);
   }

   const handleInputTypeChairs = (e) => {
      setTypeChair({ ...typechair, [e.target.name]: e.target.value })
   }


   const addTypeChair = async () => {
      if (validation()) {
         return;
      }
      if (typechair.id) {
         await updateDocument("typechairs", typechair);
      } else {
         await addDocument("typechairs", typechair)
      }

      handleClose();
   }

   const validation = () => {
      const newError = {};
      newError.name = typechair.name ? "" : "Please Enter TypeChair Name"
      newError.price = typechair.price ? "" : "Please Enter Price"
      setError(newError);
      return Object.values(newError).some(e => e !== "")

   }

   const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            setTypeChair({ ...typechair, imgUrl: reader.result })
         }
         reader.readAsDataURL(file);
      }
   }
   return (
      <div>
         <SearchAdmin title="List TypeChairs" placeholder="Search TypeChair..." handleClickOpen={handleClickOpen} />
         <TableTypeChairs handleEditTypeChair={handleEditTypeChair} />
         <ModalTypeChairs handleImageChange={handleImageChange} error={error} addTypeChair={addTypeChair} open={open} handleClose={handleClose} typechair={typechair} handleInputTypeChairs={handleInputTypeChairs} />
      </div>
   );
}

export default TypeChairs;