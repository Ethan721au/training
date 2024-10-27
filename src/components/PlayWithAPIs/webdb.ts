export async function webdb() {
  const user = await fetch("https://webdb.vercel.app/api", {
    method: "GET",
  });

  const res = await user.json();

  console.log(res);
  return res;
}
