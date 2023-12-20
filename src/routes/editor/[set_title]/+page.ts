import { db } from "$lib/database/db";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { liveQuery } from "dexie";
import { WrappedQuery } from "$lib/queryHelper";
import type { Playset } from "$lib/database/objects/Playset";

export const load: PageLoad = async ({ params }) => {
    const set_uuid: number = parseInt( params.set_title );
    
    if( await db.sets.get( set_uuid ) === undefined ) {
        throw redirect( 302, '/' ); // Playset not in database, redirect to homepage
    }
    return {
        playset: new WrappedQuery<Playset>(
            db.sets,
            async () => {
                return await db.sets.get( set_uuid );
            },
            {
                characters: []
            }
        ),
        set_uuid
    }
}