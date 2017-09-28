import * as fs from 'fs';
import * as path from 'path';

export class MyFileSystem {
    
    /**
     * Will use to get list of urls or something from text file.
     * -Will use newline to cut down string into arrays
     */
    getList( filePath: string ) : string[]{
      let content = fs.readFileSync( filePath ).toString();
      return content.split('\r\n')
    }

    /**
     * Will use to get text to be posted on websites from text file.
     */
    getText( filePath : string ){
       return fs.readFileSync( filePath ).toString();
    }

    readJson( filePath: string ){
        let json = fs.readFileSync( filePath ).toString();
        return JSON.parse(json);
    }
}