import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ProductDetailView } from '../../sections/product/product-detail-view';

// ----------------------------------------------------------------------

const metadata = { title: `Detail - ${CONFIG.appName}` };

export const sampleProduct = {
  id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
  gender: ['Men'],
  images: [
    'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-2.webp',
    'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-3.webp',
    'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-4.webp',
    'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-5.webp',
    'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-6.webp',
    'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-7.webp',
    'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-8.webp',
  ],
  reviews: [
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      name: '김보경',
      postedAt: '2025-02-18T00:05:47+00:00',
      comment: '발이 편하고 아주 좋아요.',
      isPurchased: true,
      rating: 4.2,
      avatarUrl: 'https://api-dev-minimal-v630.pages.dev/assets/images/avatar/avatar-1.webp',
      helpful: 9911,
      attachments: [],
    },
  ],
  publish: 'draft',
  ratings: [
    { name: '1 점', starCount: 9911, reviewCount: 1947 },
    { name: '2 점', starCount: 1947, reviewCount: 9124 },
    { name: '3 점', starCount: 9124, reviewCount: 6984 },
    { name: '4 점', starCount: 6984, reviewCount: 8488 },
    { name: '5 점', starCount: 8488, reviewCount: 2034 },
  ],
  category: 'Shose',
  available: 27,
  priceSale: 8500,
  taxes: 10,
  quantity: 80,
  inventoryType: 'in stock',
  tags: ['Technology', 'Health and Wellness', 'Travel', 'Finance', 'Education'],
  code: '38BEE270',
  description: `
   <h6>상품 상세</h6>
<ul>
  <li>
    <p>부드럽고 편안한 착용감을 제공하는 폼 삭라이너</p>
  </li>
  <li>
    <p>풀 탭</p>
  </li>
  <li>
    <p>개인 보호 장비(PPE)로 사용하기 위한 제품이 아닙니다.</p>
  </li>
  <li>
    <p>색상: 화이트/블랙/옥시즌 퍼플/액션 그레이프</p>
  </li>
  <li>
    <p>스타일: 921826-109</p>
  </li>
  <li>
    <p>제조국: 중국</p>
  </li>
</ul>

<h6>특징</h6>
<ul>
  <li>
    <p>상단부는 메쉬와 합성 소재로 제작되어 오리지널 감성을 유지하면서도 편안함과 내구성을 제공합니다.</p>
  </li>
  <li>
    <p>성능 러닝화를 위해 설계된 풀-길이 맥스 에어 유닛이 발 아래에 부드럽고 편안한 쿠셔닝을 제공합니다.</p>
  </li>
  <li>
    <p>폼 미드솔이 탄력 있고 부드러운 착용감을 선사합니다.</p>
  </li>
  <li>
    <p>고무 아웃솔이 접지력과 내구성을 향상시킵니다.</p>
  </li>
</ul>

<h6>배송 및 환불 정책</h6>
<p>200달러 이상 주문 시 무료 표준 배송을 제공합니다.</p>
<ul>
  <li>
    <p>표준 배송: 4~5 영업일 내 도착</p>
  </li>
  <li>
    <p>익스프레스 배송: 2~4 영업일 내 도착</p>
  </li>
</ul>
<p>주문은 월요일~금요일(공휴일 제외) 처리 및 배송됩니다.</p>
`,
  sku: 'WW75K5210YW/SV',
  createdAt: '2025-02-18T00:05:47+00:00',
  name: '코어클래식 OLD SKOOL 올드스쿨',
  price: 85000,
  coverUrl: 'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-1.webp',
  colors: ['#FF4842', '#1890FF'],
  totalRatings: 4.2,
  totalSold: 763,
  totalReviews: 1947,
  newLabel: { enabled: false, content: 'NEW' },
  saleLabel: { enabled: false, content: 'SALE' },
  sizes: ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
  subDescription:
    '올드 스쿨은 반스의 클래식한 스케이트 슈즈로, 반스의 아이콘으로 자리잡은 사이드 스트라이프를 처음으로 사용한 로우 탑과 레이스업의 윤곽을 가진 신발입니다. 내구성 강한 스웨이드와 캔버스 업퍼에, 패드가 가미된 신발 혀와 안감, 그리고 반스의 시그니쳐인 와플 아웃솔로 구성되어 있습니다. (굽 높이: 3cm)',
};

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductDetailView product={sampleProduct} />
    </>
  );
}
