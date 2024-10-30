import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Player, useAppState } from "../../context/AppStateContext"; // Import kontekstu
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type PointsManagerProps = {
  playerId: string;
};

const PointsManager: React.FC<PointsManagerProps> = ({ playerId }) => {
  const color = useThemeColor({ light: undefined }, "text"); //todo

  const [points, setPoints] = useState<number>(0);
  const { state, dispatch } = useAppState();

  const currentPlayer = state.players.find((player) => player.id === playerId);

  const handleInputChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setPoints(parsedValue);
    } else if (value === "") {
      setPoints(0);
    }
  };

  const handleIncrement = () => setPoints(points + 1);
  const handleDecrement = () => setPoints(points - 1);

  const handleConfirm = () => {
    dispatch({ type: "ADD_POINTS", id: playerId, points });
    setPoints(0);
  };
  if (!currentPlayer) return null;
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{currentPlayer.name}</ThemedText>
      <ThemedText style={styles.totalLabel}>
        Total Points: {currentPlayer.totalPoints}
      </ThemedText>

      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { color }]}
          keyboardType="numeric"
          value={points.toString()}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm Points</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 40,
  },
  label: {
    fontSize: 24,
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4CAF50",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    width: 60,
    textAlign: "center",
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PointsManager;
