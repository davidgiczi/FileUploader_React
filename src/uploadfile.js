import React from 'react';
import { useState, useEffect } from 'react';
const MAX_SIZE = 5 * 1024 * 1024;
let foldername = "-";

function FileUploadPage(){
const[selectedFiles, setSelectedFiles] = useState();
const[isFileSelected, setIsFileSelected] = useState(false);
const[disabled, setDisabled] = useState(true);
const[infoText, setInfoText] = useState("Válasszon a dokumentumokat a küldéshez.");
const[folderNames, setFolderNames] = useState([]);

useEffect(() => {

    fetch('http://localhost:2022/softmagic/foldernames', {method:'GET', cache: 'no-cache'})
    .then((response) => response.json())
    .then((folderNames) => setFolderNames(folderNames));

  }, []);

const chosenfoldername = (event) => {
foldername = event.target.value;
}

const changeHandler = (event) => {

    if(foldername === "-"){
     alert("A fájlok kiválasztása előtt válasszon mappanevet.")
     window.location.reload();
     return;
    }

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
        window.location.reload();
        }
}

const handleSubmission = () => {
    const formData = new FormData();
for (const key of Object.keys(selectedFiles)) {
    formData.append('file', selectedFiles[key])
}
formData.append('foldername', foldername);
sendFiles(formData);
}

return( <div className="File-list">
    <p>Válasszon mappát.</p>
    {isFileSelected ? (<div className='File-data'>
    <ul>  <SelectionField selected={foldername} names={folderNames} onChange={chosenfoldername}/>
    <FileList list={selectedFiles}/>
    <InfoText info={infoText} color='black'/>
    </ul>       
        </div>) :
        <div>
            <SelectionField selected={foldername} names={folderNames} onChange={chosenfoldername}/>
            <InfoText info={infoText} color='black'/>
            </div>}
    <input className='Choose-file' type='file' name='file' accept='.txt, .pdf, .doc, .xls, .xlsx, .jpg' 
    onChange={changeHandler} multiple></input>
    <div>
        <button onClick={handleSubmission} className='Send-btn' disabled = {disabled}>Küldés</button>
    </div>
    </div>);
}

function InfoText(props){
    return(<p className='Info-text' style={{color: props.color}}>{props.info}</p>);
}

function FileList(props) {
    const store = [...props.list];
    return(<ul>
        {store.map((file, index) => <li key={index}>Fájl neve: <b>{file.name}</b> mérete: <b>{file.size}</b> byte</li>)}
        </ul>); 
}

function SelectionField(props)  {
    
    return(<>
        <select className='Selection-field' onChange={props.onChange} defaultValue={props.selected}>
        {props.names.map((name, index) => <option key={index}>{name}</option>)}
        </select></>);
}

function getLeftOverFileSize(files){
    const store = [...files];
    let sum = 0;
    store.map((file) => sum += parseInt(file.size));
    return MAX_SIZE - sum;
}

async function sendFiles(fileList){

    await fetch('http://localhost:2022/softmagic/upload',  {
       method: 'POST',
       body: fileList,
       cache: 'no-cache'
   })
   
   .then((response) => response.text())
   .then((text) => {alert(text);})
   .catch((error) => {alert(error);})
   window.location.reload();
}

export default FileUploadPage;
