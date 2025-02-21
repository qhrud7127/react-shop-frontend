import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { useParams } from '../../routes/hooks';
import { useGetProduct } from '../../action/product';
import { ProductEditView } from '../../sections/product/view/product-edit-view';

// ----------------------------------------------------------------------

const metadata = { title: `상품 편집 - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();
  const { product } = useGetProduct(id);
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductEditView product={product} />
    </>
  );
}
