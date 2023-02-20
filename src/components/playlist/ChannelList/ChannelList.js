import { useState, useEffect } from "react";
import { View, VirtualizedList } from "react-native";
import { SearchBar, useTheme } from "@rneui/themed";

import ChannelListItem from "./ChannelListItem";

const getItemCount = (_data) => _data.length;

const getItem = (_data, index) => {
  return _data[index];
};

export function ChannelList({ dataset }) {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [datalist, setDatalist] = useState([]);

  useEffect(() => {
    setDatalist(dataset);
  }, [dataset]);

  const changeSearch = (text) => {
    setSearch(text);

    setDatalist(
      dataset.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View>
      <SearchBar
        onChangeText={changeSearch}
        value={search}
        lightTheme={true}
        containerStyle={{ backgroundColor: theme.colors.white }}
        inputContainerStyle={{ backgroundColor: theme.colors.white }}
      />
      <VirtualizedList
        style={{ marginBottom: 70 }}
        data={datalist}
        initialNumToRender={20}
        maxToRenderPerBatch={50}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
        renderItem={({ item }) => (
          <ChannelListItem
            id={item.id}
            name={item.name}
            url={item.url}
            group={item.group}
            logo={item.logo}
          />
        )}
      />
    </View>
  );
}
