import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const ORDER_STATUS_OPTIONS = [
  { value: 'pending', label: '주문완료' },
  { value: 'completed', label: '배송완료' },
  { value: 'cancelled', label: '취소완료' },
  { value: 'refunded', label: '환불완료' },
];

const ITEMS = Array.from({ length: 3 }, (_, index) => ({
  id: _mock.id(index),
  sku: `16H9UR${index}`,
  quantity: index + 1,
  name: _mock.productName(index),
  coverUrl: _mock.image.product(index),
  price: _mock.number.price(index),
}));

export const _orders = Array.from({ length: 20 }, (_, index) => {
  const shipping = 10;

  const discount = 10;

  const taxes = 10;

  const items = (index % 2 && ITEMS.slice(0, 1)) || (index % 3 && ITEMS.slice(1, 3)) || ITEMS;

  const totalQuantity = items.reduce((accumulator, item) => accumulator + item.quantity, 0);

  const subtotal = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

  const totalAmount = subtotal - shipping - discount + taxes;

  const customer = {
    id: _mock.id(index),
    name: _mock.fullName(index),
    email: _mock.email(index),
    avatarUrl: _mock.image.avatar(index),
    ipAddress: '192.158.1.38',
  };

  const delivery = { shipBy: '대한통운', speedy: '일반 배송', trackingNumber: '37739199373' };

  const history = {
    orderTime: _mock.time(5),
    paymentTime: _mock.time(3),
    deliveryTime: _mock.time(2),
    completionTime: _mock.time(1),
    timeline: [
      { title: '주문이 완료되었습니다.', time: _mock.time(5) },
      { title: '배송중(입고) 남서울 ', time: _mock.time(4) },
      { title: '배송중(출고) 남서울 ', time: _mock.time(3) },
      { title: '배달중', time: _mock.time(2) },
      { title: '배송이 완료되었습니다.', time: _mock.time(1) },
    ],
  };

  return {
    id: _mock.id(index),
    orderNumber: `#601${index}`,
    createdAt: _mock.time(index),
    taxes,
    items,
    history,
    subtotal,
    shipping,
    discount,
    customer,
    delivery,
    totalAmount,
    totalQuantity,
    shippingAddress: {
      fullAddress: '서울특별시 용산구 후암로 107',
      phoneNumber: '010-1231-4961',
    },
    payment: { cardType: 'kakaopay', cardNumber: '**** **** **** 5678' },
    status:
      (index % 2 && 'completed') ||
      (index % 3 && 'pending') ||
      (index % 4 && 'cancelled') ||
      'refunded',
  };
});
