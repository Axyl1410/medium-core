import { assertValue } from "@workspace/utils";

/**
 * Environment variables for Sanity Studio
 *
 * All environment variables must be prefixed with `SANITY_STUDIO_` to be
 * automatically picked up by the Sanity CLI, development server and bundler.
 *
 * @see https://www.sanity.io/docs/studio/environment-variables
 */
export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: SANITY_STUDIO_PROJECT_ID"
);

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: SANITY_STUDIO_DATASET"
);
