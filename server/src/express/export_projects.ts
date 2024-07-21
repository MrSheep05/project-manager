import { createObjectCsvStringifier, createObjectCsvWriter } from "csv-writer";
import { println } from "../log";
import { Severity } from "../log/types";
import { getCsvProjects } from "./database";
import { ExportProjectsFn } from "./types";
import * as csv from "csv";

export const exportProject: ExportProjectsFn = async (req, res) => {
  try {
    // const { connectionId, usersId } = req.body;
    // const csvProjects = await getCsvProjects(connectionId, usersId);
    // csv.generate({ delimiter: "|" });
    // const stringifier = createObjectCsvStringifier({
    //   header: [{ id: "name", title: "CSV" }],
    // });
    // res.attachment("test.csv");
    // stringifier.stringifyRecords(csvProjects);
    const { connectionId, usersId } = req.body;
    const csvProjects = await getCsvProjects(connectionId, usersId);
    res.attachment("test.csv");
    const stringifier = csv.stringify({
      header: true,
      columns: [
        { key: "id", header: "ID" },
        { key: "user_id", header: "User ID" },
        { key: "user_email", header: "User Email" },
        { key: "title", header: "Title" },
        { key: "content", header: "Content" },
        { key: "timestamp", header: "Timestamp" },
        { key: "status", header: "Status" },
        { key: "categories", header: "Categories" },
      ],
    });
    stringifier.pipe(res);
    csvProjects.forEach((project) => stringifier.write(project));
    stringifier.end();
  } catch (err) {
    res.end();
  }
};
