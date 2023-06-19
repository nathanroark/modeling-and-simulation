export type Results = {
    w_min: number;  // wolves minimum
    w_max: number;  // wolves maximum
    w_mean: number; // wolves mean
    s_min: number;  // sheep minimum
    s_max: number;  // sheep maximum
    s_mean: number; // sheep mean
    g_min: number;  // grass minimum
    g_max: number;  // grass maximum
    g_mean: number; // grass mean
    output: string[]; // text output from trial
    grids: string[][][]
}