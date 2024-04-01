import { OnConnectFn } from "./types";
import { google } from "googleapis";
import keys from "../../client.keys.json";
import crypto from "crypto";
import { getUserInfo } from "../auth";
import { runProcedure } from "../queries/queries";
import { Procedure, ProcedureResponse } from "../queries/types";

export const onConnect: OnConnectFn = async (ws, request) => {
  const params = new URLSearchParams(request.url);
  const token = params.get("/?token");
  if (token) {
    const client = new google.auth.OAuth2(
      keys.web.client_id,
      keys.web.client_secret,
      "http://localhost:3000/oauth2callback"
    );
    client.setCredentials({ access_token: token });
    try {
      const { sub, expiry_date, email } = await client.getTokenInfo(token);
      if (Date.now() <= expiry_date) {
        const hashed_sub = await crypto
          .createHash("sha256")
          .update(sub)
          .digest("hex");
        const response = await runProcedure({
          type: Procedure.GetUser,
          payload: { uid: hashed_sub },
        });
        if (response) {
          if (response.key === ProcedureResponse.GetUserResult) {
            const { body } = response;
            const userData = await getUserInfo(client);
            console.log(email);
            if (body.enabled && email == body.email) {
              ws.send(JSON.stringify({ ...userData, email }));
              return;
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      ws.close();
      return;
    }
  }

  ws.close();
};
