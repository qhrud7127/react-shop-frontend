import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import {ProductListView} from "../../sections/product/product-list-view";



// ----------------------------------------------------------------------

const metadata = { title: `List - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductListView title="베스트" />
    </>
  );
}
