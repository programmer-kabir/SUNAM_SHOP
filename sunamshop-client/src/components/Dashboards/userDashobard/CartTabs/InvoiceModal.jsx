"use client";
import useProducts from "@/hooks/useProducts";
import useUsers from "@/hooks/useUsers";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const InvoiceModal = ({ order, onClose }) => {
  const { data: users = [] } = useUsers();
  const { data: products = [] } = useProducts();
  const invoiceRef = useRef(null);

  if (!order) return null;

  // ================= CALCULATIONS =================
  const subtotal =
    order.items?.reduce((sum, item) => sum + item.subtotal, 0) || 0;

  const vatRate = 0.2;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  const invoiceNumber = `${order.orderId}`;

  // ================= USER =================
  const userInfo = users.find((u) => u.email === order?.userEmail);

  const userName =
    userInfo?.firstName && userInfo?.lastName
      ? `${userInfo.firstName} ${userInfo.lastName}`
      : order?.customerName || "Unknown Customer";

  const userAddress = userInfo
    ? `${userInfo.division || ""}, ${userInfo.district || ""}, ${
        userInfo.upazila || ""
      }, ${userInfo.villageName || ""}`
    : order?.address || "-";

  const productMap = products.reduce((acc, curr) => {
    acc[curr._id?.toString()] = curr;
    return acc;
  }, {});

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <>
      <style>
        {`
@page {
  size: A4;
  margin: 0;
}

@media print {

  html, body {
    width: 210mm;
    height: 297mm;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
  }

  body * {
    visibility: hidden;
  }

  #invoice-section, #invoice-section * {
    visibility: visible;
  }

  #invoice-section {
    position: fixed;
    top: 0;
    left: 0;
    width: 210mm;
    height: 297mm;
  }

  .no-break {
    page-break-inside: avoid;
  }

}
`}
      </style>

      <div className="fixed inset-0 bg-black/40 z-50 print:bg-white print:static print:inset-auto overflow-scroll flex lg:inline items-start md:items-center justify-center p-4 md:p-10">
        {" "}
        <div
          id="invoice-section"
          ref={invoiceRef}
          className="
bg-white 
w-full 
max-w-[900px] 
md:w-[210mm] 
md:h-[297mm] 
mx-auto 
p-6 
md:p-[20mm] 
relative
"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute md:top-6 top-2 top-0 right-8 text-gray-400 hover:text-red-500 text-xl print:hidden"
          >
            ✕
          </button>

          {/* WATERMARK */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <span className="text-7xl font-extrabold rotate-[-25deg] text-gray-400">
              {order?.status === "paid" ? "PAID" : "PAID"}
            </span>
          </div>

          {/* ================= HEADER ================= */}
          <div className="flex justify-between items-start border-b pb-8 mb-10 pt-16 md:pt-0">
            <div>
              <h1 className="lg:text-3xl text-xl font-bold text-gray-900">
                Sunam<span className="text-gray-500">.shop</span>
              </h1>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                Sunamganj, Sylhet <br />
                support@sunamshop.com <br />
                017XXXXXXXX
              </p>
            </div>

            <div className="text-right">
              <h2 className="md:text-2xl text-lg font-semibold tracking-widest text-gray-800">
                INVOICE
              </h2>
              <p className="text-sm text-gray-500 mt-3">
                <span className="font-medium">Invoice No:</span> {invoiceNumber}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* ================= BILL TO ================= */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">
              Bill To
            </h3>
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="font-semibold text-lg text-gray-900">{userName}</p>
              <p>{userAddress}</p>
              <p>{userInfo?.email}</p>
              <p>Phone: {userInfo?.number || "-"}</p>
            </div>
          </div>

          {/* ================= TABLE ================= */}
          <div className="border border-gray-200">
            <div className="grid grid-cols-5 bg-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-600 p-4 border-b">
              <div>Product</div>
              <div className="text-center">Qty</div>
              <div className="text-center">Size</div>
              <div className="text-center">Color</div>
              <div className="text-right">Amount</div>
            </div>

            {order.items?.map((item, index) => {
              const matchedProduct = productMap[item.productId?.toString()];

              return (
                <div
                  key={index}
                  className="grid grid-cols-5 text-sm p-4 border-b last:border-none"
                >
                  <div className="font-medium text-gray-800">
                    {matchedProduct?.name?.en ||
                      item.productName?.en ||
                      "Product"}
                  </div>

                  <div className="text-center">{item.qty}</div>
                  <div className="text-center">{item.size || "-"}</div>
                  <div className="text-center">{item.color || "-"}</div>

                  <div className="text-right font-medium">{item.subtotal}</div>
                </div>
              );
            })}
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="flex justify-end mt-12 no-break">
            <div className="w-80 text-sm">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                  <span> {subtotal}</span>
              </div>
              <div className="flex justify-between py-3 border-t mt-3 text-lg font-bold">
                <span>Total</span>
                <span> {subtotal}</span>
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="absolute bottom-[20mm] left-[20mm] right-[20mm] text-xs text-gray-400 border-t pt-4 text-center">
            <p>Thank you for your business.</p>
            <p>This is a computer generated invoice.</p>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="absolute top-10 space-x-5 print:hidden">
            <button
              onClick={handlePrint}
              className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceModal;
