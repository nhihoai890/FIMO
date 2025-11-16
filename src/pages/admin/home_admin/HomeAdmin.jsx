import React from 'react';
import MenuAdmin from '../../../components/admin/MenuAdmin';
import HeaderAdmin from '../../../components/admin/HeaderAdmin';
import AdminRouters from '../../../routes/AdminRouters';

function HomeAdmin(props) {
    return (
        <div className='min-md:flex h-screen'>
            <MenuAdmin />
            <div className='flex-1'>
                <HeaderAdmin />
                <div className='p-5'>
                    <AdminRouters />
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;