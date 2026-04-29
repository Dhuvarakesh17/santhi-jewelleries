import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, Gem, Heart, Pin, Scale, Share2 } from "lucide-react";
import { JEWELLERY_DATA } from "../constants/jewelleryData";
import { useWishlist } from "../context/WishlistContext";
import { buildProductPath } from "../utils/productPath";

const categoryBasePrice: Record<string, number> = {
  gold: 85000,
  silver: 9000,
  diamond: 125000,
  platinum: 95000,
};

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 100000;
  }
  return hash;
};

const normalizeCategory = (value: string) => {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const aliases: Record<string, string> = {
    diamonds: "diamond",
    gem: "gems",
    signaturescollection: "signaturecollection",
  };
  return aliases[normalized] || normalized;
};

const getFrameVariant = (category: string) => {
  const normalized = normalizeCategory(category);
  if (normalized === "silver") return "luxury-frame--silver";
  if (normalized === "diamond" || normalized === "platinum")
    return "luxury-frame--diamond";
  if (normalized === "gems" || normalized === "signaturecollection")
    return "luxury-frame--signature";
  return "luxury-frame--gold";
};

const formatCurrency = (value: number) => `₹ ${value.toLocaleString("en-IN")}`;
const formatEstimatedCurrency = (value: number) => `${formatCurrency(value)}`;

const accordionTitleClass =
  "flex w-full items-center justify-between border-b border-maroon/20 px-6 py-6 text-left group transition-all hover:bg-maroon/[0.04] bg-maroon/[0.01]";

const accordionHeadingClass =
  "text-[13px] font-bold uppercase tracking-[0.25em] text-maroon group-hover:tracking-[0.3em] transition-all";

