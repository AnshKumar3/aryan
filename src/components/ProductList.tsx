import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  if (!categoryId) {
    throw new Error("categoryId is required but was not provided.");
  }

  if (!searchParams) {
    console.warn("searchParams is undefined. Default values will be used.");
  }

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );
  // .find();

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[60%] lg:w-[30%] transform transition-transform duration-300 hover:scale-105"
          key={product._id}
        >
          <div className="bg-[#1f3121] shadow-md rounded-lg  overflow-hidden p-5 transform transition-transform duration-300 hover:scale-110">
            <div className="relative  h-80">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover z-10 hover:opacity-0 transition-opacity ease duration-500"
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1]?.image?.url || "/product.png"}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <span className="font-medium">{product.name}</span>
                <span className="font-semibold">${product.price?.price}</span>
              </div>
              {product.additionalInfoSections && (
                <div
                  className="text-sm text-gray-500 mt-2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      product.additionalInfoSections.find(
                        (section: any) => section.title === "shortDesc"
                      )?.description || ""
                    ),
                  }}
                ></div>
              )}
              <button className="mt-4 rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
                Add to Cart
              </button>
            </div>
          </div>
        </Link>
      ))}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null}
    </div>
  );
};

export default ProductList;
