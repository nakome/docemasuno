import React from "react";
import { Container } from '@mantine/core';
import { Base } from 'deta';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs locales
import 'dayjs/locale/es'
import 'dayjs/locale/de'
import 'dayjs/locale/gl'

// App settings
import AppSettings from "../config/AppSettings";

// Components
import CardViews from "../components/CardViews";

/**
 * Home
 * @param {object} params
 */
export default function Home({ params }) {

  // Pagination
  const dataPerClick = AppSettings.pagination;
  // Data
  const [data, setData] = React.useState([]);
  // Alert state when not show data
  const [showAlert, setShowAlert] = React.useState(false);
  // Limit
  const [limit, setLimit] = React.useState(dataPerClick);
  // Btn loader
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
    try {
      let query = {}
      const response = await Db.fetch(query,{limit: lmt})
      if (response.count > 0) setData(response);
      else setShowAlert(true)
      setLoadingMore(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (<Container fluid>
      <CardViews showAlert={showAlert} pag={limit} loadingMore={loadingMore} loadMore={loadMore} data={data} />
  </Container>)
}