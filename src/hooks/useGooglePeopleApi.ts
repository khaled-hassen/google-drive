import { useContext, useEffect, useRef } from "react";
import GoogleApiContext from "../context/GoogleApiContext.ts";

type OnReadyParams = {
  getProfilePicture(): Promise<string | undefined>;
};

type OnReady = (params: OnReadyParams) => void;

export function useGooglePeopleApi(onReady: OnReady) {
  const { scriptsLoaded } = useContext(GoogleApiContext);
  const people = useRef<gapi.client.people.PeopleResource>();

  async function getProfilePicture() {
    if (!people.current) return;
    try {
      const response = await people.current.get({
        resourceName: "people/me",
        personFields: "photos",
      });
      return response?.result?.photos?.[0].url;
    } catch (error) {
      console.error("Error fetching profile picture", error);
    }
  }

  useEffect(() => {
    if (scriptsLoaded) {
      people.current = gapi.client.people.people;
      onReady({ getProfilePicture });
    }
  }, [scriptsLoaded]);
}
