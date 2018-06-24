const readline = require('readline');
const fs = require('fs');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



rl.question('Enter the name of the Source Directory: ', (answer) => {

    let sourceDir = answer;
    readDirectoryAsynchronously(sourceDir)

});




let readDirectoryAsynchronously = (sourceDir) => {
    /* Function  : readFileSync(file[, options])
    *
     *Return Type : Array (Of File List)
     * */
    let sourceDirectory = sourceDir;
    fs.readdir(sourceDir,(err,file)=>{
        if(err) {
            // console.log(err)
            console.log("Please Enter Correct Source Directory");
            rl.question('Enter the name of the Source Directory: ', (answer) => {

                let sourceDir = answer;
                readDirectoryAsynchronously(sourceDir)

            });

            // rl.close();

        } else {
            // console.log("sourceDirName",sourceDirectory);
            let fileArray = file;
            for(let i =0;i<fileArray.length;i++) {
                console.log(i+1+': '+fileArray[i]);
            }
            rl.question('Enter the serial number of file to copied: ',(serialNumber)=> {
                if(serialNumber<=fileArray.length && serialNumber>0) {
                     let serial= serialNumber;
                    copyFile(serialNumber,fileArray,sourceDirectory);
                } else if(fileArray.length  == 0){
                    console.log("your Source Directory is empty,please add files to copy to destination");

                } else {
                    console.log("You Entered Wrong Serial Number");
                        rl.question('Enter the serial number of file to copied: ',(serialNumber)=> {
                            if(serialNumber<=fileArray.length && serialNumber>0) {
                                let serial= serialNumber;
                                copyFile(serialNumber,fileArray,sourceDirectory);
                            }else {
                                console.log("You Entered Wrong Serial Number");
                                // rl.close();
                            }
                        
                        })
                    // rl.close();
                }
               
            })

           

        }
    })

}



let copyFile = (number,Array,sourceDirectory) => {

     
     rl.question('Enter the Name of the Destination Directory: ', (dstdir) => {

         let destination = dstdir;
        readDestinationDirectoryAsynchronously(sourceDirectory,Array,number,destination);
     });

   
}



let readDestinationDirectoryAsynchronously = (sourceDirectory,Array,number,destination) => {
    /* Function  : readFileSync(file[, options])
    *
     *Return Type : Array (Of File List)
     * */
    fs.readdir(destination,(err,file)=>{
        if(err) {
            // console.log(err)
            console.log("Please Enter Correct Destination Directory");
            copyFile(number,Array,sourceDirectory);


        } else {
            copyToDestionation(sourceDirectory,Array,number,destination)
        }
    })

}


let copyToDestionation = (sourceDirectory,Array,number,destination) => {
     let readStream = fs.createReadStream(sourceDirectory+'/'+Array[number-1])
    let writeStream = fs.createWriteStream(destination+'/'+Array[number-1])
    readStream.on('data',(chunk)=>{
        writeStream.write(chunk)
    })
    readStream.on('end',()=>{
        console.log('File Read Complete')
        writeStream.end()
        console.log('File Write Complete')
        console.log("Your File is Successfully Copied");
        rl.close();
    })
}