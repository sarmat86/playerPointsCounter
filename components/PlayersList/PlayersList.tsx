import { Player } from "@/context/AppStateContext";
import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface UsersListProps {
  players: Player[];
}

export default function PlayerList({ players }: UsersListProps) {
  return (
    <View style={styles.container}>
      {players.map((player) => {
        return (
          <View key={player.id}>
            <Link style={styles.userContainer} href={`/${player.id}`}>
              <Text style={styles.userName}>{player.name}</Text>
              <Text style={styles.userPoints}>{player.totalPoints} pts</Text>
            </Link>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
  },

  userContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
  userPoints: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});
