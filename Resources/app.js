/*
 * We'll follow a really simple paradigm in this example app. It's going to be a hierarchy of tables where you can drill
 * in to individual examples for each ACS namespace.
 *
 * To facilitate that, we will have a collection of "windowFunctions" like the "Users" window, and the "Login" window.
 *
 * These are defined in the "windows" folder and its children.
 *
 * That's it! Enjoy.
 */

var win = Ti.UI.createWindow({

});

var Cloud = require('ti.cloud');

Cloud.Users.login({
	login : 'Email',
	password : 'passwoerd'
}, function(e) {
	if (e.success) {
		Cloud.Chats.getChatGroups(function(e) {
			if (e.success) {
				for (var i = 0; i < e.chat_groups.length; i++) {
					var group = e.chat_groups[i];
					// Gets Every Chat Group on ACS Server!
					alert('Success:\n' + 'id: ' + group.id + '\n' + 'created_at: ' + group.created_at + '\n' + 'number of users: ' + group.participate_users.length);
				}
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	} else {
		alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	}
});

win.open();
