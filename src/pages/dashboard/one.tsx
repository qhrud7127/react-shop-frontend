import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import {DashboardView} from "../../sections/dashboard/dashboard-view";


// ----------------------------------------------------------------------

const metadata = { title: `DnA mall | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardView title="Page one" />
    </>
  );
}
