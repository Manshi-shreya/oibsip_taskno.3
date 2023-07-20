const addTitle= document.getElementById('Title');
const addText= document.getElementById('txtar');
const addBtn= document.getElementById('btn');
const addNotes= document.getElementById('notes');
// let notes=[]; // we will push object of notes .
// local storage yaha object ko string me convert kar rhe ,
// function ke andar string ko obj me convert krenge
// localStorage.setItem('notes',JSON.stringify(notes));
showNotes(); // this will make notes history remain there even after refreshing

function addYourNotes(){
    let notes=localStorage.getItem('notes'); // array ko le rha h in the form of string from ocal storage
    if(notes===null){
        notes=[];
        // agar notes arr mila to thik nhi to fir ek arr khud bna lo
    }
    else{
        // but agr present ho to us string ko obj me convert kro
        notes=JSON.parse(notes);
    }

    // const title= addTitle.value;
    // console.log(title);
    // const notes= addText.value;

    if(addText.value==''){
        alert('Add your notes');
        return;
    }
    //   let notes=localStorage.getItem('');
    //   1---if(notes!==null){
    //     notes=JSON.parse(notes);
    //   }     --1yha ke karan error aa rha tha

//upar koi v if hoga hi satisfy uske baad object creation
    const noteObj= {
        title:addTitle.value,
        text: addText.value,
    }

    addTitle.value='';
    addText.value='';
    //update notes 
    notes.push(noteObj);
    localStorage.setItem('notes',JSON.stringify(notes));        //storage me dalne ke liye
    showNotes();   // only callong here will make the history gone on reloading , so call at top also.
    // console.log(note);
}

function showNotes(){
    let notesHTML='';
    let notes=localStorage.getItem('notes');  // it is because earlier it was a global scope and now it is local scope

    if(notes===null){
        return;  // agr koi notes mhi h to return
    }
    else{
        notes=JSON.parse(notes);   // convert string to arr or obj
    }
    for(let i=0;i<notes.length;i++){
//iterate each note and print in the box of delete.

        notesHTML+= // for deletion
        `<div id="note">
                        <button class="del" id=${i} onclick="deleteNote(${i})">delete</button>   
                        <div id="tit">${notes[i].title==="" ? 'Note':notes[i].title}</div>
                        <div id="text">${notes[i].text}</div>
                    </div>`
    }
                    addNotes.innerHTML= notesHTML;
    }
   
    function deleteNote(ind){
        let notes= localStorage.getItem('notes');
        if(notes===null){
            return;
        }
        else{
            notes=JSON.parse(notes);   // string ko obj ya arr me convert
        }
        notes.splice(ind,1);     //  del notes from index ind till count 1
        localStorage.setItem('notes',JSON.stringify(notes));    // update local storage by converting arr into string
        showNotes();            // print updated notes
    }


addBtn.addEventListener('click',addYourNotes);