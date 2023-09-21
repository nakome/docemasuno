import React from "react";
import { Container } from '@mantine/core';
import { Base } from 'deta';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
// Translations
import 'dayjs/locale/es'
import 'dayjs/locale/de'
import 'dayjs/locale/gl'

// Load data without content
import loadBin from "../utils/LoadBin";

// Components
import { Preloader } from "../components/Preloaders";

// AppSettins
import AppSettings from "../config/AppSettings";

// Card views lazy
const CardViews = React.lazy(() => import("../components/CardViews"))

/**
 * Filter
 * @param {object} params
 */
export default function Filter({ params }) {

  const dataPerClick = AppSettings.pagination;

  // Data
  const [data, setData] = React.useState([]);

  // Used for loader
  const [visible, setVisible] = React.useState(true);

  // Limit pagination
  const [limit, setLimit] = React.useState(dataPerClick);

  // Load more btn
  const [loadingMore, setLoadingMore] = React.useState(false);

  // Init Deta
  const Db = Base('bins');

  // Extend dayjs
  dayjs.extend(relativeTime)

  React.useEffect(() => {
    setVisible(true);
    loadInitialData(dataPerClick)
  }, [params])

  // Load more
  const loadMore = () => {
    setLoadingMore(true)
    setLimit(prevLimit => prevLimit + dataPerClick);
    loadInitialData(limit + dataPerClick);
  };

  // Capitalize
  const upper = name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  // Load initial data
  async function loadInitialData(lmt) {
    let queryVal = decodeURIComponent(params.name);
    let query = [
      { "title?contains": queryVal },
      { "title?contains": upper(queryVal) },
      { "title?pfx": queryVal },
      { "category?contains": queryVal },
      { "category?contains": upper(queryVal) },
      { "category?pfx": queryVal },
      { "lastModified?contains": queryVal },
      { "lastModified?pfx": queryVal }
    ]
    const response = await Db.fetch(query, { limit: lmt })
    if (response.count > 0) setData(await loadBin(response));
    setVisible(false);
    setLoadingMore(false)
  }

  return (<Container fluid>
    {!visible ? (<React.Suspense fallback={<Preloader/>}>
      <CardViews pag={limit} loadingMore={loadingMore} loadMore={loadMore} data={data} />
    </React.Suspense>) : (<Preloader/>)}
  </Container>)
}