
var agree = confirm("Приступаем?");
console.log(agree)
if(agree==true){
	alert("Расчет каблука")
} else{
	alert("Ходите босиком")
}


function calculateBoots(){
    bootsSize = document.querySelector("#length").value;
	gender = getGender();
	if(gender=="male"){
		showPopup("manBoots.jpg","ваша обувь" )
	}
	else{
		length= Math.floor(bootsSize/7);
		if(length>5){
			showPopup("highHeels.png","высота каблука "+length+" см." )
		}else{
			showPopup("lowHeels.png","высота каблука "+length+" см." )
		}
		
	}
	
}
function getGender(){
	var radioButtons = document.getElementsByName('contact');
	for (var i = 0; i < radioButtons.length; i++) {
	  if (radioButtons[i].checked) {
		// Get the value of the selected radio button
		var selectedValue = radioButtons[i].value;
		return selectedValue;
		}
	}
}
function showPopup(fileName, text) {
  var popup = window.open('', '', 'width=400,height=400');
  popup.document.write('<html><body>');
  popup.document.write('<p>'+text+'</p>');
  popup.document.write('<img src="./static/'+fileName+'" alt="Описание изображения">');
  popup.document.write('</body></html>');
}