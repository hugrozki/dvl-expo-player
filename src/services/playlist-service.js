import parser from "iptv-playlist-parser";

export const channelsFromUrl = async (sourceUrl) => {
  try {
    const response = await fetch(sourceUrl);

    if (response.ok) {
      const responseContent = await response.text();
      const channelsData = parser.parse(responseContent);

      let index = 1;
      const channels = channelsData.items.reduce((result, channel) => {
        const { name, url, group, tvg } = channel;

        if (url) {
          const { title } = group;
          const groupTitle = title || "Uncategorized";
          result.push({
            id: index,
            name,
            url,
            group: groupTitle,
            logo: tvg.logo,
          });
          index++;
        }

        return result;
      }, []);

      return channels;
    }
  } catch (error) {
    return null;
  }
};
