import React from "react";
import { Container } from '@mantine/core';
import { Base } from 'deta';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
// Locales
import 'dayjs/locale/es'
import 'dayjs/locale/de'
import 'dayjs/locale/gl'
// Used for load data without content
import loadBin from "../utils/LoadBin";
// Preloader
import { Preloader } from "../components/Preloaders";
// App settings
import AppSettings from "../config/AppSettings";
// Cardviews lazy
const CardViews = React.lazy(() => import("../components/CardViews"))
/**
 * Share links view
 * @param {object} params
 */
export default function ShareLink({ params }) {
  // Pagination
  const dataPerClick = AppSettings.pagination;
  // Data state
  const [data, setData] = React.useState([]);
  // Limit
  const [limit, setLimit] = React.useState(dataPerClick);
  // Preloader
  const [visible, setVisible] = React.useState(true);
  // btn loaders
  const [loadingMore, setLoadingMore] = React.useState(false);
  // Init Deta
  const Db = Base('bins');
  // Extend dayjs
  dayjs.extend(relativeTime)

  React.useEffect(() => { loadInitialData(dataPerClick) }, [])

  // Load more
  const loadMore = () => {
    setLoadingMore(true)
    setLimit(prevLimit => prevLimit + dataPerClick);
    loadInitialData(limit + dataPerClick);
  };

  // Load initial data
  async function loadInitialData(lmt) {
    let query = {"published":true}
    const response = await Db.fetch(query)
    if (response.count > 0) setData(await loadBin(response));
    setLoadingMore(false);
    setVisible(false);
  }

  return (<Container fluid>
    {!visible ? (<React.Suspense fallback={null}>
      <CardViews pag={limit} loadingMore={loadingMore} loadMore={loadMore} data={data} />
    </React.Suspense>):(<Preloader/>)}
  </Container>)
}