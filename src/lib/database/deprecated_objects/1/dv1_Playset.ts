export interface dv1_Character {
    name?:     string;
    img_blob?: string;
}

export interface dv1_Playset {
    id ?:       number;
    title?:     string;
    img_blob?:  string;
    characters: dv1_Character[];
}