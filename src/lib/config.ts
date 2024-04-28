/**
 * An array of scopes for Google APIs.
 *
 * These scopes are used to specify the level of access that the user is granting to your application.
 *
 * @example
 * scopes; // Returns ["https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"]
 */
export const scopes = [
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.metadata",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/userinfo.profile",
];

/**
 * An array of Google API discovery documents.
 *
 * These documents are used to automatically generate client libraries, code samples, and other documentation.
 *
 * @example
 * discoveryDocs; // Returns ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
 */
export const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  "https://www.googleapis.com/discovery/v1/apis/people/v1/rest",
];