const ProductDetails = () => {
  const { type, sub, id } = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist, openWishlist } =
    useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [openPanels, setOpenPanels] = useState({
    productDetails: false,
    priceBreakup: false,
    shippingInfo: false,
    askQuestion: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    // Validation
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert("Please fill in all required fields (Name, Phone, and Message).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const whatsappNumber = "919443211809";
    const template = `Hello Santhi Jewellers,

I’m interested in your jewellery collection and would like more details.

Here are my details:

Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone}

Message:
${message}

Kindly assist me with more information about this product.

Thank you.`;

    const encodedMessage = encodeURIComponent(template);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const product = useMemo(() => {
    if (!id) return null;
    return JEWELLERY_DATA.find((item) => item.id === id) ?? null;
  }, [id]);

  const enrichedProduct = useMemo(() => {
    if (!product) return null;

    const hash = hashString(product.id + product.name);
    const base = categoryBasePrice[product.category.toLowerCase()] ?? 40000;

    return {
      ...product,
      price: base + (hash % 90000),
      inStock: hash % 9 !== 0,
    };
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    // 1. Precise matches (Same Material & Same Type - e.g., Gold Ring)
    const exactMatches = JEWELLERY_DATA.filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category &&
        item.subcategory === product.subcategory,
    );

    let result = [];

    if (exactMatches.length >= 4) {
      result = exactMatches.slice(0, 4);
    } else {
      // 2. Cross-category matches (Same Type, Different Material - e.g., Silver Ring for a Gold Ring)
      const typeMatches = JEWELLERY_DATA.filter(
        (item) =>
          item.id !== product.id &&
          item.subcategory === product.subcategory &&
          item.category !== product.category
      );

      let combined = [...exactMatches, ...typeMatches];
      if (combined.length >= 4) {
        result = combined.slice(0, 4);
      } else {
        // 3. Fallback to same material (Same Material, Different Type - e.g., Gold Bangle for a Gold Ring)
        const categoryMatches = JEWELLERY_DATA.filter(
          (item) =>
            item.id !== product.id &&
            item.category === product.category &&
            item.subcategory !== product.subcategory
        );

        combined = [...combined, ...categoryMatches];
        if (combined.length >= 4) {
          result = combined.slice(0, 4);
        } else {
          // 4. Last fallback (Any remaining products)
          const otherMatches = JEWELLERY_DATA.filter(
            (item) =>
              !combined.find(c => c.id === item.id) &&
              item.id !== product.id
          );

          result = [...combined, ...otherMatches].slice(0, 4);
        }
      }
    }

<<<<<<< HEAD
    return result.map(item => {
      const hash = hashString(item.id + item.name);
      const base = categoryBasePrice[item.category.toLowerCase()] ?? 40000;
      return {
        ...item,
        price: base + (hash % 90000)
      };
    });
=======
    // 2. Cross-category matches (Same Type, Different Material - e.g., Silver Ring for a Gold Ring)
    const typeMatches = JEWELLERY_DATA.filter(
      (item) =>
        item.id !== product.id &&
        item.subcategory === product.subcategory &&
        item.category !== product.category,
    );

    let combined = [...exactMatches, ...typeMatches];
    if (combined.length >= 4) {
      return combined.slice(0, 4);
    }

    // 3. Fallback to same material (Same Material, Different Type - e.g., Gold Bangle for a Gold Ring)
    const categoryMatches = JEWELLERY_DATA.filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category &&
        item.subcategory !== product.subcategory,
    );

    combined = [...combined, ...categoryMatches];
    if (combined.length >= 4) {
      return combined.slice(0, 4);
    }

    // 4. Last fallback (Any remaining products)
    const otherMatches = JEWELLERY_DATA.filter(
      (item) =>
        !combined.find((c) => c.id === item.id) && item.id !== product.id,
    );

    return [...combined, ...otherMatches].slice(0, 4);
>>>>>>> bb0c77bf08c2a26a1becfa85e7fb44ebc412d2f5
  }, [product]);

  const estimatedWeight = useMemo(() => {
    if (!enrichedProduct) return 0;
    const minWeight =
      enrichedProduct.category.toLowerCase() === "silver" ? 8 : 4;
    return Number(
      (minWeight + (enrichedProduct.price % 15000) / 1800).toFixed(2),
    );
  }, [enrichedProduct]);

  const makingCharge = useMemo(() => {
    if (!enrichedProduct) return 0;
    return Math.round(enrichedProduct.price * 0.18);
  }, [enrichedProduct]);

  const formattedGrossWeight = useMemo(
    () => estimatedWeight.toFixed(3),
    [estimatedWeight],
  );
  const formattedMetalWeight = useMemo(
    () => estimatedWeight.toFixed(1),
    [estimatedWeight],
  );

  const galleryImages = useMemo(() => {
    if (!product) return [];

    // 1. Same Type matches
    const sameType = JEWELLERY_DATA.filter(
      (item) =>
        item.category === product.category &&
        item.subcategory === product.subcategory &&
        item.id !== product.id,
    ).map((item) => item.image);

    if (sameType.length >= 2) {
      return [product.image, ...sameType.slice(0, 2)];
    }

    // 2. Same Category matches
    const sameCat = JEWELLERY_DATA.filter(
      (item) =>
        item.category === product.category &&
        item.subcategory !== product.subcategory &&
        item.id !== product.id,
    ).map((item) => item.image);

    const combined = [product.image, ...sameType, ...sameCat];
    if (combined.length >= 3) {
      return combined.slice(0, 3);
    }

    // 3. Any other matches
    const others = JEWELLERY_DATA.filter(
      (item) => item.id !== product.id && item.category !== product.category,
    ).map((item) => item.image);

    return [...combined, ...others].slice(0, 3);
  }, [product]);

  const handleWishlistToggle = () => {
    if (!enrichedProduct) return;

    if (isInWishlist(enrichedProduct.id)) {
      removeFromWishlist(enrichedProduct.id);
    } else {
      addToWishlist({
        id: enrichedProduct.id,
        name: enrichedProduct.name,
        price: formatCurrency(enrichedProduct.price),
        image: enrichedProduct.image,
        category: enrichedProduct.category,
      });
    }

    openWishlist();
  };

  if (!enrichedProduct) {
    return (
      <div className="min-h-[70vh] bg-[#fafaf9] px-4 py-20 lg:px-10">
        <div className="max-w-3xl p-10 mx-auto text-center bg-white border rounded-3xl border-stone-200">
          <h1 className="font-cinzel text-3xl text-[#480607]">
            Product not found
          </h1>
          <p className="mt-4 text-stone-600">
            This item is not available now. Please explore the collection.
          </p>
          <Link
            to={sub ? `/category/${type}/${sub}` : `/category/${type}`}
            className="mt-8 inline-flex rounded-full bg-[#480607] px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
          >
            Back To Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] px-4 py-8 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 text-xs uppercase tracking-[0.18em] text-stone-500">
          <Link to="/" className="hover:text-[#480607]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to={`/category/${enrichedProduct.category}`}
            className="hover:text-[#480607]"
          >
            {enrichedProduct.category}
          </Link>
          <span className="mx-2">/</span>
          <Link
            to={`/category/${enrichedProduct.category}/${enrichedProduct.subcategory}`}
            className="hover:text-[#480607]"
          >
            {enrichedProduct.subcategory}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#480607]">{enrichedProduct.name}</span>
        </div>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 lg:sticky lg:top-36 lg:self-start lg:grid-cols-[72px_minmax(0,1fr)]">
            <div className="flex flex-col gap-3">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden transition rounded-lg luxury-frame luxury-frame--sm ${getFrameVariant(enrichedProduct.category)} ${
                    selectedImage === index
                      ? "ring-2 ring-maroon shadow-md scale-105"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="luxury-frame__inner">
                    <img
                      src={image}
                      alt={`${enrichedProduct.name} thumbnail ${index + 1}`}
                      className="object-cover object-center w-full h-14 lg:h-16"
                      onError={(event) => {
                        (event.target as HTMLImageElement).src =
                          "https://via.placeholder.com/300x300?text=Jewellery";
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>

            <div
              className={`overflow-hidden bg-white rounded-2xl shadow-xl luxury-frame ${getFrameVariant(enrichedProduct.category)}`}
            >
              <div className="luxury-frame__inner">
                <img
                  src={galleryImages[selectedImage] || enrichedProduct.image}
                  alt={enrichedProduct.name}
                  className="product-main-image-zoom object-cover object-[50%_42%] w-full h-auto max-h-[600px]"
                  onError={(event) => {
                    (event.target as HTMLImageElement).src =
                      "https://via.placeholder.com/1200x1200?text=Jewellery+Showcase";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <h1 className="font-cinzel text-3xl leading-tight text-[#1a1a1a] lg:text-5xl font-bold">
                  {enrichedProduct.name}
                </h1>

                <button
                  type="button"
                  onClick={handleWishlistToggle}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-maroon/20 text-maroon shadow-md hover:shadow-lg hover:border-maroon/50 hover:bg-maroon/[0.02] transition-all group shrink-0 mt-1"
                  aria-label={
                    isInWishlist(enrichedProduct.id)
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"
                  }
                  title={
                    isInWishlist(enrichedProduct.id)
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"
                  }
                >
                  <Heart
                    size={24}
                    className={`transition-all duration-300 ${
                      isInWishlist(enrichedProduct.id)
                        ? "fill-maroon scale-110"
                        : "group-hover:scale-110 text-maroon/40 group-hover:text-maroon"
                    }`}
                  />
                </button>
              </div>

              <div className="mt-2 border-b border-stone-200 pb-8">
<<<<<<< HEAD
                <p className="text-3xl text-maroon lg:text-[40px] font-bold font-aurora flex items-start gap-[1px]">
                  {formatEstimatedCurrency(enrichedProduct.price)}<sup className="text-[0.9em] mt-1">*</sup>
=======
                <p className="text-3xl text-maroon lg:text-[40px] font-bold font-aurora inline-flex items-start leading-none">
                  {formatEstimatedCurrency(enrichedProduct.price)}
                  <sup className="-ml-px text-[0.52em] leading-none">*</sup>
>>>>>>> bb0c77bf08c2a26a1becfa85e7fb44ebc412d2f5
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <p className="rounded-md border-l-2 border-maroon/60 bg-maroon/4 px-3 py-2 text-[13px] font-semibold text-maroon/90">
                    <span className="font-bold">Note:</span> This is an
                    estimated price, actual price may differ as per actual
                    weights.
                  </p>
                  <p className="text-sm text-stone-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Exclusive of all taxes
                  </p>
                </div>
              </div>



              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                <div className="space-y-4">
                  <h3 className="text-[12px] font-bold text-stone-400 uppercase tracking-[0.2em]">
                    Excludes
                  </h3>
                  <ul className="space-y-3 pl-1 text-[14px] text-stone-600 leading-relaxed font-medium">
                    <li className="flex gap-3">
                      <span className="text-maroon">✦</span>
                      Chains and secondary items shown in the display are for
                      representative purposes only.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-maroon">✦</span>
                      This product purchase does not include any additional
                      jewellery pieces or props shown.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[12px] font-bold text-stone-400 uppercase tracking-[0.2em]">
                    Jewellery Care
                  </h3>
                  <ul className="space-y-3 pl-1 text-[14px] text-stone-600 leading-relaxed font-medium">
                    <li className="flex gap-3">
                      <span className="text-maroon">✦</span>
                      Avoid exposure to water and harsh chemicals.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-maroon">✦</span>
                      Clean gently with a soft cloth after use.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-maroon">✦</span>
                      Store separately to maintain finish.
                    </li>
                  </ul>
                </div>
              </div>

              <section className="mt-12 bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
                <div className="border-b border-stone-100">
                  <button
                    type="button"
                    className={accordionTitleClass}
                    onClick={() =>
                      setOpenPanels((prev) => ({
                        ...prev,
                        productDetails: !prev.productDetails,
                      }))
                    }
                  >
                    <span className={accordionHeadingClass}>
                      Product Details
                    </span>
                    <div className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center group-hover:bg-maroon/10 transition-all">
                      <ChevronDown
                        size={18}
                        className={`text-maroon transition-transform duration-300 ${openPanels.productDetails ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {openPanels.productDetails && (
                    <div className="grid grid-cols-2 divide-x divide-stone-100 bg-maroon/[0.01]">
                      <div className="px-6 py-8 text-center">
                        <div className="w-12 h-12 rounded-full bg-maroon/5 flex items-center justify-center mx-auto mb-4">
                          <Scale
                            size={20}
                            className="text-maroon"
                            strokeWidth={1.5}
                          />
                        </div>
                        <p className="text-[13px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                          Total Weight
                        </p>
                        <p className="text-2xl font-aurora font-bold text-maroon">
                          {formattedGrossWeight}g
                        </p>
                      </div>
                      <div className="px-6 py-8 text-center">
                        <div className="w-12 h-12 rounded-full bg-maroon/5 flex items-center justify-center mx-auto mb-4">
                          <Gem
                            size={20}
                            className="text-maroon"
                            strokeWidth={1.5}
                          />
                        </div>
                        <p className="text-[13px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                          22K {enrichedProduct.category}
                        </p>
                        <p className="text-2xl font-aurora font-bold text-maroon">
                          {formattedMetalWeight}g
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-b border-stone-100">
                  <button
                    type="button"
                    className={accordionTitleClass}
                    onClick={() =>
                      setOpenPanels((prev) => ({
                        ...prev,
                        priceBreakup: !prev.priceBreakup,
                      }))
                    }
                  >
                    <span className={accordionHeadingClass}>Price Breakup</span>
                    <div className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center group-hover:bg-maroon/10 transition-all">
                      <ChevronDown
                        size={18}
                        className={`text-maroon transition-transform duration-300 ${openPanels.priceBreakup ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {openPanels.priceBreakup && (
                    <div className="px-8 pt-6 pb-8 bg-stone-50/50">
                      <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
                        <table className="w-full text-sm text-[#3a342e]">
                          <tbody>
                            <tr className="border-b border-stone-50">
                              <td className="px-6 py-4 font-medium">
                                {enrichedProduct.category} ({estimatedWeight}g)
                              </td>
                              <td className="px-6 py-4 text-right font-aurora">
                                <span className="flex items-start justify-end gap-[1px]">
                                  {formatEstimatedCurrency(
                                    enrichedProduct.price - makingCharge,
<<<<<<< HEAD
                                  )}<sup className="text-[0.8em] mt-1">*</sup>
=======
                                  )}
                                  <sup className="text-[0.6em]">*</sup>
>>>>>>> bb0c77bf08c2a26a1becfa85e7fb44ebc412d2f5
                                </span>
                              </td>
                            </tr>
                            <tr className="border-b border-stone-50">
                              <td className="px-6 py-4 font-medium">
                                Making Charges
                              </td>
                              <td className="px-6 py-4 text-right font-aurora">
<<<<<<< HEAD
                                <span className="flex items-start justify-end gap-[1px]">
                                  {formatEstimatedCurrency(makingCharge)}<sup className="text-[0.8em] mt-1">*</sup>
=======
                                <span className="flex items-start justify-end">
                                  {formatEstimatedCurrency(makingCharge)}
                                  <sup className="text-[0.6em]">*</sup>
>>>>>>> bb0c77bf08c2a26a1becfa85e7fb44ebc412d2f5
                                </span>
                              </td>
                            </tr>
                            <tr className="bg-maroon/[0.02]">
                              <td className="px-6 py-5 font-bold text-maroon text-base">
                                Total Amount
                              </td>
                              <td className="px-6 py-5 font-bold text-maroon text-right text-lg font-aurora">
<<<<<<< HEAD
                                <span className="flex items-start justify-end gap-[1px] text-lg">
                                  {formatEstimatedCurrency(enrichedProduct.price)}<sup className="text-[0.8em] mt-1">*</sup>
=======
                                <span className="flex items-start justify-end text-lg">
                                  {formatEstimatedCurrency(
                                    enrichedProduct.price,
                                  )}
                                  <sup className="text-[0.6em]">*</sup>
>>>>>>> bb0c77bf08c2a26a1becfa85e7fb44ebc412d2f5
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-4 text-[11px] text-stone-400 italic text-center">
                        * Final price may vary based on gold rate at time of
                        purchase and actual weights.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-b border-stone-100">
                  <button
                    type="button"
                    className={accordionTitleClass}
                    onClick={() =>
                      setOpenPanels((prev) => ({
                        ...prev,
                        shippingInfo: !prev.shippingInfo,
                      }))
                    }
                  >
                    <span className={accordionHeadingClass}>
                      Shipping Information
                    </span>
                    <div className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center group-hover:bg-maroon/10 transition-all">
                      <ChevronDown
                        size={18}
                        className={`text-maroon transition-transform duration-300 ${openPanels.shippingInfo ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {openPanels.shippingInfo && (
                    <div className="px-8 pb-10 pt-8 text-[15px] leading-8 text-stone-600 bg-stone-50/30">
                      <ul className="space-y-4">
                        <li className="flex gap-4">
                          <span className="w-6 h-6 rounded-full bg-maroon/5 flex items-center justify-center text-[10px] text-maroon font-bold flex-shrink-0 mt-1">
                            1
                          </span>
                          <div>
                            <span className="font-bold text-stone-800">
                              Shipping Coverage:
                            </span>{" "}
                            We currently ship only within India.
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <span className="w-6 h-6 rounded-full bg-maroon/5 flex items-center justify-center text-[10px] text-maroon font-bold flex-shrink-0 mt-1">
                            2
                          </span>
                          <div>
                            <span className="font-bold text-stone-800">
                              Delivery Time:
                            </span>{" "}
                            Orders are usually processed within 2-5 business
                            days.
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <span className="w-6 h-6 rounded-full bg-maroon/5 flex items-center justify-center text-[10px] text-maroon font-bold flex-shrink-0 mt-1">
                            3
                          </span>
                          <div>
                            <span className="font-bold text-stone-800">
                              Shipping Partners:
                            </span>{" "}
                            We partner with reliable courier services for
                            insured delivery.
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

               
              </section>

              <div className="pt-8 flex justify-center">
                <Link
                  to={`/category/${enrichedProduct.category}/${enrichedProduct.subcategory}`}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-maroon/20 text-maroon font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-maroon hover:text-white transition-all shadow-sm hover:shadow-maroon/20 group"
                >
                  <ChevronDown
                    className="rotate-90 group-hover:-translate-x-1 transition-transform"
                    size={16}
                  />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-cinzel text-2xl uppercase text-[#480607] lg:text-3xl">
              Similar Designs
            </h2>
            <div className="grid grid-cols-2 gap-6 mt-8 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={buildProductPath(item)}
                  className={`overflow-hidden bg-white group rounded-2xl luxury-frame ${getFrameVariant(item.category)} transition-transform hover:-translate-y-1`}
                >
                  <div className="luxury-frame__inner">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full transition-transform duration-500 h-52 group-hover:scale-105"
                    />
                    <div className="p-4 bg-white border-t border-stone-100 flex justify-between items-center">
                      <div className="overflow-hidden pr-2">
                        <p className="text-[13px] font-bold text-stone-800 truncate italic">
                          {item.name}
                        </p>
                        <p className="text-[11px] uppercase tracking-widest text-maroon font-bold mt-1 opacity-70">
                          View Details
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[14px] font-aurora font-bold text-maroon whitespace-nowrap">
                          {formatEstimatedCurrency(item.price)}<sup className="text-[0.8em] ml-[1px]">*</sup>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
