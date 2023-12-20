import { db } from "$lib/database/db";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    const set_uuid: number = parseInt( params.set_title ); // Game ID is stored as a number in Dexie, but page params are strings so cast it
    
    if( await db.sets.get( set_uuid ) === undefined ) {
        throw redirect( 302, '/' ); // Playset not in database, redirect to homepage
    }
    
    return {
        set_uuid
    }
}