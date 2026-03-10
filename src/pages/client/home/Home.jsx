import React from 'react';
import Header from '../../../components/client/Header';
import ClientRouters from '../../../routes/ClientRouters';
import Footer from '../../../components/client/Footer';
import Main from '../main/Main';
import PageSearch from '../../../components/client/PageSearch';
import ChatBox from '../chatbox/ChatBox';


function Home(props) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Header />
            <main className="flex-1 ">
                <ChatBox />
                <ClientRouters />
            </main>
            <Footer />
        </div>


    );
}

export default Home;