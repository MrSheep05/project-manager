import { OnConnectFn } from "./types";
import { google } from "googleapis";
import keys from "../../client.keys.json";
import crypto from "crypto";
import { getUserInfo } from "../auth";
import { runProcedure } from "../queries/queries";
import { Procedure, ProcedureResponse } from "../queries/types";

export const onConnect: OnConnectFn = async (ws, request) => {};
