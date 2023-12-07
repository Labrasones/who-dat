import { browser } from '$app/environment';
import Dexie, { type Table, type Transaction } from 'dexie';
import { get, type Invalidator, type Subscriber, type Unsubscriber, type Updater, type Writable } from 'svelte/store';

export interface Character {
    name?:     string;
    img_blob?: string;
}

export interface Playset {
    id ?:       number;
    title?:     string;
    img_blob?:  string;
    characters: Character[];
}

function __safeGetItem( key: string ): string|null {
    if( browser ) {
        return localStorage.getItem( key );
    }
    else
    {
        return null;
    }
}
function __safeSetItem( key: string, value: string ): void {
    if ( browser ) {
        return localStorage.setItem( key, value );
    }
}

export class LocalStorageStore<T> implements Writable<T>
{
    protected readonly key: string;
    protected val: T;
    protected subscriptions: Set< Subscriber<T> > = new Set();

    constructor( key: string, value: T )
    {
        this.key = key;

        const raw = __safeGetItem( this.key );
        if ( raw !== null ) {
            this.val = JSON.parse( raw );
        }
        else
        {
            this.val = value;
            __safeSetItem( this.key, JSON.stringify( this.val ) );
        }
    }

    set( value: T): void
    {
        this.val = value;
        __safeSetItem( this.key, JSON.stringify( this.val ) );
        this.subscriptions.forEach( s => s( this.val ) );
    }
    update( updater: Updater<T>): void
    {
        this.set( updater( this.val ) );
    }
    subscribe( run: Subscriber<T>): Unsubscriber
    {
        this.subscriptions.add( run );
        const out = () => this.subscriptions.delete( run );
        run( this.val );
        return out;
    }
}
export const recent_playset_ids = new LocalStorageStore<number[]>( "recent_playset_ids", [] );
export function pushRecentPlayset( playset_id: number ) {
    const cur = get( recent_playset_ids );
    if ( cur.includes( playset_id ) ) return; // Do nothing if it's already in the recents list
    cur.unshift( playset_id );
    cur.length = Math.min( cur.length, 4 ); // Maximum recents list
    recent_playset_ids.set( cur );
}

export class WhoDatDexie extends Dexie {
    playsets   !: Table<Playset>;

    constructor() {
        super( 'whodat' );
        this.version( 1 ).stores({
            playsets:   '++id, title'
        });
    }
}
export const db = new WhoDatDexie();