import React from 'react';

import { DashboardContent } from 'src/layouts/dashboard';

import { paths } from '../../../routes/paths';
import {ProductNewEditForm} from "../../product-new-edit-form";
import { CustomBreadcrumbs } from '../../../components/custom-breadcrumbs';

import type { IProductItem } from '../../../types/product';

// ----------------------------------------------------------------------
type Props = {
  product?: IProductItem;
};

export function ProductEditView({ product }: Props) {
  return (
    <DashboardContent  maxWidth="xl">
      <CustomBreadcrumbs
        heading="상품 수정"
        backHref={paths.product.root}
        links={[
          { name: '홈', href: paths.dashboard.root },
          { name: '상품', href: paths.product.root },
          { name: product?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProductNewEditForm currentProduct={product} />
    </DashboardContent>
  );
}
