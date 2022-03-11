import React from 'react';
import { useState, useEffect } from 'react';
const rest = require('rest');

function FileUploadPage(){
const[selectedFiles, setSelectedFiles] = useState();
const[isFileSelected, setIsFileSelected] = useState(false);
const[disabled, setDisabled] = useState(true);
const[infoText, setInfoText] = useState("Válasszon a gépén dokumentumokat a küldéshez.");

 useEffect(() => {
  
     fetch('http://188.6.167.174:5555/softmagic/foldernames', {method:'GET', mode: 'no-cors',})
.then((response) => {response.json()})
.then((text) => console.log(text))
   
}, []);

const changeHandler = (event) => {
    if(event.target.files.length !== 0){
    setSelectedFiles(event.target.files);
    setIsFileSelected(true);
    setDisabled(false);
    }
    else{
        setDisabled(true);
        setSelectedFiles([]);
    }
}

const handleSubmission = () => {
    const formData = new FormData();
for (const key of Object.keys(selectedFiles)) {
    formData.append('file', selectedFiles[key])
}
sendFiles(formData);
}

async function sendFiles(fileList){

     await fetch('http://188.6.167.174:5555/softmagic/upload',  {

        method: 'POST',
        body: fileList,
        cache: 'no-cache',
        mode: 'no-cors'
    })
    
    .then((response) => response.json())
    .then((text) => {alert(text);})
    .catch((error) => {alert(error);})
    window.location.reload();
}

return( <div className="File-list">

    {isFileSelected ? (<div className='File-data'><ul>
    <FileList list={selectedFiles}/>
    </ul>       
        </div>) :
        <div>
            <GetInfoText info={infoText}/>
            </div>}
    <input type='file' name='file' accept='.txt, .pdf, .doc, .xls, .xlsx, .jpg'  onChange={changeHandler} multiple></input>
    <div>
        <button onClick={handleSubmission} className='Send-btn' disabled = {disabled}>Küldés</button>
    </div>
    </div>);
}

function GetInfoText(props){
    return(<p className='Info-text'>{props.info}</p>);
}

function FileList(props) {
    const store = [...props.list];
    return(<ul>
        {store.map((file, index) => <li key={index}>Fájl neve: <b>{file.name}</b> mérete: <b>{file.size}</b> byte</li>)}
        </ul>); 
}

export default FileUploadPage;
