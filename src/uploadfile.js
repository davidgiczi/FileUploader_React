import React from 'react';
import { useState, useEffect } from 'react';
const MAX_SIZE = 5 * 1024 * 1024;

function FileUploadPage(){
const[selectedFiles, setSelectedFiles] = useState();
const[isFileSelected, setIsFileSelected] = useState(false);
const[disabled, setDisabled] = useState(true);
const[infoText, setInfoText] = useState("Válasszon a dokumentumokat a küldéshez.");

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
    setInfoText("Még feltölthető " + getLeftOverFileSize(event.target.files) + " byte.");
    } 
    else {
        setDisabled(true); 
        setSelectedFiles([]);
        setInfoText("Válasszon a dokumentumokat a küldéshez.");
    }
}

const handleSubmission = () => {
    const formData = new FormData();
for (const key of Object.keys(selectedFiles)) {
    formData.append('file', selectedFiles[key])
}
sendFiles(formData);
}

return( <div className="File-list">
    <p>Válasszon mappát.</p>
    {isFileSelected ? (<div className='File-data'>
    <ul><GetFolderNames/>
    <FileList list={selectedFiles}/>
    <GetInfoText info={infoText} color='green'/>
    </ul>       
        </div>) :
        <div>
            <GetFolderNames/>
            <GetInfoText info={infoText} color='green'/>
            </div>}
    <input className='Choose-file' type='file' name='file' accept='.txt, .pdf, .doc, .xls, .xlsx, .jpg'  onChange={changeHandler} multiple></input>
    <div>
        <button onClick={handleSubmission} className='Send-btn' disabled = {disabled}>Küldés</button>
    </div>
    </div>);
}

function GetInfoText(props){
    return(<p className='Info-text' style={{color: props.color}}>{props.info}</p>);
}

function FileList(props) {
    const store = [...props.list];
    return(<ul>
        {store.map((file, index) => <li key={index}>Fájl neve: <b>{file.name}</b> mérete: <b>{file.size}</b> byte</li>)}
        </ul>); 
}

function GetFolderNames(props){
    const[folderName, setFolderName] = useState("-");
    const folders = ["könyvelés", "bérelszámolás", "pénzügy"];
    return(<>
        <select className='Selection-field'>
        <option>{folderName}</option>
        {folders.map((name) => <option>{name}</option>)} 
        </select>
    </>);
}

function getLeftOverFileSize(files){
    const store = [...files];
    let sum = 0;
    store.map((file) => sum += parseInt(file.size));
    return MAX_SIZE - sum;
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

export default FileUploadPage;
