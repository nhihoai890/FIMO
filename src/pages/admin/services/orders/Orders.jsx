import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableOrders from './TableOrders';
import ModalOrders from './ModalOrders';



function Orders(props) {
    const [open, setOpen] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            <SearchAdmin title="List Orders" placeholder="Search Orders..." handleClickOpen={handleClickOpen} />
            <TableOrders />
            <ModalOrders open={open} handleClose={handleClose} />
        </>

    );
}

export default Orders;