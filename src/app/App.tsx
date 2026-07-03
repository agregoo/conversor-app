import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  FlatList,
  Pressable,
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "AOA",
  "BRL",
  "ZAR",
  "CAD",
  "JPY",
  "CNY",
  "CHF",
];

export default function App() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

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

  const API_KEY = "b8837d7a4da5fe054456c914";

const convertCurrency = async () => {
  setErrorText(null);
  setResult(null);

  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    setErrorText("Insere um valor válido.");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`
    );

    const rates = response?.data?.conversion_rates;

    if (!rates) {
      setErrorText("Não foi possível obter taxas.");
      return;
    }

    const rate = rates[to];

    if (!rate) {
      setErrorText("Moeda não suportada pela API.");
      return;
    }

    const converted = Number(amount) * rate;

    setResult(converted);

  } catch (error) {
    console.log("Erro na conversão:", error);
    setErrorText("Erro de conexão com servidor.");
  } finally {
    setLoading(false);
  }
};

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000' }} 
      className="flex-1"
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-black/50 justify-center px-6 pt-12">
          
          {/* Cabeçalho */}
          <View className="mb-8 items-center">
            <Text className="text-white text-3xl font-black tracking-wider text-center">
              CONVERSOR
            </Text>
            <Text className="text-gray-400 text-sm font-medium mt-1 text-center">
              Conversões globais com dados em tempo real
            </Text>
          </View>

          {/* Card Principal */}
          <View className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
            
            {/* Input de Valor */}
            <View className="mb-5">
              <Text className="text-xs text-gray-300 font-semibold mb-2 uppercase tracking-wide">
                Valor para converter
              </Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#9ca3af"
                className="bg-white/10 border border-white/10 text-white text-xl font-bold p-4 rounded-2xl"
              />
            </View>

            {/* Seletores */}
            <View className="flex-row justify-between mb-6 gap-4">
              <View className="flex-1">
                <Text className="text-xs text-gray-300 font-semibold mb-2 uppercase tracking-wide">
                  Origem
                </Text>
                <TouchableOpacity
                  onPress={() => openPicker("from")}
                  activeOpacity={0.7}
                  className="bg-white/10 border border-white/10 p-4 rounded-2xl items-center flex-row justify-center"
                >
                  <Text className="text-white text-lg font-black">{from}</Text>
                  <Text className="text-gray-400 text-xs ml-2">▼</Text>
                </TouchableOpacity>
              </View>

              <View className="justify-end pb-3">
                <Text className="text-gray-400 text-xl font-light">⇄</Text>
              </View>

              <View className="flex-1">
                <Text className="text-xs text-gray-300 font-semibold mb-2 uppercase tracking-wide">
                  Destino
                </Text>
                <TouchableOpacity
                  onPress={() => openPicker("to")}
                  activeOpacity={0.7}
                  className="bg-white/10 border border-white/10 p-4 rounded-2xl items-center flex-row justify-center"
                >
                  <Text className="text-white text-lg font-black">{to}</Text>
                  <Text className="text-gray-400 text-xs ml-2">▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Botão de Ação */}
            <TouchableOpacity
              onPress={convertCurrency}
              activeOpacity={0.8}
              className="bg-emerald-500 p-4 rounded-2xl items-center shadow-lg shadow-emerald-500/30"
            >
              <Text className="text-white text-lg font-bold tracking-wide">
                Converter Agora
              </Text>
            </TouchableOpacity>
          </View>

          {/* Indicador de Loading */}
          {loading && (
            <View className="mt-8 items-center">
              <ActivityIndicator size="large" color="#10b981" />
            </View>
          )}

          {/* Exibição de Erros */}
          {errorText && !loading && (
            <View className="mt-6 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl items-center">
              <Text className="text-red-400 text-sm font-medium text-center">
                {errorText}
              </Text>
            </View>
          )}

          {/* Card de Resultado */}
          {result !== null && result !== undefined && !loading && !errorText && (
            <View className="mt-6 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl items-center">
              <Text className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                Resultado Convertido
              </Text>
              <Text className="text-4xl font-black mt-2 text-emerald-400 tracking-tight">
                {Number(result).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {to}
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-zinc-900 rounded-t-[32px] p-6 max-h-[70%] border-t border-white/10 shadow-2xl">
            <View className="w-12 h-1 bg-gray-600 rounded-full align-self-center mb-6 self-center" />
            
            <Text className="text-white text-xl font-bold text-center mb-6">
              Selecione a Moeda
            </Text>

            <FlatList
              data={currencies}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => selectCurrency(item)}
                  activeOpacity={0.6}
                  className={`p-4 mb-2 rounded-xl flex-row justify-between items-center ${
                    (selecting === "from" && from === item) || (selecting === "to" && to === item)
                      ? "bg-emerald-500/20 border border-emerald-500/40" 
                      : "bg-white/5"
                  }`}
                >
                  <Text className="text-white text-lg font-semibold">
                    {item}
                  </Text>
                  {((selecting === "from" && from === item) || (selecting === "to" && to === item)) && (
                    <Text className="text-emerald-400 font-bold">✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </ImageBackground>
  );
}