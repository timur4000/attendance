/**
 * @function
 *
 * @description Checks if the given argument is a form data.
 *
 * @param { any } verifiable
 *
 * @return { Boolean }
 **/
export function isFormData(verifiable)
{
    return verifiable instanceof FormData;
}
