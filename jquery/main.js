console.log('jquery');
/* eslint-disable no-undef */
// Did it load the first time?
let firstTime = false;

// Refer to the 'chat' Table in firebase
// (ignore this 'eslint-disable-next-line no-undef' line)
// eslint-disable-next-line no-undef
const chatDatabaseReference = firebase.database().ref('chat');

// Whenever there is a value change, this function will get 
// all the values again, and execute the following code over and over:
chatDatabaseReference.on('value', function(res) {
    // clear all messages
    $('#messages').empty();
    
    // extract the firebase value (this is a firebase thing)
    const obj = res.val();

    // if the object exists (its not null or undefined)
    obj && 
    // get the chat messages keys
    Object.keys(obj)
    // loop through each message
    .map(function(messageKey) {  

        const htmlText = $('<p/>', {
            id: messageKey,
            text: obj[messageKey].message,
            click: editMessage
        }).appendTo($('#messages'))

        // create a 'button' html element
        $('<button/>', {
            id: messageKey,
            text: 'Delete',
            click: deleteMessage
        }).appendTo(htmlText)

    })
    
    if (firstTime === false) {
        $("html, body").animate({ scrollTop: document.body.scrollHeight }, 500);
        firstTime = true;
    }
});

function sendMessage(e) {
    // if its the enter button, don't do anything
    if(e.charCode !== 13 || $('#message').val() === '') {
        return;
    }

    // send a message object to firebase
    chatDatabaseReference.push({
        message: $('#message').val()
    })

    // clear the input box
    $('#message').val('');

    // force scroll to the bottom of the page
    $("html, body").animate({ scrollTop: document.body.scrollHeight }, 500);
}

function editMessage(e) {
    if ($('#message').val() !== '') {
        chatDatabaseReference.child(e.target.id).set({ 
            message: $('#message').val() 
        });
        $('#message').val('');
    }
}

function deleteMessage(e) {
    // to prevent the message click / editMessage event from occuring
    e.stopPropagation();
    
    // setting the id's value to null will remove the message
    chatDatabaseReference.child(e.target.id).set(null);
}