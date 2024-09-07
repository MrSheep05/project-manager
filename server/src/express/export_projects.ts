import { createObjectCsvStringifier, createObjectCsvWriter } from "csv-writer";
import { println } from "../log";
import { Severity } from "../log/types";
import { getCsvProjects } from "./database";
import { ExportProjectsFn } from "./types";
import * as csv from "csv";

export const exportProject: ExportProjectsFn = async (req, res) => {
  try {
    const { connectionId, usersId } = req.body;
    const csvProjects = await getCsvProjects(connectionId, usersId);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=projects_data${usersId}.csv`
    );
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Pragma", "no-cache");
    csv
      .stringify(csvProjects, {
        header: true,
        columns: [
          { key: "id", header: "ID" },
          { key: "user_id", header: "UserID" },
          { key: "user_email", header: "UserEmail" },
          { key: "title", header: "Title" },
          { key: "content", header: "Content" },
          { key: "timestamp", header: "Timestamp" },
          { key: "status", header: "Status" },
          { key: "categories", header: "Categories" },
        ],
      })
      .pipe(res);
  } catch (err) {
    res.end();
  }
};
