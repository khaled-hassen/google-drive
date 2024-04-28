import { useContext, useEffect, useRef } from "react";
import GoogleApiContext from "../context/GoogleApiContext.ts";

type OnReadyParams = {
  getProfileInfo(): Promise<{ profileImage: string; fullName: string }>;
};

type OnReady = (params: OnReadyParams) => void;

/**
 * A custom React Hook that provides a function to get profile information from Google People API.
 *
 * This hook uses the `GoogleApiContext` to get the `scriptsLoaded` state. It returns a function that, when called, gets the profile information of the logged-in user from Google People API and calls the provided `onReady` callback function when the profile information is successfully retrieved.
 *
 * @param onReady - A callback function that is called when the profile information is successfully retrieved.
 *
 * @returns A function that gets profile information from Google People API.
 */
export function useGooglePeopleApi(onReady: OnReady) {
  const { scriptsLoaded } = useContext(GoogleApiContext);
  const people = useRef<gapi.client.people.PeopleResource>();

  /**
   * An asynchronous function that gets profile information from Google People API.
   *
   * This function checks if the `people` reference is defined. If not, it returns an object with empty strings for `profileImage` and `fullName`. If the `people` reference is defined, it sends a request to the Google People API to get the profile information of the logged-in user. It then returns an object with the URL of the profile image and the full name of the user.
   *
   * @returns A promise that resolves to an object with the URL of the profile image and the full name of the user.
   *
   * @example
   * getProfileInfo(); // Returns a promise that resolves to an object with the URL of the profile image and the full name of the user
   */
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
