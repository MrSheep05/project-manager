export enum Severity {
  Error = "ERROR",
  Warning = "WARNING",
  Info = "INFO",
  Debug = "DEBUG",
}

export enum ForegroundColor {
  Default = 39,
  Black = 30,
  Red = 31,
  Green = 32,
  Yellow = 33,
  Blue = 34,
  Magenta = 35,
  Cyan = 36,
  LightGray = 37,
  Gray = 90,
  LightRed = 91,
  LightGreen = 92,
  LightYellow = 93,
  LightBlue = 94,
  LightMagenta = 95,
  LightCyan = 96,
  White = 97,
}

export enum BackgroundColor {
  Default = 49,
  Black = 40,
  Red = 41,
  Green = 42,
  Yellow = 43,
  Blue = 44,
  Magenta = 45,
  Cyan = 46,
  LightGray = 47,
  Gray = 100,
  LightRed = 101,
  LightGreen = 102,
  LightYellow = 103,
  LightBlue = 104,
  LightMagenta = 105,
  LightCyan = 106,
  White = 107,
}

export namespace BackgroundColor {
  export const fromForeground = (color: ForegroundColor): BackgroundColor =>
    color + 10;
}

export namespace ForegroundColor {
  export const fromBackground = (color: BackgroundColor): ForegroundColor =>
    color - 10;
}

export type PrintFn = (
  { severity }: { severity?: Severity },
  ...message: any[]
) => void;

export type FormatFn = ({
  foreground,
  background,
}: {
  foreground?: ForegroundColor;
  background?: BackgroundColor;
}) => string;

export namespace Severity {
  export const color = (severity: Severity): ForegroundColor => {
    switch (severity) {
      case Severity.Debug: {
        return ForegroundColor.LightGreen;
      }
      case Severity.Error: {
        return ForegroundColor.Red;
      }
      case Severity.Warning: {
        return ForegroundColor.Yellow;
      }
      case Severity.Info: {
        return ForegroundColor.LightBlue;
      }
      default: {
        return ForegroundColor.Default;
      }
    }
  };
}
