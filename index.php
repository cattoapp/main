<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catto Home</title>
    <meta property="og:title" content="Default Title" />
    <meta property="og:description" content="Default Description" />
    <meta property="og:image" content="URL_TO_DEFAULT_IMAGE" />
    <link rel="stylesheet" href="styles.css">

</head>

<body>
    <?php
// PHP code to echo something
echo "Hello, World!";
?>
	<!-- Title Container Div -->
	<div class="sticky">
    	<div id="titlecontainer" class="title-container">
	    	<div id="title">Meow Wall</div>
            <div id="add_post" class="top-button">
            	<img id="add_post_icon" class="small-icon" src="ic_create_white.png">
            </div>
        </div>
    <!-- Navigations Div 
    	<div id="navigation" class="navigation-buttons">
	    	<div id="navigation_chat" class="navigation-button">
		    	<img id="navigation_chat_icon" class="navi-icon" alt="Chat" src="ic_question_answer_grey.png">
	    	</div>
	    	<div id="navigation_friends" class="navigation-button">
		    	<img id="navigation_friends_icon" class="navi-icon" alt="Friends" src="ic_people_grey.png">
	    	</div>
    		<div id="navigation_home" class="navigation-button">
    			<img id="navigation_home_icon" class="picked-navi-icon" alt="Home" src="ic_home_white.png">
    		</div>
	    	<div id="navigation_notif" class="navigation-button">
	    		<img id="navigation_notif_icon" class="navi-icon" alt="Notification" src="ic_notifications_grey.png">
    		</div>
    		<div id="navigation_profile" class="navigation-button">
    			<img id="navigation_profile_icon" class="navi-icon" alt="Profile" src="ic_timer_auto_grey.png">
    		</div>
    	</div>
    -->
	</div>
	
	
	<!-- List Div -->
	<div id="list"></div>
	
	<!-- Library & JS -->
    <script src="CattoCipherLibrary.js"></script>
    <script type="module" src="script.js" defer></script>
</body>
</html>