export class States
{
    /**
     * @public
     *
     * @description Sets no-transition state by the specified force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    noTransition(force)
    {
        document.body.classList.toggle('no-transition', force);
    }
    
    /**
     * @public
     *
     * @description Sets no-tools state by the specified force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    noTools(force)
    {
        document.body.classList.toggle('no-tools', force);
    }
    
    /**
     * @public
     *
     * @description Determines whether the body element contains specified state.
     *
     * @param { string } state
     *
     * @return { boolean }
     **/
    has(state)
    {
        return document.body.classList.contains(state);
    }
}
