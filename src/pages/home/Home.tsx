import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-auto flex flex-col justify-center items-center">
        <h1 className="text-pangea-blue text-4xl font-bold">MAIN CONTENT</h1>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
