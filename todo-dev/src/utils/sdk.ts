import { createDirectus, authentication, rest } from "@directus/sdk";
import { DirectusType } from "./types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const sdk = createDirectus<DirectusType>(apiUrl)
  .with(
    authentication("session", { credentials: "include", autoRefresh: true }),
  )
  .with(rest({ credentials: "include" }));
