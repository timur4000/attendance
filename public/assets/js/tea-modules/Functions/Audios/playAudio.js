/**
 * @function
 *
 * @description Plays the given audio.
 *
 * @param { string } src
 *
 * @return { void }
 **/
export async function playAudio(src)
{
    const audio = new Audio(src);
    
    await audio.play();
}
