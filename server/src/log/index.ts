import {
  BackgroundColor,
  ForegroundColor,
  FormatFn,
  PrintFn,
  Severity,
} from "./types";

const clearFormats = `\x1b[${ForegroundColor.Default};${BackgroundColor.Default}m`;

export const clearConsole = () => console.log("\x1bc");
export const println: PrintFn = ({ severity = Severity.Debug }, ...message) => {
  const divider = Array.from({ length: 15 }, () => "=").join("");
  const foreground = Severity.color(severity);
  console.log(
    `${format({ foreground })}${divider}`,
    severity,
    `${divider}${clearFormats}`
  );
  console.log(getCurrentTime(), ...message);
};

const getCurrentTime = (): string => {
  const current = new Date();
  const day = current.getDate();
  const month = current.getMonth();
  const year = current.getFullYear();
  const time = current.toLocaleTimeString([], { hour12: false });
  return `\x1b[4;${ForegroundColor.LightCyan}m${day > 9 ? day : "0" + day}-${
    month > 9 ? month : "0" + month
  }-${year} ${time}\x1b[0;${ForegroundColor.Default}m:`;
};
const format: FormatFn = ({ foreground, background }) =>
  `\x1b[${foreground ?? ForegroundColor.Default};${
    background ?? BackgroundColor.Default
  }m`;
