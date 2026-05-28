import React from 'react';
import QuickCategories from '../components/QuickCategories';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import Categories from '../components/Categories';
import BestSellers from '../components/BestSellers';
import Explore from '../components/Explore';
import Reviews from '../components/Reviews';

const Home = () => {
  return (
    <main className="apple-transition">
      <QuickCategories />
      <Hero />
      <TrustBadges />
      <BestSellers />
      <Explore />
      <Categories />
      <Reviews />
    </main>
  );
};

export default Home;
