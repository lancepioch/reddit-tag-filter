function retrieveTitles(htmlElements) {
	var titleHTML = htmlElements;
	var regex = /\[.+?\]/g;
	var titles = [];
	var tags = [];

	for (var i = 0; i < titleHTML.length; i++) {
		var matches = regex.exec(titleHTML[i].innerText);

		if (matches != null) {
			var tag = matches[0];
			tag = tag.replace(/ /g, "-");

			if (tags.indexOf(tag) == -1) {
				tags.push(tag);
			}
		}
	}

	tags.sort();
	return tags;
}

chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == "toggleTags") {
		var titles = document.querySelectorAll("a.title");

		for (var i = 0; i < titles.length; i++) {
			var title = titles[i].innerText;
			var post = titles[i].parentElement.parentElement.parentElement;

			if (title.indexOf(request.tag) > -1 || request.tag == '') {
				// post.style.display = request.checked ? 'none' : 'inherit';
				post.style.display = 'inherit';
			} else { post.style.display = 'none'; }
			
		}
	}
});

var tags = retrieveTitles(document.querySelectorAll("a.title"));
chrome.runtime.sendMessage({
	action: "getSource",
	source: tags
});