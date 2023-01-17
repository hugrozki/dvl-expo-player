import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchBar, useTheme } from "@rneui/themed";

import { ChannelListItem } from "./ChannelListItem";

export function ChannelList({ dataset }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
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
      <FlatList
        data={datalist}
        renderItem={({ item }) => (
          <ChannelListItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
