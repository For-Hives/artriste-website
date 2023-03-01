export const prerender = true;

import "../app.css";
import { oeuvres } from "../utils/store";
import PocketBase from "pocketbase";
import type { Oeuvre } from "../interfaces/oeuvre";


const pb = new PocketBase("https://artriste-api.beta.andy-cinquin.fr");

async function get_datas(): Promise<Oeuvre[]> {
  return await pb.collection("oeuvre").getFullList(200 /* batch size */, {
    sort: "-created"
  });
};


/** @type {import("./$types").LayoutLoad} */
export async function load() {


  // set data
  const records = await get_datas();

  console.log("oevre before set");
  oeuvres.set(records);

  console.log("data loaded");

}