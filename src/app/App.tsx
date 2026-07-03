import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const currencies = [
  "USD","EUR","GBP","AOA","BRL","ZAR","CAD","JPY","CNY","CHF"
];

export default function App() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const [modalVisible, setModalVisible] = useState(false);
  const [selecting, setSelecting] = useState<"from" | "to" | null>(null);

  const openPicker = (type: "from" | "to") => {
    setSelecting(type);
    setModalVisible(true);
  };

  const selectCurrency = (currency: string) => {
    if (selecting === "from") setFrom(currency);
    if (selecting === "to") setTo(currency);
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000" }}
      className="flex-1"
    >
      <StatusBar barStyle="light-content" translucent />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-black/50 justify-center px-6 pt-12">

          {/* HEADER */}
          <View className="mb-8 items-center">
            <Text className="text-white text-3xl font-black">
              GLOBAL CURRENCY
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              UI apenas (sem API ainda)
            </Text>
          </View>

          {/* CARD */}
          <View className="bg-white/10 border border-white/20 rounded-3xl p-6">

            {/* INPUT */}
            <Text className="text-gray-300 mb-2">Valor</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              className="bg-white/10 p-4 rounded-2xl text-white"
            />

            {/* FROM */}
            <Text className="text-gray-300 mt-4 mb-2">De</Text>
            <TouchableOpacity
              onPress={() => openPicker("from")}
              className="bg-white/10 p-4 rounded-2xl"
            >
              <Text className="text-white font-bold">{from}</Text>
            </TouchableOpacity>

            {/* TO */}
            <Text className="text-gray-300 mt-4 mb-2">Para</Text>
            <TouchableOpacity
              onPress={() => openPicker("to")}
              className="bg-white/10 p-4 rounded-2xl"
            >
              <Text className="text-white font-bold">{to}</Text>
            </TouchableOpacity>

            {/* BOTÃO (SEM FUNÇÃO AINDA) */}
            <TouchableOpacity className="bg-emerald-500 p-4 rounded-2xl mt-6">
              <Text className="text-white text-center font-bold">
                Converter Agora
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </TouchableWithoutFeedback>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-zinc-900 rounded-t-3xl p-6 max-h-[70%]">

            <Text className="text-white text-lg font-bold mb-4 text-center">
              Escolher Moeda
            </Text>

            <FlatList
              data={currencies}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => selectCurrency(item)}
                  className="p-4 border-b border-white/10"
                >
                  <Text className="text-white text-center">
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>

    </ImageBackground>
  );
}