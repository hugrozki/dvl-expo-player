import React from "react";

import { NoContentView } from "../../components/shared";
import { ChannelList } from "../../components/playlist";

const DATA = [
  {
    id: 1,
    name: "ADN 40 (480p)",
    url: "https://mdstrm.com/live-stream-playlist/60b578b060947317de7b57ac.m3u8",
    group: "News",
    logo: "https://i.imgur.com/Og17U9N.png",
    favoriteId: 1,
  },
  {
    id: 2,
    name: "Baby TV (480p)",
    url: "http://okkotv-live.cdnvideo.ru/channel/BabyTV.m3u8",
    group: "Kids",
    logo: "https://i.imgur.com/fvVovnc.png",
    favoriteId: null,
  },
];

export function PlaylistDetailScreen({ route, navigation }) {
  const { itemUrl } = route.params;
  console.log("PlaylistDetailScreen itemUrl", itemUrl);

  if (DATA.length === 0)
    return <NoContentView text="No se encontraron canales." />;

  return <ChannelList dataset={DATA} />;
}
