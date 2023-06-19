//------------------------------------------------------------------------------
// Author:  Nathan Roark, nwr0002@uah.edu
// School:  The University of Alabama in Huntsville
// Program: Lionfish Culling (Program 2)
// Course:  CS 582, Modeling and Simulation 2
// Date:    22 February 2023
//------------------------------------------------------------------------------

/**
 * Save File
 * - save a file to the clients file system
 * 
 * @param content - content to be saved to file
 * @param filename - filename of the file to be saved
 */
export const saveFile = (content: string, filename: string) => {
    const link = document.createElement("a");
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    link.href = URL.createObjectURL(file);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
};