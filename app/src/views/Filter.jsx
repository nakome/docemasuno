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

// AppSettings
import AppSettings from "../config/AppSettings";
// Components
import CardViews from "../components/CardViews";

/**
 * Filter
 * @param {object} params
 */
export default function Filter({ params }) {

  const dataPerClick = AppSettings.pagination;
  // Data
  const [data, setData] = React.useState([]);
  // Limit pagination
  const [limit, setLimit] = React.useState(dataPerClick);
  // Alert state when not show data
  const [showAlert, setShowAlert] = React.useState(false);
  // Load more btn
  const [loadingMore, setLoadingMore] = React.useState(false);
  // Init Deta
  const Db = Base('bins');
  // Extend dayjs
  dayjs.extend(relativeTime)

  React.useEffect(() => {
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
    else setShowAlert(true);
    setLoadingMore(false);
  }

  return (<Container fluid>
      <CardViews showAlert={showAlert} pag={limit} loadingMore={loadingMore} loadMore={loadMore} data={data} />
  </Container>)
}