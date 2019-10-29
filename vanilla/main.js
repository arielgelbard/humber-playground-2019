console.log('vanilla');
// Did it load the first time?
let firstTime = false;

// Refer to the 'chat' Table in firebase
// (ignore this 'eslint-disable-next-line no-undef' line)
// eslint-disable-next-line no-undef
const chatDatabaseReference = firebase.database().ref('chat');

// Whenever there is a value change, this function will get 
// all the values again, and execute the following code over and over:
chatDatabaseReference.on('value', function(res) {
    // get the html reference by its id (that is specified in the .html file)
    const messages = document.getElementById('messages');
    
    // clear all messages
    document.getElementById('messages').innerHTML = '';
    
    // extract the firebase value (this is a firebase thing)
    const obj = res.val();

    // if the object exists (its not null or undefined)
    obj && 
    // get the chat messages keys
    Object.keys(obj)
    // loop through each message
    .map(function(messageKey) {  

        // create a 'p' html element
        let htmlText = document.createElement('p');

        // assign message text from firebase
        htmlText.innerText = obj[messageKey].message;

        // assign the message id to the html element
        htmlText.id = messageKey;

        // whenever you click on the message text, it will execute the editMessage function
        htmlText.onclick = editMessage;


        // create a 'button' html element
        const trashButton = document.createElement('button');
        trashButton.textContent = 'Delete';
        trashButton.id = messageKey;
        trashButton.onclick = deleteMessage;
        
        // add the button to the message text
        htmlText.append(trashButton);

        // add the text and button to the messages area
        messages.append(htmlText);
    })
    
    if (firstTime === false) {
        window.scrollTo(0, document.body.scrollHeight);
        firstTime = true;
    }
});

function sendMessage(e) {
    // if its the enter button, don't do anything
    if(e.charCode !== 13) {
        return;
    }

    // get the message value from the html input element
    const message = document.getElementById('message').value;
    
    // send a message object to firebase
    chatDatabaseReference.push({
        message: message
    })

    // clear the input box
    document.getElementById('message').value = '';

    // force scroll to the bottom of the page
    window.scrollTo(0, document.body.scrollHeight);
}

function editMessage(e) {
    let messageVal = document.getElementById('message').value;
    if (messageVal !== '') {
        chatDatabaseReference.child(e.target.id).set({ message: messageVal });
        messageVal = '';
    }
}

function deleteMessage(e) {
    // to prevent the message click / editMessage event from occuring
    e.stopPropagation();
    
    // setting the id's value to null will remove the message
    chatDatabaseReference.child(e.target.id).set(null);
}