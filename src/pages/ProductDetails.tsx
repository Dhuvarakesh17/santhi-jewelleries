import { useMemo, useState } from "react";
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

const formatCurrency = (value: number) => `₹ ${value.toLocaleString("en-IN")}`;
const formatEstimatedCurrency = (value: number) =>
  `*${formatCurrency(value)}`;

const accordionTitleClass =
  "flex w-full items-center justify-between border-b border-[#d87630] px-4 py-4 text-center";

const accordionHeadingClass =
  "w-full text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3a342e]";

const ProductDetails = () => {
  const { type, sub, id } = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist, openWishlist } =
    useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [openPanels, setOpenPanels] = useState({
    productDetails: true,
    priceBreakup: true,
    shippingInfo: true,
    askQuestion: true,
  });

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
    return JEWELLERY_DATA.filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category &&
        item.subcategory === product.subcategory,
    ).slice(0, 4);
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

    const similarImages = JEWELLERY_DATA.filter(
      (item) =>
        item.category === product.category &&
        item.subcategory === product.subcategory &&
        item.id !== product.id,
    )
      .slice(0, 4)
      .map((item) => item.image);

    return [product.image, ...similarImages];
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
          <h1 className="font-cinzel text-3xl text-[#5B0E23]">
            Product not found
          </h1>
          <p className="mt-4 text-stone-600">
            This item is not available now. Please explore the collection.
          </p>
          <Link
            to={sub ? `/category/${type}/${sub}` : `/category/${type}`}
            className="mt-8 inline-flex rounded-full bg-[#5B0E23] px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
          >
            Back To Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f2f2f2] px-4 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-420">
        <div className="mb-6 text-xs uppercase tracking-[0.18em] text-stone-500">
          <Link to="/" className="hover:text-[#5B0E23]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to={`/category/${enrichedProduct.category}`}
            className="hover:text-[#5B0E23]"
          >
            {enrichedProduct.category}
          </Link>
          <span className="mx-2">/</span>
          <Link
            to={`/category/${enrichedProduct.category}/${enrichedProduct.subcategory}`}
            className="hover:text-[#5B0E23]"
          >
            {enrichedProduct.subcategory}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#5B0E23]">{enrichedProduct.name}</span>
        </div>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 lg:sticky lg:top-24 lg:self-start lg:grid-cols-[84px_minmax(0,1fr)]">
            <div className="flex flex-col gap-4">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden border bg-white transition ${
                    selectedImage === index
                      ? "border-black shadow-sm"
                      : "border-stone-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${enrichedProduct.name} thumbnail ${index + 1}`}
                    className="object-cover object-center w-full h-16 lg:h-20"
                    onError={(event) => {
                      (event.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x300?text=Jewellery";
                    }}
                  />
                </button>
              ))}
            </div>

            <div className="overflow-hidden bg-white">
              <img
                src={galleryImages[selectedImage] || enrichedProduct.image}
                alt={enrichedProduct.name}
                className="product-main-image-zoom object-cover object-[50%_42%] w-full h-full max-h-165"
                onError={(event) => {
                  (event.target as HTMLImageElement).src =
                    "https://via.placeholder.com/1200x1200?text=Jewellery+Showcase";
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-cinzel text-2xl leading-tight text-[#171717] lg:text-3xl">
                {enrichedProduct.name}
              </h1>

              <div className="mt-6 border-b border-[#d9a174] pb-5">
                <p className="text-2xl text-[#d06f2e] lg:text-[28px]">
                  *Rs.{enrichedProduct.price.toLocaleString("en-IN")}
                </p>
                <p className="text-sm text-[#3a342e]">
                  Shipping calculated at checkout.
                </p>
                <p className="mt-1.5 text-sm font-bold text-[#3a342e]">
                  *This is an estimated price, actual price may differ as per actual weights.
                </p>
              </div>

              <button
                type="button"
                onClick={handleWishlistToggle}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#5B0E23]"
              >
                <Heart
                  size={16}
                  className={
                    isInWishlist(enrichedProduct.id) ? "fill-[#5B0E23]" : ""
                  }
                />
                {isInWishlist(enrichedProduct.id)
                  ? "Wishlisted"
                  : "Add To Wishlist"}
              </button>

              <h3 className="mt-7 text-2xl font-semibold text-[#121212] lg:text-[26px]">
                Description:
              </h3>
              <p className="mt-2.5 text-base leading-[1.6] text-[#1f1f1f] lg:text-[15px]">
                {enrichedProduct.description}
              </p>

              <h3 className="mt-7 text-2xl font-semibold text-[#121212] lg:text-[26px]">
                Styling Tips:
              </h3>
              <ul className="mt-2.5 list-disc space-y-2 pl-6 text-base leading-[1.6] text-[#1f1f1f] lg:text-[15px]">
                <li>
                  Pair with matching chains for a complete traditional styling
                  look.
                </li>
                <li>Style with ethnic outfits for festive occasions.</li>
              </ul>

              <h3 className="mt-7 text-2xl font-semibold text-[#121212] lg:text-[26px]">
                Jewellery Care:
              </h3>
              <ul className="mt-2.5 list-disc space-y-2 pl-6 text-base leading-[1.6] text-[#1f1f1f] lg:text-[15px]">
                <li>Avoid exposure to water and harsh chemicals.</li>
                <li>Clean gently using a soft cloth after every use.</li>
                <li>Store separately to maintain detailed finish.</li>
              </ul>

              <section className="mt-8 overflow-hidden border border-[#d87630] bg-[#f7f7f5]">
                <div className="border-b border-[#d87630]">
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
                    <ChevronDown
                      size={16}
                      className={`text-[#3a342e] transition-transform ${openPanels.productDetails ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openPanels.productDetails && (
                    <div className="grid grid-cols-1 divide-y divide-[#d87630] md:grid-cols-2 md:divide-x md:divide-y-0">
                      <div className="px-4 py-4 text-center">
                        <Scale
                          size={18}
                          className="mx-auto mb-1.5 text-[#3a342e]"
                          strokeWidth={1.75}
                        />
                        <p className="text-[18px] font-medium text-[#3a342e]">
                          Total Weight
                        </p>
                        <p className="mt-0.5 text-[22px] font-semibold text-[#2a2520]">
                          {formattedGrossWeight} Grams
                        </p>
                        <p className="mt-0.5 text-[13px] text-[#9a928a]">
                          Approx. Gross Weight
                        </p>
                      </div>
                      <div className="px-4 py-4 text-center">
                        <Gem
                          size={18}
                          className="mx-auto mb-1.5 text-[#3a342e]"
                          strokeWidth={1.75}
                        />
                        <p className="text-[18px] font-medium text-[#3a342e]">
                          22K {enrichedProduct.category}
                        </p>
                        <p className="mt-0.5 text-[22px] font-semibold text-[#2a2520]">
                          {formattedMetalWeight} Grams
                        </p>
                        <p className="mt-0.5 text-[13px] text-[#9a928a]">
                          Approx. Metal Weight
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-b border-[#d87630]">
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
                    <ChevronDown
                      size={16}
                      className={`text-[#3a342e] transition-transform ${openPanels.priceBreakup ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openPanels.priceBreakup && (
                    <div className="px-4 pt-3 pb-4">
                      <table className="w-full border border-[#d87630] text-sm text-[#3a342e]">
                        <tbody>
                          <tr className="border-b border-[#d87630]">
                            <td className="border-r border-[#d87630] px-3 py-2">
                              {enrichedProduct.category} ({estimatedWeight}g)
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatEstimatedCurrency(
                                enrichedProduct.price - makingCharge,
                              )}
                            </td>
                          </tr>
                          <tr className="border-b border-[#d87630]">
                            <td className="border-r border-[#d87630] px-3 py-2">
                              Making Charges
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatEstimatedCurrency(makingCharge)}
                            </td>
                          </tr>
                          <tr>
                            <td className="border-r border-[#d87630] px-3 py-2 font-semibold">
                              Total
                            </td>
                            <td className="px-3 py-2 font-semibold text-right">
                              {formatEstimatedCurrency(enrichedProduct.price)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="mt-2 text-[12px] text-[#5b524b]">
                        *This is an estimated price, actual price may differ as
                        per actual weights.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-b border-[#d87630]">
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
                    <ChevronDown
                      size={16}
                      className={`text-[#3a342e] transition-transform ${openPanels.shippingInfo ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openPanels.shippingInfo && (
                    <div className="px-6 pb-6 pt-5 text-[14px] leading-7 text-[#3a342e]">
                      <ul className="pl-5 space-y-3 list-disc">
                        <li>
                          <span className="font-semibold">
                            Shipping Coverage:
                          </span>{" "}
                          We currently ship only within India.
                        </li>
                        <li>
                          <span className="font-semibold">Delivery Time:</span>{" "}
                          Orders are usually processed and shipped within 2-5
                          business days.
                        </li>
                        <li>
                          <span className="font-semibold">
                            Shipping Charges:
                          </span>{" "}
                          Calculated during checkout based on delivery address.
                        </li>
                        <li>
                          <span className="font-semibold">
                            Shipping Partners:
                          </span>{" "}
                          We partner with reliable courier services for safe
                          delivery.
                        </li>
                        <li>
                          <span className="font-semibold">
                            Delivery Issues:
                          </span>{" "}
                          Contact customer support for any delay or issue.
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    className={accordionTitleClass}
                    onClick={() =>
                      setOpenPanels((prev) => ({
                        ...prev,
                        askQuestion: !prev.askQuestion,
                      }))
                    }
                  >
                    <span className={accordionHeadingClass}>
                      Ask A Question
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#3a342e] transition-transform ${openPanels.askQuestion ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openPanels.askQuestion && (
                    <form
                      className="px-4 pt-5 pb-8 space-y-5"
                      onSubmit={(event) => event.preventDefault()}
                    >
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5f574f]">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full border border-[#d87630] bg-white px-3 py-2.5 text-sm text-[#3a342e] outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5f574f]">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full border border-[#d87630] bg-white px-3 py-2.5 text-sm text-[#3a342e] outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5f574f]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full border border-[#d87630] bg-white px-3 py-2.5 text-sm text-[#3a342e] outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5f574f]">
                          Message
                        </label>
                        <textarea
                          rows={5}
                          className="w-full resize-y border border-[#d87630] bg-white px-3 py-2.5 text-sm text-[#3a342e] outline-none"
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="rounded-full bg-[#6b0f37] px-9 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white"
                        >
                          Send
                        </button>
                      </div>
                      <p className="text-center text-[11px] text-[#7f756d]">
                        This site is protected by hCaptcha and the hCaptcha
                        Privacy Policy and Terms of Service apply.
                      </p>
                    </form>
                  )}
                </div>
              </section>

              <div className="pt-2">
                <Link
                  to={`/category/${enrichedProduct.category}/${enrichedProduct.subcategory}`}
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5B0E23]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-cinzel text-2xl uppercase text-[#5B0E23] lg:text-3xl">
              Similar Designs
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-6 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={buildProductPath(item)}
                  className="overflow-hidden bg-white border group rounded-2xl border-stone-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full transition-transform duration-500 h-52 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <p className="text-sm font-semibold text-stone-800 line-clamp-2">
                      {item.name}
                    </p>
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
