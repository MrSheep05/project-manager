declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_URL: string;
      MYSQL_USERNAME: string;
      MYSQL_PASSWORD: string;
      MYSQL_DATABASE: string;
      SERVER_PORT: string;
      REDIRECT_URI: string;
    }
  }
}

export {};
