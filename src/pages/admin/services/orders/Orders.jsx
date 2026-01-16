import React, { useState } from 'react';
import SearchAdmin from '../../../../components/admin/SearchAdmin';
import TableOrders from './TableOrders';



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
            
        </>

    );
}

export default Orders;