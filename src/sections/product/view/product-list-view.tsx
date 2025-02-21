import React from 'react';

import Button from '@mui/material/Button';

import { DashboardContent } from 'src/layouts/dashboard';

import { paths } from '../../../routes/paths';
import { ProductList } from '../product-list';
import { useRouter } from '../../../routes/hooks';
import { Iconify } from '../../../components/iconify';
import { RouterLink } from '../../../routes/components';
import { useGetProducts } from '../../../action/product';
import { EmptyContent } from '../../../components/empty-content';
import { CustomBreadcrumbs } from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
};

export function ProductListView({ title = '' }: Props) {
  const { products, productsLoading } = useGetProducts();
  const productsEmpty = !productsLoading && !products.length;
  const router = useRouter();

  const renderNotFound = () => <EmptyContent filled sx={{ py: 10 }} />;

  const manageProduct = () => {
    router.push(paths.product.list.manage);
  };

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading={title}
        links={[{ name: '홈', href: paths.dashboard.root }, { name: '상품' }, { name: '베스트' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button
            component={RouterLink}
            href={paths.product.list.manage}
            variant="contained"
            startIcon={<Iconify icon="mingcute:pencil-line" />}
          >
            상품 관리
          </Button>
        }
      />

      {productsEmpty && renderNotFound()}

      <ProductList products={products} loading={productsLoading} />
    </DashboardContent>
  );
}
