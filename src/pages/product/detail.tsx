import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import {ProductDetailView} from "../../sections/product/product-detail-view";



// ----------------------------------------------------------------------

const metadata = { title: `Detail - ${CONFIG.appName}` };

export const sampleProduct = {
  id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
  gender: ["Kids"],
  images: [
    "https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-1.webp",
    "https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-2.webp",
    "https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-3.webp",
    "https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-4.webp",
    "https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-5.webp",
    "https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-6.webp",
    "https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-7.webp",
    "https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-8.webp",
  ],
  reviews: [
    {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
      name: "Jayvion Simon",
      postedAt: "2025-02-18T00:05:47+00:00",
      comment:
        "The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.",
      isPurchased: true,
      rating: 4.2,
      avatarUrl: "https://api-dev-minimal-v630.pages.dev/assets/images/avatar/avatar-1.webp",
      helpful: 9911,
      attachments: [],
    },
    {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
      name: "Lucian Obrien",
      postedAt: "2025-02-16T23:05:47+00:00",
      comment: "She eagerly opened the gift, her eyes sparkling with excitement.",
      isPurchased: true,
      rating: 3.7,
      avatarUrl: "https://api-dev-minimal-v630.pages.dev/assets/images/avatar/avatar-2.webp",
      helpful: 1947,
      attachments: [
        "https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-1.webp",
      ],
    },
  ],
  publish: "draft",
  ratings: [
    { name: "1 Star", starCount: 9911, reviewCount: 1947 },
    { name: "2 Star", starCount: 1947, reviewCount: 9124 },
    { name: "3 Star", starCount: 9124, reviewCount: 6984 },
    { name: "4 Star", starCount: 6984, reviewCount: 8488 },
    { name: "5 Star", starCount: 8488, reviewCount: 2034 },
  ],
  category: "Accessories",
  available: 0,
  priceSale: 83.74,
  taxes: 10,
  quantity: 80,
  inventoryType: "out of stock",
  tags: ["Technology", "Health and Wellness", "Travel", "Finance", "Education"],
  code: "38BEE270",
  description: `
    <h6>Specifications</h6>
    <table>
      <tbody>
        <tr><td>Category</td><td>Mobile</td></tr>
        <tr><td>Manufacturer</td><td>Apple</td></tr>
        <tr><td>Warranty</td><td>12 Months</td></tr>
        <tr><td>Serial number</td><td>358607726380311</td></tr>
        <tr><td>Ships from</td><td>United States</td></tr>
      </tbody>
    </table>
  `,
  sku: "WW75K5210YW/SV",
  createdAt: "2025-02-18T00:05:47+00:00",
  name: "Urban Explorer Sneakers",
  price: 83.74,
  coverUrl: "https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-1.webp",
  colors: ["#FF4842", "#1890FF"],
  totalRatings: 4.2,
  totalSold: 763,
  totalReviews: 1947,
  newLabel: { enabled: false, content: "NEW" },
  saleLabel: { enabled: false, content: "SALE" },
  sizes: ["6", "7", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
  subDescription:
    "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.",
};

export default function Page() {
    return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductDetailView product={sampleProduct}/>
    </>
  );
}
