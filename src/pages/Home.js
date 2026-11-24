import React from "react";
import Carousel from "../component/Carousel";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { featuredCategoryCollections } from "../data/demoProducts";
import truck from "../imeges/Services-truck.png";
import helpdesk from "../imeges/Services-helpdesk.png";
import servicereturn from "../imeges/Services-return.png";

import TopProduct from "../component/TopProduct";
import ExploreProduct from "../component/ExploreProduct";
import NewArrivalProd from "../component/NewArrivalProd";

export default function Home() {
  return (
    <>
      <section className="no-scrollbar mx-[5%] mt-10 flex flex-col justify-center lg:mx-[135px]">
        <div>
          <Carousel />
          <TopProduct />
        </div>
      </section>

      <hr className="mx-[5%] mt-10 h-1 md:mx-[135px]" />

      <section className="mx-[5%] my-20 lg:mx-[135px]">
        <div>
          <div className="flex items-center">
            <div className="w-5 h-10 rounded bg-primary"></div>
            <p className="ms-4 text-2xl font-semibold text-primary md:text-base">
              Categories
            </p>
          </div>

          <div className="flex w-full justify-between">
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">Browse by category</h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 text-center sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {featuredCategoryCollections.map((category) => (
            <Link
              key={category.slug}
              to={`/Product?category=${category.slug}`}
              className="category-card group flex min-h-36 flex-col items-center justify-center gap-3 p-4"
              aria-label={`Browse ${category.name} collection`}
            >
              <img
                src={category.image}
                alt=""
                loading="lazy"
                className="category-card-image"
              />
              <span className="font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <hr className="mx-[5%] h-1 md:mx-[135px]" />

      <section>
        <div
          className="campaign-banner mt-[50px] mx-[5%] lg:mx-[135px] h-[400px]"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1800&q=85)",
          }}
        >
          <div className="campaign-banner-content text-white">
            <ul className="">
              <li className="">
                <p className="font-medium uppercase tracking-[0.2em] text-[#e6a779]">The listening room</p>
              </li>
              <li className="mt-8  s">
                <h5 className="font-semibold sm:text-5xl text-2xl">
                  Make room for <br /> better sound.
                </h5>
              </li>
              {/* countdown 2 */}

              <li className="mt-10">
                <Link to="/Product?category=headphones" className="inline-flex h-12 items-center rounded-lg bg-white px-6 font-semibold text-[#18251f] hover:bg-[#f5e8dc]">
                  Explore audio
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-[71px] mx-[10%] lg:mx-[135px]">
        <div className="">
          <ExploreProduct />
        </div>
      </section>

      <section className=" mt-[10%] mx-[5%] lg:mx-[135px] my-[140px]">
        <div className=" ">
          <ul>
            <li className="flex items-center ">
              <div className="w-5 h-10 rounded bg-primary"></div>
              <p className="text-primary font-semibold ms-4 text-2xl md:text-base">
                Featured
              </p>
            </li>
          </ul>

          <ul className="flex w-full justify-start">
            <li className="font-semibold text-4xl mt-6  ">New Arrival</li>
          </ul>
        </div>

        <NewArrivalProd />

        <div className="mt-[140px] ">
          <div className=" grid sm:grid-cols-3 grid-cols-1 gap-4  items-center justify-between xl:mx-[113px] *:mt-5 *:w-auto">
            <ul className="text-center ">
              <li className="  w-full flex justify-center  mb-6">
                <img src={truck} alt="" className="h-20 w-20" />
              </li>
              <li className="font-semibold text-xl leading-7">
                SAMPLE CHECKOUT
              </li>
              <li className="text-[14px] leading-5">
                Try a simulated order with sample products
              </li>
            </ul>
            <ul className="text-center ">
              <li className="  w-full flex justify-center mb-6">
                <img src={helpdesk} alt="" className="h-20 w-20" />
              </li>
              <li className="font-semibold text-xl leading-7">
                LOCAL DEMO FORMS
              </li>
              <li className="text-[14px] leading-5">
                Forms keep their data in this browser tab
              </li>
            </ul>
            <ul className="text-center ">
              <li className="  w-full flex justify-center mb-6">
                <img src={servicereturn} alt="" className="h-20 w-20" />
              </li>
              <li className="font-semibold text-xl leading-7">
                NO REAL PAYMENTS
              </li>
              <li className="text-[14px] leading-5">
                Checkout never charges or collects payment
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
