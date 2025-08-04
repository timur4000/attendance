/**
 * @function
 *
 * @description Checks if the given argument is a json.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isJson(verifiable)
{
    try
    {
        JSON.parse(verifiable);
    }
    catch (error)
    {

        return false;
    }

    return true;
}
