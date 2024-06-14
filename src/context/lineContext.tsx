import liff from "@line/liff";
import { Liff } from "@line/liff";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Profile } from "~/interfaces/profile";
import { api } from "~/utils/api";

type contextType = {
  liff: Liff | undefined;
  loggedIn: boolean;
  profile: Profile | undefined;
  login: () => void;
  logout: () => void;
};

const defaultContext: contextType = {
  liff: undefined,
  loggedIn: false,
  profile: undefined,
  login: () => {
    return null;
  },
  logout: () => {
    return null;
  },
};

const LineContext = createContext(defaultContext);

export function LineProvider({ children }: { children: ReactNode }) {
  const { pathname, replace } = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();
  const [init, setInit] = useState<boolean>(false);
  const {
    mutate: createNewUser,
    isLoading: creating,
    isSuccess: created,
  } = api.user.create.useMutation();

  useEffect(() => {
    void initialize();
    void updateLoggedInState();

    //only access in line app
    // if (init) {
    //   if (!liff.isInClient()) {
    //     if (pathname != "/order/checkout/download") {
    //       void replace("/not-in-app");
    //     }
    //   }
    // }

    if (loggedIn) {
      void getProfile();
    }
  }, [init, loggedIn]);

  async function updateLoggedInState() {
    if (!init) return;
    liff.isLoggedIn() ? setLoggedIn(true) : setLoggedIn(false);
  }

  async function initialize() {
    try {
      liff
        .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
        .then(() => {
          liff.isLoggedIn() ? setLoggedIn(true) : setLoggedIn(false);
          setInit(true);
        })
        .catch((error) => setInit(false));
    } catch (error) {
      console.log(error);
    }
  }

  async function login() {
    if (!init) return;
    if (!loggedIn) {
      liff.login();
    }
  }

  async function getProfile() {
    const profile = await liff.getProfile();
    createNewUser({ lineId: profile.userId });

    setProfile({
      ...profile,
    });
  }

  async function logout() {
    liff.logout();
    setLoggedIn(false);
  }

  const value = { liff, profile, loggedIn, login, logout };
  return <LineContext.Provider value={value}>{children}</LineContext.Provider>;
}

export function useLine() {
  return useContext(LineContext);
}
