import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * Overview
   */
  {
    items: [
      {
        title: '베스트',
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
        // info: <Label>v{CONFIG.appVersion}</Label>,
      },
      { title: '세일', path: paths.dashboard.two, icon: ICONS.ecommerce },
      { title: '신상', path: paths.dashboard.three, icon: ICONS.analytics },
      { title: '추천', path: paths.dashboard.group.root, icon: ICONS.analytics },

    ],
  },
  {
    items: [
      {
        title: '여성',
        path: paths.dashboard.group.root,
        icon: ICONS.user,
        children: [
          { title: '의류', path: paths.dashboard.group.root },
          { title: '가방', path: paths.dashboard.group.five },
          { title: '잡화', path: paths.dashboard.group.six },
        ],
      },
    ],
  },
];
