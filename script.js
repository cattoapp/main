import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
const firebaseConfig = {
		apiKey: "AIzaSyCXvg8FDZ7u_I6ZQ9eVc_OS3MS6Ol4JkDI",
		authDomain: "catto-chat-app.firebaseapp.com",
		databaseURL: "https://catto-chat-app-default-rtdb.firebaseio.com",
		projectId: "catto-chat-app",
		storageBucket: "catto-chat-app.appspot.com",
		messagingSenderId: "279959835948",
		appId: "1:279959835948:web:64e15839cb38c2133d4889",
		measurementId: "G-JKMR0V7D1N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

const customView = document.getElementById('list');

const htmlContent = `<!-- Beginning of CV -->
<div id="linear1" class="container">
<div id="linear2" class="inner-container">
<img id="circleimageview1" class="circle-image" alt="profile" src="profile_default.png"></img>
<div id="linear3" class="text-container">
<div id="name" class="text">data.name</div>
<div id="username" class="text">data.username</div>
</div>
<div id="delReportBtn" class="more-btn"></div>
</div>

<!-- Description -->
<div id="description" class="text">data.postDescription</div>

<!-- Custom File -->    
<!-- Video -->
<!-- Image -->
<!-- Action Buttons -->
<div id="linear4" class="action-buttons">
<div id="like" class="action-button">
<img id="react" class="react-icon" alt="reaction" src="bw_smiling_cat.png"></img>
<div id="reacts_count" class="text">data.postReactCounts</div>
</div>
<div id="share" class="action-button">
<img id="imageview3" class="share-icon" alt="share" src="ic_share_black.png"></img>
</div>
</div>
</div>
<div id="adContainer" class="ad-container"></div>
<!-- End of CV -->`;
var pathToCheck = 'app/walls/';
var itemsRef = ref(database, pathToCheck);

get(itemsRef)
.then(snapshot => {
		if (snapshot.exists()) {
				const data = snapshot.val();
				const itemsArray = Object.values(data);
				shuffleArray(itemsArray);
				// use .slice(pos1, pos2) to load kind of position
				itemsArray.forEach(item => {
						
						
						const newItem = document.createElement('div');
						// Apply the htmlContent template with data replaced
							const userName = get(ref(database, 'app/users/' + item.uid + '/name')).then(snapshot => snapshot.val());
						    const userN = get(ref(database, 'app/users/' + item.uid + '/n')).then(snapshot => snapshot.val());
						    const userName2 = get(ref(database, 'app/users/' + item.uid + '/username')).then(snapshot => snapshot.val());
						    const pfp = get(ref(database, 'app/users/' + item.uid + '/profile')).then(snapshot => snapshot.val());
						
						
						Promise.all([userName, userN, userName2, pfp])
						.then(([name, n, username, pfp]) => {
								console.log('Name: ' + name);
								console.log('N: ' + n);
								// Rest of your code here
								if (item.privacy !== "anonymous") {
								    newItem.innerHTML = htmlContent
								    .replace('data.name', decrypt(name, n))
								    .replace('data.username', "@" + decrypt(username, n));
								} else {
									newItem.innerHTML = htmlContent
								    .replace('data.name', "Anonymous")
								    .replace('data.username', "@Anonymous");
								}
								
								if (item.description && item.description !== null) {
										newItem.innerHTML = newItem.innerHTML.replace('data.postDescription', decryptHTML(item.description, item.n));
								} else {
										newItem.innerHTML = newItem.innerHTML.replace('data.postDescription', "");
								}
								
								// Conditionally add video tag if 'video' property exists in the item
								if (item.url && item.type == 2) {
										newItem.innerHTML = newItem.innerHTML.replace('<!-- Video -->', `
										<div id="videolinear" class="video-container">
										<video id="videoplayer" controls preload="metadata">
										<source src="${item.url}" type="video/mp4">
										Your browser does not support the video tag.
										</video>
										</div>
										`);
								}
								
								if (item.reactors && item.reactors !== null) {
										newItem.innerHTML = newItem.innerHTML.replace('data.postReactCounts', Object.keys(item.reactors).length)
								} else {
										newItem.innerHTML = newItem.innerHTML.replace('data.postReactCounts', 'Grin')
								}
								
						
									if (pfp !== "default" && item.privacy !== "anonymous") {
										newItem.innerHTML = newItem.innerHTML.replace('profile_default.png', pfp);
									}
								
								
								if (item.url && item.type == 1) {
										newItem.innerHTML = newItem.innerHTML.replace('<!-- Image -->', '<img id="imagepost" class="image-container" src="' + item.url +'"/>');
								}
								
								if (item.url && item.type == 3) {
										var dFN = decrypt(item.file_name, item.n);
										newItem.innerHTML = newItem.innerHTML.replace('<!-- Custom File -->', `<div id="customfile" class="file-container">
										<img id="imageview5" class="file-icon" src="ic_insert_drive_file_black.png"/>
										<div id="linear6" class="file-text-container">
										<div id="file_name" class="text">${dFN}</div>
										<div id="textview5" class="small-text">(Warning: This file might contains viruses.) [Click To Download]</div>
										
										</div>
										</div>`);
										
										// Add event listener to the download button
										const downloadButton = newItem.querySelector('.file-container');
										downloadButton.addEventListener('click', function() {
												// Show confirmation dialog
												const userResponse = confirm('Do you want to download this file?');
												
												// If user clicks "Yes"
												if (userResponse) {
														// Construct the Firebase Storage URL for the file
														const fileUrl = item.url;
														
														// Create an anchor element
														const anchor = document.createElement('a');
														anchor.href = fileUrl;
														anchor.target = '_blank'; // Open the link in a new tab/window
														anchor.download = dFN; // Specify the desired file name
														
														// Programmatically trigger a click event on the anchor element
														anchor.click();
												} else {
														// User clicked "No", do nothing
												}
										});
								}
								if (item.privacy && item.privacy !== null &&( item.privacy == "public" | item.privacy == "anonymous")) {
										customView.appendChild(newItem);
								} else {
									newItem.remove();
								}
								
						})
						.catch(error => {
								console.error(error);
						});
						
				});
		} else {
				console.log('No data available in the database.');
		}
})
.catch(error => {
		console.error(error);
});
const post = document.getElementById('add_post');
post.addEventListener('click', function() {
	onAuthStateChanged(auth, (user) => {
		if (user) {
        	window.location.href = "https://walls.cattoapp.repl.co/new/";
        } else {
        	window.location.href = "https://auth.cattoapp.repl.co/signup/?d=1";
        }
    });	
});

function shuffleArray(array) {
		// Fisher-Yates shuffle algorithm
		for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
		}
}


// For Videos

const videos = document.querySelectorAll('video');

videos.forEach(video => {
		video.addEventListener('play', function() {
				videos.forEach(otherVideo => {
						if (otherVideo !== video && !otherVideo.paused) {
								otherVideo.pause();
						}
				});
		});
});
