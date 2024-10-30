import React, { createContext, useReducer, ReactNode, useContext } from "react";

export type Player = {
  id: string;
  name: string;
  totalPoints: number;
};

type AppState = {
  players: Player[];
};

type Action = { type: "ADD_POINTS"; id: string; points: number };

const initialState: AppState = {
  players: [
    { id: "xx1", name: "Player1", totalPoints: 0 },
    { id: "xx2", name: "Player2", totalPoints: 0 },
  ],
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_POINTS":
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.id
            ? { ...player, totalPoints: player.totalPoints + action.points }
            : player
        ),
      };
    default:
      return state;
  }
};

const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
