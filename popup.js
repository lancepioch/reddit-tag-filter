chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == "getSource") {
		var tags = request.source;
		var placeholderElement = document.querySelector(".tags");

		placeholderElement.innerHTML = '<li><label><input name="filterTag" class="filter" type="radio" checked value="">No Filter</label></li>';

		for (var i = 0; i < tags.length; i++) {
			placeholderElement.innerHTML += '<li><label><input name="filterTag" class="filter" type="radio" value="' + tags[i] + '"> ' + tags[i] + "</label></li>";
		}

		var filters = document.querySelectorAll('input.filter');
		for (var i = 0; i < filters.length; i++) {
			filters[i].addEventListener("click", changeHideTag);
		}
	}
});

function changeHideTag(event) {
	var input = event.target
	var tag = input.value;
	var checked = input.checked;

	chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
		chrome.tabs.sendMessage(tabs[0].id, {
			action: "toggleTags",
			tag: tag,
			checked: checked,
		});

	});
}

function onWindowLoad() {
	chrome.tabs.executeScript(null, { file: "background.js" });
}

window.onload = onWindowLoad;