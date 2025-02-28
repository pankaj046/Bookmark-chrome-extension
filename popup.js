document.addEventListener('DOMContentLoaded', function () {
    let bookmarksContainer = document.getElementById('bookmarksContainer');

    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
        function traverseBookmarks(nodes) {
            for (let node of nodes) {
                if (node.url) {
                    let div = document.createElement('div');
                    div.className = "grid-item";

                    // Title
                    let title = document.createElement('h2');
                    title.textContent = node.title;

                    // Button container
                    let buttonGroup = document.createElement('div');
                    buttonGroup.className = "button-group";

                    // Open button
                    let openButton = document.createElement('button');
                    openButton.textContent = "Open";
                    openButton.onclick = function () {
                        window.open(node.url, "_blank");
                    };

                    // Remove button
                    let removeButton = document.createElement('button');
                    removeButton.textContent = "Remove";
                    removeButton.className = "remove";
                    removeButton.onclick = function () {
                        chrome.bookmarks.remove(node.id, function () {
                            div.remove(); // Remove from UI
                        });
                    };

                    // Append elements
                    buttonGroup.appendChild(openButton);
                    buttonGroup.appendChild(removeButton);
                    div.appendChild(title);
                    div.appendChild(buttonGroup);

                    bookmarksContainer.appendChild(div);
                }
                if (node.children) {
                    traverseBookmarks(node.children);
                }
            }
        }
        traverseBookmarks(bookmarkTreeNodes);
    });
});

