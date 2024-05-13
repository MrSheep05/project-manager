export const isBinary = (data: any) => {
  return (
    typeof data === "object" &&
    Object.prototype.toString.call(data) === "[object Blob]"
  );
};
