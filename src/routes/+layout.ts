export const prerender = true

import '../app.scss'
import { oeuvres } from '../utils/store'
import PocketBase from 'pocketbase'
import type { Oeuvre } from '../interfaces/oeuvre'

const pb = new PocketBase('https://api.artriste.cc')

async function get_datas(): Promise<Oeuvre[]> {
	return await pb.collection('oeuvre').getFullList(200 /* batch size */, {
		sort: '-created',
	})
}

/** @type {import("./$types").LayoutLoad} */
export async function load() {
	// set data
	const records = await get_datas()
	oeuvres.set(records)
}
