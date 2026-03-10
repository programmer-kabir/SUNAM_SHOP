"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

export default function FAQSection() {
  const [open, setOpen] = useState(0);
  const { language } = useThemeLanguage();
  const lang = language === "BN" ? "BN" : "EN";

  const faqs = [
    {
      EN: {
        q: "How much do deliveries cost?",
        a: (
          <div className="space-y-4">
            <p>The delivery fee across the country is in the table below:</p>

            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2"></th>
                  <th className="border px-3 py-2">Orders below 400</th>
                  <th className="border px-3 py-2">Orders above 400</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border px-3 py-2 font-medium">Dhaka</td>
                  <td className="border px-3 py-2">59</td>
                  <td className="border px-3 py-2">49</td>
                </tr>

                <tr>
                  <td className="border px-3 py-2 font-medium">Chattogram</td>
                  <td className="border px-3 py-2">59</td>
                  <td className="border px-3 py-2">49</td>
                </tr>

                <tr>
                  <td className="border px-3 py-2 font-medium">Jashore</td>
                  <td className="border px-3 py-2">29</td>
                  <td className="border px-3 py-2">19</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },

      BN: {
        q: "ডেলিভারির খরচ কত?",
        a: (
          <div className="space-y-4">
            <p>সারা দেশে ডেলিভারি চার্জ নিচের টেবিলে দেওয়া হলো:</p>

            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2"></th>
                  <th className="border px-3 py-2">৪০০ টাকার নিচে</th>
                  <th className="border px-3 py-2">৪০০ টাকার উপরে</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border px-3 py-2 font-medium">ঢাকা</td>
                  <td className="border px-3 py-2">59</td>
                  <td className="border px-3 py-2">49</td>
                </tr>

                <tr>
                  <td className="border px-3 py-2 font-medium">চট্টগ্রাম</td>
                  <td className="border px-3 py-2">59</td>
                  <td className="border px-3 py-2">49</td>
                </tr>

                <tr>
                  <td className="border px-3 py-2 font-medium">যশোর</td>
                  <td className="border px-3 py-2">29</td>
                  <td className="border px-3 py-2">19</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
    },

    {
      EN: {
        q: "What are your delivery hours?",
        a: "We deliver from 7:30 AM to 11 PM every day.",
      },
      BN: {
        q: "ডেলিভারির সময় কখন?",
        a: "আমরা প্রতিদিন সকাল ৭:৩০ থেকে রাত ১১টা পর্যন্ত ডেলিভারি করি।",
      },
    },

    {
      EN: {
        q: "Do you serve my area?",
        a: "We currently serve Dhaka, Chattogram and Jashore.",
      },
      BN: {
        q: "আপনারা কি আমার এলাকায় ডেলিভারি করেন?",
        a: "বর্তমানে আমরা ঢাকা, চট্টগ্রাম এবং যশোরে সেবা দিচ্ছি।",
      },
    },
    {
      EN: {
        q: "What is your policy on refunds?",
        a: (
          <div className="space-y-3">
            <p>
              We offer a refund or return policy of seven (7) days on most
              unopened or unspoilt packaged products.
            </p>

            <ul className="space-y-1">
              <li>
                <span className="font-medium">A.</span> For perishable products
                such as milk, fruits and fresh vegetables, we provide a 1 (one)
                day return policy.
              </li>

              <li>
                <span className="font-medium">B.</span> Diaper items must be
                returned before 10% or 3 pieces (whichever comes first) have
                been used.
              </li>

              <li>
                <span className="font-medium">C.</span> Face masks, disposable
                gloves, alcohol pads and testing kits are not eligible for
                return.
              </li>
            </ul>
          </div>
        ),
      },

      BN: {
        q: "রিফান্ড বা রিটার্ন নীতি কী?",
        a: (
          <div className="space-y-3">
            <p>
              বেশিরভাগ অখোলা বা নষ্ট না হওয়া প্যাকেটজাত পণ্যের জন্য আমরা ৭
              দিনের রিটার্ন বা রিফান্ড সুবিধা প্রদান করি।
            </p>

            <ul className="space-y-1">
              <li>
                <span className="font-medium">A.</span> দুধ, ফল এবং তাজা সবজির
                মতো দ্রুত নষ্ট হওয়া পণ্যের জন্য ১ দিনের রিটার্ন নীতি প্রযোজ্য।
              </li>

              <li>
                <span className="font-medium">B.</span> ডায়াপার পণ্য ১০% বা ৩টি
                ব্যবহার হওয়ার আগে রিটার্ন করতে হবে।
              </li>

              <li>
                <span className="font-medium">C.</span> ফেস মাস্ক, ডিসপোজেবল
                গ্লাভস, অ্যালকোহল প্যাড এবং টেস্টিং কিট রিটার্নযোগ্য নয়।
              </li>
            </ul>
          </div>
        ),
      },
    },

    {
      EN: {
        q: "What about the product prices?",
        a: "Our prices are very close to the local market price. We always try to keep our prices fair and affordable for customers.",
      },

      BN: {
        q: "পণ্যের দাম কেমন?",
        a: "আমাদের পণ্যের দাম সাধারণত স্থানীয় বাজারের কাছাকাছি থাকে। আমরা সবসময় ন্যায্য এবং সাশ্রয়ী দাম রাখার চেষ্টা করি।",
      },
    },

    {
      EN: {
        q: "Can I cancel my order?",
        a: "Yes, you can cancel your order before it is shipped. Once the order is shipped, cancellation may not be possible.",
      },

      BN: {
        q: "আমি কি অর্ডার বাতিল করতে পারি?",
        a: "হ্যাঁ, পণ্য শিপ হওয়ার আগে আপনি অর্ডার বাতিল করতে পারবেন। শিপ হয়ে গেলে বাতিল করা সম্ভব নাও হতে পারে।",
      },
    },

    {
      EN: {
        q: "What payment methods do you accept?",
        a: "We currently accept Cash on Delivery (COD) and selected online payment methods.",
      },

      BN: {
        q: "আপনারা কোন পেমেন্ট পদ্ধতি গ্রহণ করেন?",
        a: "বর্তমানে আমরা ক্যাশ অন ডেলিভারি (COD) এবং কিছু অনলাইন পেমেন্ট পদ্ধতি গ্রহণ করি।",
      },
    },

    {
      EN: {
        q: "How can I contact customer support?",
        a: "You can contact our support team through phone, email or our website contact form.",
      },

      BN: {
        q: "কাস্টমার সাপোর্টে কীভাবে যোগাযোগ করবো?",
        a: "আপনি ফোন, ইমেইল অথবা আমাদের ওয়েবসাইটের কন্টাক্ট ফর্মের মাধ্যমে যোগাযোগ করতে পারবেন।",
      },
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-[1440px]  px-4 md:px-6 lg:px-8 w-full mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h6 className="text-indigo-600 font-medium mb-2">FAQs</h6>
          <h2 className="text-4xl font-bold text-gray-900">
            {lang === "en" ? "Looking for answers?" : "আপনার প্রশ্নের উত্তর"}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-6">
          {faqs.map((item, i) => (
            <div key={i} className="border-b pb-4">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full justify-between"
              >
                <h5 className="text-lg font-medium">{item[lang].q}</h5>

                <ChevronDown
                  className={`transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  open === i
                    ? "grid-rows-[1fr] opacity-100 mt-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden text-sm text-gray-600">
                  {item[lang].a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
