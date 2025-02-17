import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import {ProductDetailView} from "../../sections/product/product-detail-view";



// ----------------------------------------------------------------------

const metadata = { title: `Detail - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductDetailView />
    </>
  );
}
