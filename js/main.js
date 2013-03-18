// alert("JavaScript works!");

// Jamal Moubarak
// Project 3
// VFW 1303

//Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", function(){

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//Establish Variable Defaults & Run Initial Functions
	var installGroups = ["--Type of System--", "Surveillance", "Audio / Video", "Network", "POS"],
		warrantyValue,
		installedValue,
		errMsg = $("errors");
	;
	
	//Create select field and give items.
	function installType(){
		var getTag = document.getElementsByTagName("form"),
			getLi = $("select"),
			getSelect = document.createElement("select");
			getSelect.setAttribute("id", "groups");
		for(var i=0, j=installGroups.length; i<j; i++) {
			var getOption = document.createElement("option");
			var optionText = installGroups[i];
			getOption.setAttribute("value", optionText);
			getOption.innerHTML = optionText;
			getSelect.appendChild(getOption);
		}
		getLi.appendChild(getSelect);
	}
	installType();
	
	//Turn the links on or off.
	function linkControls(n){
		switch(n){
			case "on":
				$("installForm").style.display = "none";
				$("clear").style.display = "inline";
				$("displayData").style.display = "none";
				$("addClient").style.display = "inline";
				break;
			case "off":
				$("installForm").style.display = "block";
				$("clear").style.display = "inline";
				$("displayData").style.display = "inline";
				$("addClient").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
		//Find the value of radio button that is selected.
	function getRadio(){
		var radios = document.forms[0].warranty;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				warrantyValue = radios[i].value;
			}
		}
	}
	
	//Get the value of the checkbox when clicked.
	function getChecks(){
		var checkbox = document.forms[0].installed;
		for(var i=0; i<checkbox.length; i++){
			if(checkbox[i].checked){
				installedValue = checkbox.value;
			}else{
				installedValue = "No Items Installed";
			}
		}
	}
	
	//Saves the form data into local storage.
	function saveData(){
		var id = Math.floor(Math.random()*100000001);
		getRadio();
		getChecks();
		var item 				= {};
			item.group 			= ["Install:", $("groups").value];
			item.compname		= ["Company Name:", $("compname").value];
			item.contname		= ["Contact Name:", $("contname").value];
			item.contphone		= ["Contact Phone #:", $("contphone").value];
			item.contemail		= ["Contact Email:", $("contemail").value];
			item.date			= ["Install Date:", $("date").value];
			item.ipaddress		= ["Ip Address:", $("ipaddress").value];
			item.sysuser		= ["System Username:", $("sysuser").value];
			item.syspass		= ["System Password:", $("syspass").value];
			item.installed 		= ["The client has these systems installed:", installedValue];
			item.warranty 		= ["The client has this warranty:", warrantyValue];
			item.quanity 		= ["Quantity (# of Cameras, TV's, POS Terminals, etc):", $("quanity").value];
			item.price			= ["Price:", $("price").value];
			item.notes			= ["Notes:", $("notes").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Client Information is Saved!");
		console.log(id);
	}
	
	//JSON DATA: Create an object to test when no data is saved in Local Storage.
	function autoFillData(){
		var json = {
			"client1": {
				"install": ["Install:", "POS"],
				"compname": ["Company Name:", "Eskatech"],
				"contname": ["Contact Name:", "Jamal Moubarak"],
				"contphone": ["Contact Phone #", "734-819-1211"],
				"contemail": ["Contact Email:", "jamal@eskatech.com"],
				"date": ["Install Date:", "2013-03-14"],
				"ipaddress": ["Ip Address:", "192.168.001.099"],
				"sysuser": ["System Username:", "admin"],
				"syspass": ["System Password:", "admin"],
				"installed": ["The client has these systems installed:", "POS"],
				"warranty": ["The client has this warranty:", "3 Year"],
				"quanity": ["Quanity:", "4"],
				"price": ["Price", "$4595.00"],
				"notes": ["Notes:", "We installed 4 POS systems at the front counter off of a network switch we installed"]			
			},
			"client2":{
				"install": ["Install:", "Surveillance"],
				"compname": ["Company Name:", "Fairfield Inn"],
				"contname": ["Contact Name:", "John Smith"],
				"contphone": ["Contact Phone #", "555-555-2233"],
				"contemail": ["Contact Email:", "john@gmail.com"],
				"date": ["Install Date:", "2013-03-10"],
				"ipaddress": ["Ip Address:", "192.168.001.100"],
				"sysuser": ["System Username:", "john"],
				"syspass": ["System Password:", "123456"],
				"installed": ["The client has these systems installed:", "Surveillance"],
				"warranty": ["The client has this warranty:", "5 Year"],
				"quanity": ["Quanity:", "32"],
				"price": ["Price", "$7995.00"],
				"notes": ["Notes:", "We installed 8 cams 1st floor, 8 2nd floor, 8 3rd floor, 8 outside"]
			}
		};
		//Store the test data into Local Storage
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

	function editItem(){
		//Grab the data from our item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		linkControls("off");
		
		//populate the form fields with current local storage values
		$("groups").value = item.group[1];
		$("compname").value = item.compname[1];
		$("contname").value = item.contname[1];
		$("contphone").value = item.contphone[1];
		$("contemail").value = item.contemail[1];
		$("date").value = item.date[1];
		$("ipaddress").value = item.ipaddress[1];
		$("sysuser").value = item.sysuser[1];
		$("syspass").value = item.syspass[1];
		if(item.installed[1] == "Surveillance"){
			$("installed").setAttribute("checked", "checked");
		}	
		var radios = document.forms[0].warranty;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "90 Days" && item.warranty[1] == "90 Days"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "1 Year" && item.warranty[1] == "1 Year"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$("quanity").value = item.quanity[1];
		$("price").value = item.price[1];
		$("notes").value = item.notes[1];
		
		var save = $("submitButton");
		//remove the initial listener from the input save contact button
		save.removeEventListener("click", saveData);
		//change Submit button value to edit button
		$("submitButton").value = $("editClientButton");
		var editSubmit = $("editClientButton");
		//save the key value established in this function as a property of the edit submit event
		//so we can use that value when we save the data we edited
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
	}
	
			function validate(e){
			//defining the elements we want to check
			var getGroup = $("groups");
			var getcompname = $("compname");
			var getcontname = $("contname");
			var getcontphone = $("contphone");
			var getcontemail = $("contemail");
			
			//reset error messages
			errMsg.innerHTML = "";
			getGroup.style.border = "1px solid #8baceb";
			getcompname.style.border = "1px solid #8baceb";
			getcontname.style.border = "1px solid #8baceb";
			getcontphone.style.border = "1px solid #8baceb";
			getcontemail.style.border = "1px solid #8baceb";
			
			//get error messages
			var messageAry = [];
			//group validation
			if(getGroup.value=="--Type of System--"){
				var groupError = "Please choose a group.";
				getGroup.style.border = "1px solid red";
				messageAry.push(groupError);
			}
			
			//getcompname validation
			if(getcompname.value === ""){
				var compnameError = "Please enter a Company Name.";
				getcompname.style.border = "1px solid red";
				messageAry.push(compnameError);
			}
			
			//contact validation
			if(getcontname.value === ""){
				var contnameError = "Please enter a Contact Name.";
				getcontname.style.border = "1px solid red";
				messageAry.push(contnameError);
			}
			
			//contphone validation
			var re = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
			if(!(re.exec(getcontphone.value))){
				var contphoneError = "Please enter a valid phone number";
				getcontphone.style.border = "1px solid red";
				messageAry.push(contphoneError);
			}
			
			//getcontemail validation
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(!(regex.exec(getcontemail.value))){
				var contemailError = "Please enter a valid email address";
				getcontemail.style.border = "1px solid red";
				messageAry.push(contemailError);
			}
			//if there were errors, display them on the screen
			if(messageAry.length >= 1){
				for(var i=0, j=messageAry.length; 1 < j; i++){
					var txt = document.createElement("li");
					txt.innerHTML = messageAry[i];
					errMsg.appendChild(txt);
				}
				e.preventDefault();
				return false;
			}else{
				//if all is ok save our data. send the key value which came from editdata function
				//remember this key value was passed through the edit submit event listener as a property
				saveData(this.key);
			}
		}
	
		//Make item links
	//Create the edit and delete links for eash stored item in local storage
	function makeItemLinks(key, linksLi){
		//add edit singlr item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Client";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		//Add a delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Client";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);	
	}
	
	//Retrieve data from Local Storage.
	function showData(){
		linkControls("on");
		if(localStorage.length === 0){
			autoFillData();
			alert("No Clients have been entered yet.  Here is some sample data.");
		}
		//Insert data from Local Storage to the browser window.
		var chooseDiv = document.createElement("div");
		chooseDiv.setAttribute("id", "items");
		var chooseList = document.createElement("ul");
		chooseDiv.appendChild(chooseList);
		document.body.appendChild(chooseDiv);
		//$("item").style.display = "block";
		for (var i=0, len=localStorage.length; i<len; i++) {
			var chooseli = document.createElement("li");
			var linksLi = document.createElement("li");
			chooseList.appendChild(chooseli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Change the string from Local Storage back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var chooseSubList = document.createElement("ul");
			chooseli.appendChild(chooseSubList);
			for (var n in obj){
				var chooseSubli = document.createElement("li");
				chooseSubList.appendChild(chooseSubli);
				var optSubText = obj[n][0] +" "+ obj [n][1];
				chooseSubli.innerHTML = optSubText;
				chooseSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create edit and delete buttons for items in local storage.
		}
	}
	//Clear all stored data
	function clearStorage() {
		if(localStorage.length === 0){
			alert("You have no Clients to Clear.");
		}else{
			localStorage.clear();
			alert("All clients have been deleted.");
			window.location.reload();
			return false;
		}
	}
	//Set Link & Submit Click Events
	var displayData = $("displayData");
	displayData.addEventListener("click", showData);
	var clearData = $("clear");
	clearData.addEventListener("click", clearStorage);
	var save = $("submitButton");
	save.addEventListener("click", validate);
	//Set Checkbox & Radio Click Events: Attach event listener to each radio button & checkbox.
	var checkbox = document.forms[0].installed;
	for (var i=0; i<checkbox.length; i++){
		checkbox[i].addEventListener("click", getChecks);
	}
	var radios = document.forms[0].warranty;
	for (var p=0; p<radios.length; p++){
		radios[p].addEventListener("click", getRadio);
	}
});

