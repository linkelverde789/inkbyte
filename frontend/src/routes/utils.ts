export default function sleep(s: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
}

export function getExtension(file: string) {
  let result = file.substring(file.lastIndexOf(".") + 1).toUpperCase();
  return result;
}
