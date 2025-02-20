import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { useParams } from '../../routes/hooks';
import { useGetProduct } from '../../action/product';
import { ProductDetailView } from '../../sections/product/view/product-detail-view';

// ----------------------------------------------------------------------

const metadata = { title: `Detail - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();
  const { product, productLoading, productError } = useGetProduct(id);
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductDetailView product={product} loading={productLoading} error={productError} />
    </>
  );
}
