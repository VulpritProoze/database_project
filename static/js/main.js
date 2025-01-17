let modalIdNo = '';		// updated within editStudent()

function deleteFlash(button) {
	let element = button.closest('.flash-msg');
	element.classList.remove('opacity-100');
	element.classList.add('opacity-0');
	setTimeout(function() {
		element.remove();
	},300);
}

function handleLoginSubmit() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	if (username == '' || password == '') {
		alert('Please fill in all fields.');
		return false;
	} else {
		handleRememberMeCheck();
		return true;
	}
}

// header-allow-default-btn
let headerAllowDefaultBtnFlag = false;
function toggleHeaderAllowDefault() {
	headerAllowDefaultBtnFlag = !headerAllowDefaultBtnFlag;
	let headerAllowDefaultBtnParent = document.querySelector("#header-allow-default-btn").parentElement;

	if (headerAllowDefaultBtnFlag) {
		headerAllowDefaultBtnParent.classList.add('bg-blue-300');
		headerAllowDefaultBtnParent.classList.remove('hover:bg-blue-100');
		removeAddStudentDefaultChecks();
	} else {
		headerAllowDefaultBtnParent.classList.remove('bg-blue-300');
		headerAllowDefaultBtnParent.classList.add('hover:bg-blue-100');
		addStudentDefaultChecks();
	}
}

function removeAddStudentDefaultChecks() {
	let studentModalForm = document.querySelector('#student-modal-form');

	removeAddStudentRequiredAttr();
	studentModalForm.setAttribute('onsubmit', 'return notDefaultIsFields()');
}

function addStudentDefaultChecks() {
	let studentModalForm = document.querySelector('#student-modal-form');

	studentModalForm.setAttribute('onsubmit', 'return isFields()');
}

function removeAddStudentRequiredAttr() {
	let idNo = document.getElementById('idno');
	let lastName = document.getElementById('lastname');
	let firstName = document.getElementById('firstname');
	let courseName = document.getElementById('course');
	let courseLevel = document.getElementById('level');
	
	idNo.required = false;
	lastName.required = false;
	firstName.required = false;
	courseName.required = false;
	courseLevel.required = false;
}

function AddStudentRequiredAttr() {
	let idNo = document.getElementById('idno');
	let lastName = document.getElementById('lastname');
	let firstName = document.getElementById('firstname');
	let courseName = document.getElementById('course');
	let courseLevel = document.getElementById('level');
	
	idNo.required = true;
	lastName.required = true;
	firstName.required = true;
	courseName.required = true;
	courseLevel.required = true;
}

function notDefaultIsFields() {
	return true;
}

// student-search-input
let headerQueryStudentFlag = false;

function toggleHeaderQueryStudent() {
	headerQueryStudentFlag = !headerQueryStudentFlag;
	headerQueryStudentBtnParent = document.querySelector('#header-query-student-btn').parentElement;

	const query = document.querySelector('#student-search-input');
	if (headerQueryStudentFlag) {
		query.classList.remove('hidden');
		headerQueryStudentBtnParent.classList.add('bg-blue-300');
		headerQueryStudentBtnParent.classList.remove('hover:bg-blue-100');
	} else {
		query.classList.add('hidden');
		headerQueryStudentBtnParent.classList.remove('bg-blue-300');
		headerQueryStudentBtnParent.classList.add('hover:bg-blue-100');
	}
}

function searchStudentTable() {
	const input = document.querySelector("#student-search-input");
	const filter = input.value.toLowerCase();
	const table = document.querySelector("#student-info-table");
	const rows = table.getElementsByTagName('tr');
	let visibleRowCount = 0;

	for (let i=1; i<rows.length; i++) {
		const cells = rows[i].getElementsByTagName("td");
		let rowContainsFilter = false;

		for (let j=0; j<cells.length; j++) {
			const cellText = cells[j].textContent || cells[j].innerText;
			if (cellText.toLowerCase().indexOf(filter) > -1) {
				rowContainsFilter = true;
				break;
			}
		}

		if (rowContainsFilter) {
			rows[i].style.display = "";
			visibleRowCount++;
		} else {
			rows[i].style.display = "none";
		}
	}

	const emptyTableSpan = document.querySelector("#empty-student-table-span");
	if (!visibleRowCount) {
		emptyTableSpan.classList.remove('hidden');
	} else {
		emptyTableSpan.classList.add('hidden');
	}
}

// header-delete-null-btn
function deleteNullStudents() {
	if (promptDeleteNullStudents()) {
		window.location.href = 'delete_null_students';
	} else {
		console.log('deleting null student cancelled')
	}
}

