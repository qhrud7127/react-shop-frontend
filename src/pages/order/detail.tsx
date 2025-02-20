import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { _orders } from '../../_mock';
import { useParams } from '../../routes/hooks';
import { OrderDetailsView } from '../../sections/order/view/order-details-view';

// ----------------------------------------------------------------------

const metadata = { title: `Detail - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentOrder = _orders.find((order) => order.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrderDetailsView order={currentOrder} />
    </>
  );
}
