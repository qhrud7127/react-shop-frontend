import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { OrderListView } from '../../sections/order/view/order-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `List - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrderListView />
    </>
  );
}
