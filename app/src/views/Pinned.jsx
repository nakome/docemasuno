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
// App settings
import AppSettings from "../config/AppSettings";
// Components
import CardViews from "../components/CardViews";

/**
 * Pinned
 * @param {object} params
 */
export default function Pinned({ params }) {

  // Pagination
  const dataPerClick = AppSettings.pagination;
  // Data
  const [data, setData] = React.useState([]);
  // Alert state when not show data
  const [showAlert, setShowAlert] = React.useState(false);
  // limit
  const [limit, setLimit] = React.useState(dataPerClick);
  // Btn loader
  const [loadingMore, setLoadingMore] = React.useState(false);

  // Deta init
  const Db = Base('bins');

  // Extend dayjs
  dayjs.extend(relativeTime)

  React.useEffect(() => { loadInitialData(dataPerClick) }, [])

  // Load more
  const loadMore = () => {
    setLoadingMore(true);
    setLimit(prevLimit => prevLimit + dataPerClick);
    loadInitialData(limit + dataPerClick);
  };

  // Load initial data
  async function loadInitialData(lmt) {
    try {
      const query = { "pinned": true };
      const response = await Db.fetch(query);
      if (response.count > 0) {
        const data = await loadBin(response);
        setData(data);
        setLoadingMore(false);
      } else setShowAlert(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (<Container fluid>
      <CardViews showAlert={showAlert} pag={limit} loadingMore={loadingMore} loadMore={loadMore} data={data} />
  </Container>)
}