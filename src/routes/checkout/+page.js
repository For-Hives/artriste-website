export const prerender = false;

import {oeuvres} from "../../utils/store";
import {error} from "@sveltejs/kit";
import {page} from "$app/stores";


/** @type {import("./$types").PageLoad} */
export async function load({url, parent}) {
    const p = await parent();
    let oeuvre;

    let id = url.searchParams.get("oeuvre");

    console.log("params", url.searchParams.get("oeuvre"));

    await oeuvres.subscribe((oeuvres) => {
            oeuvre = oeuvres.find((oeuvre) => oeuvre.id === id);
        }
    );

    if (oeuvre === undefined) {
        throw error(404, "Oeuvre not found");
    }

    return {
        oeuvre: oeuvre
    };
}