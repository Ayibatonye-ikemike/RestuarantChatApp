 // Establish a socket connection to the server
 const socket = io();

 // Query DOM elements
 const inputField = document.getElementById("inputField");
 const IjawFoods = document.getElementById("IjawFoods");
 
 // Helper function to append a message to the chat box
 function appendMessage(message, sender) {
   const messageElement = document.createElement("div");
   messageElement.classList.add("message-text", sender);
   messageElement.textContent = message;
   
   const timestamp = new Date().toLocaleTimeString(); // create timestamp
   const timestampElement = document.createElement("span"); // create span element for timestamp
   timestampElement.classList.add("timestamp");
   timestampElement.textContent = timestamp;
   
   const messageContainer = document.createElement("div");
   messageContainer.classList.add("message-container");
   messageContainer.appendChild(messageElement);
   messageContainer.appendChild(timestampElement);
   IjawFoods.appendChild(messageContainer);
   IjawFoods.scrollTop = IjawFoods.scrollHeight;
 }
 
 // Handle sending messages
 function sendMessage() {
   const message = inputField.value.trim();
   if (message === "") {
     return;
   }
   appendMessage(message, "user");
   socket.emit("user-message", message);
   inputField.value = "";
 }
 
 // Handle receiving messages from the server
 socket.on("bot-message", (message) => {
   appendMessage(message, "bot");
 });
 
 // Attach event listeners
 document.querySelector("form").addEventListener("submit", (event) => {
   event.preventDefault();
   sendMessage();
 });
 
 document.getElementById("sendButton").addEventListener("click", sendMessage);
 
 document.getElementById("inputField").addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
     event.preventDefault();
     sendMessage();
   }
 });
 