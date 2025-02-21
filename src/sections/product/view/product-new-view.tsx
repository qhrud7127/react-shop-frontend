import React from 'react';

import { paths } from '../../../routes/paths';
import { DashboardContent } from '../../../layouts/dashboard';
import { ProductNewEditForm } from '../../product-new-edit-form';
import {CustomBreadcrumbs} from "../../../components/custom-breadcrumbs";

// ----------------------------------------------------------------------

export const ProductNewView = () => (
  <DashboardContent maxWidth="xl">
    <CustomBreadcrumbs
      heading="상품 등록"
      links={[
        { name: '홈', href: paths.dashboard.root },
        { name: '상품', href: paths.product.root },
        { name: '상품 등록' },
      ]}
      sx={{ mb: { xs: 3, md: 5 } }}
    />
    <ProductNewEditForm />
  </DashboardContent>
);
