// globalReducer.ts

export interface GlobalState {
  auth: {
    token: string | null;
  };
  handleLogin?: (token: string) => void;
  setEncryptionKey?: React.Dispatch<React.SetStateAction<CryptoKey | null>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  encryptionKey?: any;
}

export type GlobalAction =
  | { type: "LOGIN"; payload: { token: string } }
  | { type: "LOGOUT" }
  | { type: "GET_TOKEN" };

const token = sessionStorage.getItem("accessToken");
export const initialState: GlobalState = {
  auth: {
    token: token,
  },
};

export const globalReducer = (
  state: GlobalState,
  action: GlobalAction
): GlobalState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        auth: { token: null },
      };

    default:
      return state;
  }
};
