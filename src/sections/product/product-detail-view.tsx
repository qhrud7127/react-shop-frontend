import type { Theme, SxProps } from '@mui/material/styles';

import Slider from 'react-slick';
import { useTabs } from 'minimal-shared';
import { varAlpha } from 'minimal-shared/utils';
import React, { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import { Card } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

import { DashboardContent } from 'src/layouts/dashboard';

import { paths } from '../../routes/paths';
import { Iconify } from '../../components/iconify';
import { RouterLink } from '../../routes/components';
import {useCheckoutContext} from "../checkout/context";
import { ProductDetailsSkeleton } from './product-skeleton';
import { EmptyContent } from '../../components/empty-content';
import { ProductDetailsReview } from './product-details-review';
import { ProductDetailsSummary } from './product-details-summary';
import { ProductDetailsDescription } from './product-details-description';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  product?: any;
  loading?: boolean;
  error?: any;
  sx?: SxProps<Theme>;
};

export function ProductDetailView({ title = '', sx, product, error, loading }: Props) {
  const tabs = useTabs('description');
  const [nav, setNav] = useState(undefined);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slider, setSlider] = useState<any>(null);
  const { state: checkoutState, onAddToCart } = useCheckoutContext();

  useEffect(() => {
    const getIcons = document.querySelectorAll('.slick-slide');
    console.log(getIcons);
    getIcons.forEach(function (iconEach) {
      const getIconAttr = iconEach.getAttribute('aria-hidden');
      if (!getIconAttr) {
        iconEach.setAttribute('aria-hidden', 'false');
      }
    });
    console.log(slider);
    console.log(nav);
    setNav(slider);
  }, [slider]);

  const [publish, setPublish] = useState('');

  useEffect(() => {
    if (product) {
      setPublish(product?.publish);
    }
  }, [product]);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  if (loading) {
    return (
      <DashboardContent sx={{ pt: 5 }}>
        <ProductDetailsSkeleton />
      </DashboardContent>
    );
  }

  const settings = {
    onReInit: () => setCurrentSlide(slider?.innerSlider.state.currentSlide),
    asNavFor: '.slider-nav',
    focusOnSelect: true,
    infinite: true,
    // autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (error) {
    return (
      <DashboardContent sx={{ pt: 5 }}>
        <EmptyContent
          filled
          title="Product not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Back to list
            </Button>
          }
          sx={{ py: 10, height: 'auto', flexGrow: 'unset' }}
        />
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid size={{ xs: 12, md: 6, lg: 7 }}>
          <Slider {...settings} asNavFor={nav} ref={(s) => setSlider(s)}>
            {product?.images.map((image: string, i: number) => (
              <img key={i} width="100%" src={image} alt="sample" loading="lazy" />
            ))}
          </Slider>
          <div className="thumb-wrapper">
            {product?.images.map((image: string, idx: number) => (
              <div
                key={idx}
                className={currentSlide === idx ? 'active' : ''}
                onClick={() => {
                  slider?.slickGoTo(idx);
                }}
              >
                <img src={image} alt="item.alt" />
                {currentSlide}
              </div>
            ))}
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          {product && (
            <ProductDetailsSummary
              disableActions={!product?.available}
              product={product}
              items={checkoutState.items}
              onAddToCart={onAddToCart}
            />
          )}
        </Grid>
      </Grid>
      <Card>
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={[
            (theme) => ({
              px: 3,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }),
          ]}
        >
          {[
            { value: 'description', label: '상품 상세' },
            { value: 'reviews', label: `리뷰 (${product?.reviews.length})` },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {tabs.value === 'description' && (
          <ProductDetailsDescription description={product?.description ?? ''} />
        )}

        {tabs.value === 'reviews' && (
          <ProductDetailsReview
            ratings={product?.ratings ?? []}
            reviews={product?.reviews ?? []}
            totalRatings={product?.totalRatings ?? 0}
            totalReviews={product?.totalReviews ?? 0}
          />
        )}
      </Card>
    </DashboardContent>
  );
}
