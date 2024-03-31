import { useContext, useEffect, useRef } from "react";
import GoogleApiContext from "../context/GoogleApiContext.ts";

type OnReadyParams = {
  getProfileInfo(): Promise<{ profileImage: string; fullName: string }>;
};

type OnReady = (params: OnReadyParams) => void;

export function useGooglePeopleApi(onReady: OnReady) {
  const { scriptsLoaded } = useContext(GoogleApiContext);
  const people = useRef<gapi.client.people.PeopleResource>();

  async function getProfileInfo() {
    if (!people.current) return { profileImage: "", fullName: "" };
    const response = await people.current.get({
      resourceName: "people/me",
      personFields: "names,photos",
    });
    const profileImage = response?.result?.photos?.[0].url || "";
    const fullName = response?.result?.names?.[0].displayName || "";
    return { profileImage, fullName };
  }

  useEffect(() => {
    if (scriptsLoaded) {
      people.current = gapi.client.people.people;
      onReady({ getProfileInfo });
    }
  }, [scriptsLoaded]);
}
