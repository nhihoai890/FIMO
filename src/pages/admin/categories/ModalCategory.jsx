import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalCategory({ handleClose, open, handleChangeInput, addCategory, error, category }) {


  return (
    <Dialog    TransitionComponent={Transition}
    open={open} onClose={handleClose}>
      <DialogTitle>
     
        {category.id ? "Edit Category" : "Add New Category"}
      </DialogTitle>

      <DialogContent dividers>
        <div >
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            name="name"
            variant="outlined"
            value={category.name}
            onChange={handleChangeInput}
            error={!!error.name}
            helperText={error.name}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            name="description"
            fullWidth
            rows={3}
            value={category.description}
            multiline
            variant="outlined"
            onChange={handleChangeInput}
            error={!!error.description}
            helperText={error.description}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={addCategory}
          variant="contained"
          color="primary"
        >
          {category.id ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>

  );
}

export default ModalCategory;
