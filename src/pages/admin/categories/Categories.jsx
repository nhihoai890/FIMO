import React, { useState } from "react";
import SearchAdmin from "../../../components/admin/SearchAdmin";
import TableCategory from "./TableCategory";
import ModalCategory from "./ModalCategory";
import { addDocument, updateDocument } from "../../../services/firebaseService";

const inner = {name : "", description : ""}
export default function Categories() {
  const [category,setCategory] = useState(inner);
  const [error,setError] = useState(inner);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
     setOpen(true);
     setCategory(inner);
     setError(inner);
  } ;
  const handleClose = () => setOpen(false);

const handleChangeInput = (e) => {
    setCategory({...category, [e.target.name]  : e.target.value })
}

const validation = () => {
    const newError = {} ;
    newError.name = category.name ? "" : "Please Enter your name" ;
    newError.description = category.description ? "" : "  Please enter your description";
    setError(newError);
    return Object.values(newError).some(e => e !== "");
}

const addCategory = async () => {
      if(validation()) {
        return;
      }
      if(category.id){
          await updateDocument("categories",category);
      }else {
        await addDocument("categories",category);
      }
      handleClose();
}

const handleEdit = (cate) => {
     handleClickOpen();
     setCategory(cate);
}

console.log(category);

  return (
    <>
      <SearchAdmin
        title="List Categories"
        placeholder="Search category..."
        handleClickOpen={handleClickOpen}
      />

      <TableCategory handleEdit={handleEdit} />
      <ModalCategory category={category} error={error} open={open} handleClose={handleClose} handleChangeInput={handleChangeInput} addCategory={addCategory} />
    </>
  );
}
