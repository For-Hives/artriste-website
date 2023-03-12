import { oeuvres } from "../../../utils/store";
import { error } from "@sveltejs/kit";


/** @type {import("./$types").PageLoad} */
export async function load({ params, parent }) {
  const p = await parent();
  let oeuvre;

  await oeuvres.subscribe((oeuvres) => {
      oeuvre = oeuvres.find((oeuvre) => oeuvre.name === params.slug);
    }
  );

  if (oeuvre === undefined) {
    throw error(404, "Oeuvre not found");
  }

  return {
    oeuvre: oeuvre
  };
}