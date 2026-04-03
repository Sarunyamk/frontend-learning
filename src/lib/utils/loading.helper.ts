export const testLoading = async (delay: number) => {
  await new Promise((r) => setTimeout(r, delay));
}
