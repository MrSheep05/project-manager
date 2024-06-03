export const isBinary = (data: any) => {
  return (
    typeof data === "object" &&
    Object.prototype.toString.call(data) === "[object Blob]"
  );
};

export const getWindow = <T>(inputArray: T[], size: number): T[][] => {
  if (size < 1) return [[]];
  let a = 0;
  let acc = [];
  do {
    acc.push(inputArray.slice(a, a + size));
    a += size;
  } while (a < inputArray.length);
  return acc;
};
