import { type Playset, db } from "$lib/db";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { liveQuery } from "dexie";
import { WrappedQuery } from "$lib/queryHelper";

export const load: PageLoad = async ({ params }) => {
    const playset_id: number = parseInt( params.id ); // Game ID is stored as a number in Dexie, but page params are strings so cast it
    
    if( await db.playsets.get( playset_id ) === undefined ) {
        throw redirect( 302, '/' ); // Playset not in database, redirect to homepage
    }
    return {
        playset: new WrappedQuery<Playset>(
            db.playsets,
            async () => {
                return await db.playsets.get( playset_id );
            },
            {
                characters: []
            }
        )
    }
}