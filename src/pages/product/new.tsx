import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ProductNewView } from '../../sections/product/view/product-new-view';

// ----------------------------------------------------------------------

const metadata = { title: `상품 편집 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductNewView />
    </>
  );
}
