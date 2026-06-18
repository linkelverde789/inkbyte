export default function sleep(ms: number) {
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
