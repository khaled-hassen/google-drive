import { useContext, useEffect, useRef } from "react";
import GoogleApiContext from "../context/GoogleApiContext.ts";

type OnReadyParams = {
  getStorageInfo(): Promise<{ total: number; used: number }>;
};

type OnReady = (params: OnReadyParams) => void;

export function useGoogleDriveApi(onReady?: OnReady) {
  const { scriptsLoaded } = useContext(GoogleApiContext);
  const about = useRef<gapi.client.drive.AboutResource>();

  async function getStorageInfo() {
    if (!about.current) return { total: 0, used: 0 };

    const {
      result: { storageQuota },
    } = await about.current.get({ fields: "storageQuota" });
    return {
      total: parseInt(storageQuota?.limit || "0"),
      used: parseInt(storageQuota?.usage || "0"),
    };
  }

  useEffect(() => {
    if (scriptsLoaded) {
      about.current = gapi.client.drive.about;
      onReady?.({ getStorageInfo });
    }
  }, [scriptsLoaded]);
}