function promptDeleteNullStudents() {
	return confirm("Do you really want to delete all students with null values?");
}

// updateThreeRecords()
function updateThreeRecords() {
	if (promptUpdateThreeStudents()) {
		window.location.href = 'update_three_students';
	}
}

function promptUpdateThreeStudents() {
	return confirm("Do you really want to update three students with same values? ('Benjamin Graham') ");
}

// login remember me
addEventListener('load', function() {
	if (window.location.pathname === index_path) {
		const rememberedUsername = localStorage.getItem('rememberedUsername');
		const rememberedPassword = localStorage.getItem('rememberedPassword');
		document.getElementById('username').value = rememberedUsername;
		document.getElementById('password').value = rememberedPassword;
		console.log(rememberedUsername, rememberedPassword);
	}
})

function handleRememberMeCheck() {
	let check = document.getElementById('remember-check');
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	if (check.checked) {
		localStorage.setItem('rememberedUsername', username);
		localStorage.setItem('rememberedPassword', password);
	}
}

function dropMenu() {
	let headerBtnFlag = document.getElementById('dropdown-flag');
	let dropdown = document.getElementById('settings-dropdown');

	headerBtnFlag.checked = !headerBtnFlag.checked;

	if (headerBtnFlag.checked) {
		dropdown.classList.remove('hidden')

		setTimeout( function() {
			dropdown.classList.remove('-translate-y-10');
			dropdown.classList.remove('opacity-0');
			dropdown.classList.add('translate-y-0');
			dropdown.classList.add('opacity-100');
		}, 100)
	} else {
		dropdown.classList.remove('translate-y-0');
		dropdown.classList.remove('opacity-100');
		dropdown.classList.add('-translate-y-10');
		dropdown.classList.add('opacity-0');

		setTimeout( function() {
			dropdown.classList.add('hidden')
		}, 600)
	}
}

function closeStudentModal() {
	let modal = document.getElementById('student-modal');
	let modalCard = document.getElementById('student-modal-card');
	hideModal(modal, modalCard);

	let idNo = document.getElementById('idno');
	let lastName = document.getElementById('lastname');
	let firstName = document.getElementById('firstname');
	let courseName = document.getElementById('course');
	let courseLevel = document.getElementById('level');
	let qrCode = document.getElementById('qrcode');
	let imageSrc = document.getElementById('image');
	let imageUploadSrc = document.getElementById('image-upload');

	idNo.value = '';
	lastName.value = '';
	firstName.value = '';
	courseName.value = '';
	courseLevel.value = '';
	imageUploadSrc.value = '';
	try {
		document.getElementById('webcam-result').querySelector('img').src = '';
	} catch (err) {
		console.log('Webcam inner html dont yet exist!')
	}

	setTimeout( function() {
		qrCode.src = defaultImg;
		imageSrc.src = defaultImg;
	}, 1000);
}

function isFields() {
	const idNo = document.getElementById('idno').value;
	const lastName = document.getElementById('lastname').value;
	const firstName = document.getElementById('firstname').value;
	const courseName = document.getElementById('course').value;
	const courseLevel = document.getElementById('level').value;
	const temp_img = document.getElementById('image').src;
	const imageSrc = substringer(temp_img, 'static/img');

	console.log(imageSrc, defaultImg);
	
	if (!idNo || !lastName || !firstName || !courseName || !courseLevel) {
		alert('Please fill in all the fields.');
		return false;
	} else if (imageSrc == defaultImg) {
		alert('Please pick an image or take a snapshot.');
		console.log('image = defaultimg');
		return false;
	} else {
		return true;
	}
}

// slice string starting from phrase
function substringer(str, phrase) {
    const index = str.indexOf(phrase);
    str = (index !== -1) ? str.slice(index) : ''; 
    return str;
}

// table if empty
addEventListener('load', function(){
	if (window.location.pathname == student_info_path) {
		let emptyStudentStringSpan = document.getElementById('empty-student-table-span');
		// empty-student-table-span
		const student = document.querySelectorAll('#student-info-table tbody tr').length;
		
		if (student) {
			emptyStudentStringSpan.classList.add('hidden');
		} else {
			emptyStudentStringSpan.classList.remove('hidden');
		}
	}
});

function deleteStudent(button) {
	const idno = button.dataset.idno;
	console.log(idno)
	const ok = confirm("Are you sure you want to delete this student? All of the student's relevant attendance records will also be deleted. This is currently NOT RECOVERABLE.");
	if (ok) {
		const path = delete_student_path;
		const kwargs = {idno:idno};
		postData(path, kwargs);
	}
}

