import { Game, Lobby, RGB, User } from "./types";

const randInt = (toNum: number): number => {
  return Math.floor(Math.random() * (toNum + 1));
};

const generateRGBVal = (): RGB => {
  return {
    r: randInt(255),
    g: randInt(255),
    b: randInt(255),
  };
};

const generateRandomRGB = (): string => {
  const rgbVals = generateRGBVal();

  return `rgb(${rgbVals.r}, ${rgbVals.g}, ${rgbVals.b})`;
};

const generateHexCode = () => {
  const rgbVals = generateRGBVal();

  return (
    "#" +
    ((1 << 24) | (rgbVals.r << 16) | (rgbVals.g << 8) | rgbVals.b)
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
};

const getColorList = (correctCount: number): string[] => {
  if (correctCount !== 0 && correctCount % 5 === 0) {
    return [generateHexCode(), generateHexCode(), generateHexCode()];
  }
  return [generateRandomRGB(), generateRandomRGB(), generateRandomRGB()];
};

export const createNewGame = (): Game => {
  const colorOptions = getColorList(0);
  const correctIdx = randInt(2);

  return {
    colorOptions,
    correctColor: colorOptions[correctIdx],
    votes: [],
  };
};

export const getCurrentUser = (users: User[], id: string) => {
  return users.find((user) => user.id === id);
};

export const removeUserById = (users: User[], id: string) => {
  return users.filter((user) => user.id !== id);
};

export const getLobbyById = (lobbies: Lobby[], id: string) => {
  return lobbies.find((lobby) => lobby.id === id);
};

export const updateUserActiveLobby = (
  users: User[],
  id: string,
  activeLobby: string | undefined
) => {
  return users.map((user) => {
    if (user.id !== id) {
      return user;
    }

    return {
      ...user,
      activeLobby,
    };
  });
};

export const removeUserFromLobby = (
  lobbies: Lobby[],
  lobbyId: string,
  userId: string
) => {
  return lobbies.map((lobby) => {
    if (lobby.id !== lobbyId) {
      return lobby;
    }

    return {
      ...lobby,
      users: lobby.users.filter((user) => user.id !== userId),
    };
  });
};
