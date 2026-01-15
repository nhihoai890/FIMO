import React, { useState } from 'react';
import SearchAdmin from '../../../components/admin/SearchAdmin';
import TableUser from './TableUser';
import ModalUser from './ModalUser';
const inner = {email: "", name: "", password: "", role: ""}
function UserPage(props) {
    const [users, setUsers ] = useState(inner);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
       setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <SearchAdmin title="List User" placeholder="Search User..." handleClickOpen={handleClickOpen} />
            <TableUser />
            <ModalUser open={open} handleClose={handleClose} />
        </div>
    );
}

export default UserPage;