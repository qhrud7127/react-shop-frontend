import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { useParams } from '../../routes/hooks';
import { useGetProduct } from '../../action/product';
import {ProductNewView} from "../../sections/product/view/product-new-view";

// ----------------------------------------------------------------------

const metadata = { title: `상품 편집 - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();
  const { product, productLoading, productError } = useGetProduct(id);
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductNewView product={product} loading={productLoading} error={productError} />
    </>
  );
}
