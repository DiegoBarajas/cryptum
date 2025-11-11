import React, { useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ITEM_HEIGHT = 70;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const initialData = Array.from({ length: 8 }, (_, i) => ({
  id: `item-${i + 1}`,
  label: `Elemento ${i + 1}`,
}));

export default function DragList() {
  const [data, setData] = useState(initialData);
  const order = useRef(data.map((_, i) => i)).current;
  const positions = useRef(
    data.map((_, i) => new Animated.ValueXY({ x: 0, y: i * ITEM_HEIGHT }))
  ).current;

  const move = (from, to) => {
    const updated = [...order];
    const item = updated.splice(from, 1)[0];
    updated.splice(to, 0, item);
    order.splice(0, order.length, ...updated);
    setData(order.map((i) => initialData[i]));
  };

  const createPanResponder = (index) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        positions[index].setOffset({ x: 0, y: positions[index].y._value });
        positions[index].setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dy: positions[index].y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        const newIndex = Math.max(
          0,
          Math.min(
            data.length - 1,
            Math.floor((positions[index].y._value + index * ITEM_HEIGHT) / ITEM_HEIGHT)
          )
        );

        Animated.spring(positions[index], {
          toValue: { x: 0, y: newIndex * ITEM_HEIGHT },
          useNativeDriver: false,
        }).start();

        positions[index].flattenOffset();
        if (newIndex !== index) move(index, newIndex);
      },
    });

  return (
    <SafeAreaView style={styles.container}>
      {data.map((item, i) => (
        <Animated.View
          key={item.id}
          style={[
            styles.item,
            {
              transform: positions[i].getTranslateTransform(),
            },
          ]}
          {...createPanResponder(i).panHandlers}
        >
          <Text style={styles.text}>{item.label}</Text>
        </Animated.View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    paddingTop: 40,
  },
  item: {
    position: "absolute",
    width: "90%",
    height: ITEM_HEIGHT - 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginVertical: 4,
  },
  text: { fontSize: 16, fontWeight: "500" },
});
