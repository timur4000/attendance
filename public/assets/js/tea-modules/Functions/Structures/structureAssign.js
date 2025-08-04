import { structureClone } from './structureClone.js';


/**
 * @function
 *
 * @description Assigns the source structure to target structure and return new structure.
 *
 * @template { Object | Array } TargetType
 *
 * @template { Object | Array } SourceType
 *
 * @param { TargetType } target - The target structure to assign properties to.
 *
 * @param { SourceType } source - The source structure to extract properties from.
 *
 * @param { boolean ? } [isOwnPropertyOnly=true] - If set to `true`, only own properties of the source structure will be assigned.
 *
 * @return { TargetType & SourceType } The processed target.
 **/
export function structureAssign(target, source, { isOwnPropertyOnly = true } = {})
{
    const clone = (structure) => structureClone(structure, { isOwnPropertyOnly });
    
    return Object.assign(clone(target), clone(source));
}
