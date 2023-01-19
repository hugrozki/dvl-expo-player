import { useState, useEffect } from "react";

import { channelsFromUrl } from "../../services/playlist-service";
import { NoContentView } from "../../components/shared";
import { ChannelList } from "../../components/playlist";

export function PlaylistDetailScreen({ route }) {
  const { itemUrl } = route.params;
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await channelsFromUrl(itemUrl);
      setChannels(response);
      setLoading(false);
    })();
  }, [itemUrl]);

  if (loading) return <NoContentView text="Cargando..." />;

  if (channels.length === 0)
    return <NoContentView text="No se encontraron canales." />;

  return <ChannelList dataset={channels} />;
}
