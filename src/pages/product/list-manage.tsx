import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ProductListManageView } from '../../sections/product/view/product-list-manage-view';

// ----------------------------------------------------------------------

const metadata = { title: `상품 관리 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductListManageView/>
    </>
  );
}
