import React from "react";

import phone from "../imeges/red_call_icon.png";
import mail from "../imeges/red_mail_icon.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { submitDemoContact } from "../utils/mockStore";

export default function Contact() {
  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    submitDemoContact(Object.fromEntries(formData.entries()));
    event.currentTarget.reset();
    toast.success("Message saved in this tab. Thanks for reaching out!");
  };
  
  return (
    <>
      <div className="md:mt-20 mt-10 mx-[5%] lg:mx-[135px] mb-[180px]">
        <div className="flex ">
          <Link to="/" className="text-[#808080] me-3 text-sm">
            Home
          </Link>
          <p className="text-[#808080] me-3 text-sm">/</p>
          <Link to="/contact" className=" text-sm">
            Contact
          </Link>
        </div>

        <div className="md:mt-20 mt-10 md:flex justify-between flex-row-reverse">
          {/* input field */}

          {/* right */}
          <form
            onSubmit={submit}
            className="grid lg:grid-cols-3 grid-cols-1 w-full lg:ps-10 ps-0 gap-4 mt-10 md:mt-0"
          >
            {/* Name */}
            <div>
              <input
                type="text"
                className="h-[50px] rounded bg-[#F5F5F5] ps-2 sm:ps-4 border w-full"
                placeholder="Your Name *"
                name="name"
                required
                minLength={2}
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                className="h-[50px] rounded bg-[#F5F5F5] ps-2 sm:ps-4 border w-full"
                placeholder="Your Email *"
                name="email"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <input
                type="tel"
                className="h-[50px] rounded bg-[#F5F5F5] ps-2 sm:ps-4 border w-full"
                placeholder="Your Phone *"
                name="phone"
                required
                pattern="[0-9]{10,15}"
              />
            </div>

            {/* Message */}
            <div className="lg:col-span-3">
              <textarea
                className="h-[207px] bg-[#F5F5F5] ps-1 sm:ps-4 placeholder:pt-0 rounded border w-full"
                placeholder="Your Message"
                name="message"
                required
                minLength={10}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="justify-end lg:col-span-3 flex mt-4">
              <button
                type="submit"
                className="bg-primary h-14 w-[215px] text-white rounded"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* contacts details */}

          {/* left */}
          <div className="mt-10 lg:mt-0 text-center md:text-left ">
            {/* call */}
            <div className="">
              <div className="flex items-center font-medium">
                <img src={phone} alt="Call" className="h-10 w-10 me-4" />
                <p className="">Call To Us</p>
              </div>
              <p className="text-sm mt-6">
                This demo does not have a live support line.
              </p>
            </div>
            {/* line hr */}
            <hr className="my-8" />

            {/* mail */}
            <div className="">
              <div className="">
                <div className="flex items-center font-medium">
                  <img src={mail} alt="mail" className="h-10 w-10 me-4" />
                  <p className="">Write To Us</p>
                </div>
                <p className="text-sm mt-6">
                  Try the form. Your message stays in this browser tab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
