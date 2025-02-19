import React from 'react';

import { DashboardContent } from 'src/layouts/dashboard';

import { paths } from '../../../routes/paths';
import { ProductList } from '../product-list';
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

  const renderNotFound = () => <EmptyContent filled sx={{ py: 10 }} />;

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading={title}
        links={[{ name: '홈', href: paths.dashboard.root }, { name: '상품' }, { name: '베스트' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      {productsEmpty && renderNotFound()}

      <ProductList products={products} loading={productsLoading} />
    </DashboardContent>
  );
}
