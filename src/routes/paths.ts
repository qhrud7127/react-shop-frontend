// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  PRODUCT: '/product',
  MANAGE: '/manage',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
  // PRODUCT
  product: {
    root: `${ROOTS.PRODUCT}`,
    list: {
      root: `${ROOTS.PRODUCT}/list`,
      manage: `${ROOTS.PRODUCT}/list/manage`,
    },
    new: `${ROOTS.PRODUCT}/new`,
    details: (id: string) => `${ROOTS.PRODUCT}/detail/${id}`,
    edit: (id: string) => `${ROOTS.PRODUCT}/edit/${id}`,
    checkout: `${ROOTS.PRODUCT}/checkout`,
    order: {
      root: `${ROOTS.PRODUCT}/order`,
      list: `${ROOTS.PRODUCT}/order/list`,
      detail: (id: string) => `${ROOTS.PRODUCT}/order/detail/${id}`,
    },
  },
};
