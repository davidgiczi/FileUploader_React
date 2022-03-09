import React from 'react';
import { useState } from 'react';

function FileUploadPage(){
const[selectedFiles, setSelectedFiles] = useState();
const[isFileSelected, setIsFileSelected] = useState(false);
const[disabled, setDisabled] = useState(true);

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
        cors: 'no-cors'
    })
    
    .then((response) => response.json())
    .then((text) => {alert(text);})
    .catch(() => {alert("Fájl(ok) elküldve.");})
    window.location.reload();
}

return( <div className="File-list">

    {isFileSelected ? (<div className='File-data'><ul>
    <FileList list={selectedFiles}/>
    </ul>       
        </div>) :
        <div>
            Maximum feltölthető adat: 5MB
            </div>}
    <input type='file' name='file' accept='.txt, .pdf, .doc, .xls, .xlsx'  onChange={changeHandler} multiple></input>
    <div>
        <button onClick={handleSubmission} className='Send-btn' disabled = {disabled}>Küldés</button>
    </div>
    </div>);
}


function FileList(props) {
    const store = [...props.list];
    return(<ul>
        {store.map((file, index) => <li key={index}>Fájl neve: <b>{file.name}</b> mérete: <b>{file.size}</b> byte</li>)}
        </ul>); 
}

export default FileUploadPage;
