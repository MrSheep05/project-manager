declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_URL: string;
      MYSQL_USERNAME: string;
      MYSQL_PASSWORD: string;
      MYSQL_DATABASE: string;
    }
  }
}

export {};