function postData(path, kwargs, method='post') {
	const form = document.createElement('form');
	form.method = method;
	form.action = path;

	for (const key in kwargs) {
		const hiddenField = document.createElement('input');
		hiddenField.type = 'hidden';
		hiddenField.name = key;
		hiddenField.value = kwargs[key];

		form.appendChild(hiddenField);
	}

	document.body.appendChild(form);
	form.submit();
	form.remove();
}

function addStudent() {
	let modal = document.getElementById('student-modal');
	let modalCard = document.getElementById('student-modal-card');
	
	showModal(modal, modalCard);
	document.getElementById('edit-add-flag').value = 'add';
	console.log('EDIT ADD FLAG: ' + document.getElementById('edit-add-flag').value);

	let addStudentTitle = document.getElementById('add-student-title');
	let editStudentTitle = document.getElementById('edit-student-title');
	addStudentTitle.classList.remove('hidden');
	editStudentTitle.classList.add('hidden');
	
	document.getElementById('idno').readOnly = false;
	document.getElementById('image').src = defaultImg;
}

function editStudent(button) {
	let modal = document.getElementById('student-modal');
	let modalCard = document.getElementById('student-modal-card');
	showModal(modal, modalCard);

	let editFlag = document.getElementById('edit-add-flag');
	editFlag.value = 'edit';
	console.log('EDIT ADD FLAG: ' + document.getElementById('edit-add-flag').value);
	modalIdNo = button.dataset.idno;

	let addStudentTitle = document.getElementById('add-student-title');
	let editStudentTitle = document.getElementById('edit-student-title');
	addStudentTitle.classList.add('hidden');
	editStudentTitle.classList.remove('hidden');

	const idno = button.dataset.idno;
	const lastname = button.dataset.lastname;
	const firstname = button.dataset.firstname;
	const course = button.dataset.course;
	const level = button.dataset.level;
	const image = button.dataset.image;

	document.getElementById('idno').value = idno;
	document.getElementById('idno').readOnly = true;
	document.getElementById('lastname').value = lastname;
	document.getElementById('firstname').value = firstname;
	document.getElementById('course').value = course;
	document.getElementById('level').value = level;
	document.getElementById('image').src = image;

	if (image == 'None') {
		document.getElementById('image').src = defaultImg;
	}
}

function toggleSwitchToCam() {
	let editFlag = document.getElementById('switch-to-cam-flag');
	let cameraBtn = document.getElementById('camera-button');

	if (editFlag.checked == true) {
		document.getElementById('modal-hide-when-edit').classList.add('hidden');
		document.getElementById('modal-show-when-edit').classList.remove('hidden');
		cameraBtn.classList.remove('hidden');
		try {
			Webcam.attach( '#webcam' );
			setWebcam();
		} catch (err) {
			console.log("toggleSwitchToCam: ", err);
		}
	} else {
		document.getElementById('modal-hide-when-edit').classList.remove('hidden');
		document.getElementById('modal-show-when-edit').classList.add('hidden');
		cameraBtn.classList.add('hidden');
		closeWebcam();
	}

	editFlag.checked = !editFlag.checked;
}

function setWebcam() {
	const webcamContainer = document.getElementById('webcam');
	const height = webcamContainer.offsetHeight;
	const width = webcamContainer.offsetWidth;
	console.log("w: " + width)
	console.log("h: " + height)
	Webcam.set({
		width: width,
		height: height
	})
}

function takeSnapshot() {
	Webcam.snap( function(data_uri) {
		document.getElementById('webcam-result').innerHTML = '<img src="' + data_uri + '"/>';
	})
	document.getElementById('image').src = document.getElementById('webcam-result').querySelector('img').src;
	
	console.log('attempting to upload snap...')
	let webcamResultElement = document.getElementById('webcam-result').querySelector('img');
	let webcamInputElement = document.getElementById('image-upload');
	base64ToFileStorageObject(webcamResultElement.src, "webcam_snapshot", webcamInputElement);	
	console.log('webcam: ', webcamInputElement.value);

}

function closeWebcam() {
	if (Webcam.live) {
		Webcam.reset()
	}
}

