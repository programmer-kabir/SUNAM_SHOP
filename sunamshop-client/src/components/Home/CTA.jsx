"use client";

import Image from "next/image";

export default function CTASection() {
  return (
    <section className="bg-[#f4f0fe] py-12 px-4 md:px-8 overflow-hidden relative flex items-center min-h-[400px]">
      <div className="max-w-[1440px]  px-4 md:px-6 lg:px-8 mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left z-10">
          <h2 className="text-2xl bn md:text-4xl font-bold text-black mb-4 leading-snug">
            চালডাল অ্যাপ ডাউনলোড করুন <br /> এখনই!
          </h2>
          <h2 className="text-2xl en md:text-4xl font-bold text-black mb-4 leading-snug">
            Download The Chaldal App
            <br /> Now!
          </h2>

          <p className="text-gray-800 bn text-sm md:text-lg mb-8 max-w-lg leading-relaxed">
            চালডাল অ্যাপ থেকে আপনার প্রথম অর্ডারে পান ৫% ডিসকাউন্ট এবং আপনার
            শপিং এক্সপেরিয়েন্সকে করুন আরো সহজ!
          </p>
          <p className="text-gray-800 en text-sm md:text-lg mb-8 max-w-lg leading-relaxed">
            Get 5% off on your first order through the Chaldal app and make your
            shopping experience even smoother!
          </p>

          <div className="flex gap-4">
            <a href="#">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
                width={140}
                height={45}
              />
            </a>

            <a href="#">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Play Store"
                width={150}
                height={45}
              />
            </a>
          </div>
        </div>

        {/* Right Images */}
        <div className="flex-1 relative flex justify-center items-center h-[260px] md:h-[420px]">
          {/* Back Phone */}
          <Image
            src="https://supplylinkbd.com/img/Sunam_Shop/Cta/cta.png"
            alt="App Screen"
            width={240}
            height={360}
            className="relative md:absolute md:left-10 left-6 md:top-10 md:rotate-[-10deg] opacity-80"
          />

          {/* Front Phone */}
          <Image
            src="https://supplylinkbd.com/img/Sunam_Shop/Cta/cta.png"
            alt="App Screen"
            width={240}
            height={380}
            className="relative md:absolute md:right-10 right-10 md:bottom-0  md:rotate-[8deg] z-10"
          />
        </div>
      </div>
    </section>
  );
}
