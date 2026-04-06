"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface Props {
  onUser: (name: string, email: string) => void;
}

/**
 * Rendered only when ClerkProvider is present.
 * Reads the signed-in user and passes their name + email up via callback.
 */
export default function ClerkUserReader({ onUser }: Props) {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      onUser(
        user.fullName ?? "",
        user.primaryEmailAddress?.emailAddress ?? "",
      );
    }
    if (isLoaded && !user) {
      onUser("", ""); // signed out — clear autofill
    }
  }, [isLoaded, user, onUser]);

  return null;
}