// Revert changes in "Edit" mode or remove new data inputted in modal in "Add" mode
function cancelData(id) {
	const flag = document.getElementById('edit-add-flag');
	console.log('EDIT ADD FLAG: ' + document.getElementById('edit-add-flag').value);
	const button = document.getElementById("edit-button-".concat(id));

	let idNo = document.getElementById('idno');
	let lastName = document.getElementById('lastname');
	let firstName = document.getElementById('firstname');
	let courseName = document.getElementById('course');
	let courseLevel = document.getElementById('level');
	let imageSrc = document.getElementById('image');
	let imageUploadSrc = document.getElementById('image-upload');

	if (flag.value == "edit") {
		const idno = button.dataset.idno;
		const lastname = button.dataset.lastname;
		const firstname = button.dataset.firstname;
		const course = button.dataset.course;
		const level = button.dataset.level;
		const image = button.dataset.image;
		idNo.value = idno;
		lastName.value = lastname;
		firstName.value = firstname;
		courseName.value = course;
		courseLevel.value = level;
		imageSrc.src = image;
		imageUploadSrc.value = '';
		try {
			document.getElementById('webcam-result').querySelector('img').src = '';
		} catch (err) {
			console.log('Webcam inner html dont yet exist!    ', err)
		}
	} else {
		idNo.value = '';
		lastName.value = '';
		firstName.value = '';
		courseName.value = '';
		courseLevel.value = '';
		imageSrc.src = defaultImg;
		imageUploadSrc.value = '';
		try {
			document.getElementById('webcam-result').querySelector('img').src = '';
		} catch (err) {
			console.log('Webcam inner html dont yet exist!    ', err)
		}
	}
}

function showModal(modal, modalCard) {
	modal.classList.remove('hidden');

	// Delay starting transitions by a bit after removing 'hidden' so
	// that we can be assured these transitions can load.
	setTimeout( function() {
		modal.classList.remove('bg-black/0');
		modal.classList.add('bg-black/40');
		modalCard.classList.remove('opacity-0');
		modalCard.classList.remove('translate-y-3/4');
		modalCard.classList.add('opacity-100');
		modalCard.classList.add('translate-y-0');
	}, 100);
}

function hideModal(modal, modalCard) {
	modal.classList.remove('bg-black/40');
	modal.classList.add('bg-black/0');
	modalCard.classList.remove('translate-y-0');
	modalCard.classList.remove('opacity-100');
	modalCard.classList.add('translate-y-3/4');
	modalCard.classList.add('opacity-0');

	setTimeout( function() {
		modal.classList.add('hidden');
	}, 600);

	closeWebcam();
}

function showTooltip(tooltipId) {
    let tooltip = document.getElementById(tooltipId);
    tooltip.classList.remove('hidden');
    tooltip.followMouseCleanup = followMouse(tooltip);
    setTimeout(() => {
        tooltip.classList.remove('opacity-0');
        tooltip.classList.add('opacity-100');
    }, 0);
}

function hideTooltip(tooltipId) {
    let tooltip = document.getElementById(tooltipId);
    tooltip.classList.remove('opacity-100');
    tooltip.classList.add('opacity-0');
    if (tooltip.followMouseCleanup) {
    	tooltip.followMouseCleanup();
    	tooltip.followMouseCleanup = null;
    }
    setTimeout(() => {
        tooltip.classList.add('hidden');
    }, 300);
}

function followMouse(element) {
	const mouselistener = (event) => {
		const x = event.offsetX;
		const y = event.offsetY + 15;
		element.style.transform = `translate(${x}px, ${y}px`;
	};

	document.addEventListener('mousemove', mouselistener);
	return () => document.removeEventListener('mousemove', mouselistener);
}

function displayImgUpload(input) {
	if (input.files && input.files[0]){
        try {
        	let reader = new FileReader();
	        reader.onload = function(e) {
	            document.getElementById('image').src = e.target.result;
	        }
        	reader.readAsDataURL(input.files[0]);
        } catch (err) {
        	console.log('eroeroe: ' + err)
        }
    } else {
		alert('No file selected.')
	}
}

// Wa koy nasabtan ani nga function !!
// All I know is that iya iconvert ang base64 image into FileStorage object ehehe
function base64ToFileStorageObject(imageBase64, filename, inputElement) {
	// const imageBase64 = document.getElementById('webcam-result').querySelector('img').src;
	const imageBase64Sliced = imageBase64.split(',')[1];
	try {
		const imageBinary = atob(imageBase64Sliced);
		const byteArray = new Uint8Array(imageBinary.length);
		for (let i=0; i<imageBinary.length; i++) {
			byteArray[i] = imageBinary.charCodeAt(i);
		}
		const blob = new Blob([byteArray], { type: 'image/jpg' });
		filename = filename + ".jpg";
		const file = new File([blob], filename, { type: 'image/jpg' });
		// const fileInput = document.getElementById('image-upload');
		const fileInput = inputElement;
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file);
		fileInput.files = dataTransfer.files;
		fileInput.dispatchEvent(new Event("change"));
	} catch (err) {
		console.log(err)
	}
}

function isBase64(uri) {
	var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
	return base64regex.test(uri);
}
