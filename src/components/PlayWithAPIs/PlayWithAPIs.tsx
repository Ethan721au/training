import { webdb } from "./webdb";

export default async function PlayWithAPIs() {
  const data = await webdb();
  // console.log(data);

  return <div>{data.name}</div>;
}
