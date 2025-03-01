document.addEventListener('DOMContentLoaded', function () {
    let bookmarksContainer = document.getElementById('bookmarksContainer');

    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
        function traverseBookmarks(nodes) {
            for (let node of nodes) {
                if (node.url) {
                    let div = document.createElement('div');
                    div.className = "grid-item";

                    let titleContainer = document.createElement('div');
                    titleContainer.className = "title-container";

                    let favicon = document.createElement('img');
                    favicon.src = `https://www.google.com/s2/favicons?domain=${new URL(node.url).hostname}&sz=64`;
                    favicon.className = "favicon";
                    favicon.alt = "Favicon";

                    let title = document.createElement('h2');
                    title.textContent = node.title;


                    let buttonGroup = document.createElement('div');
                    buttonGroup.className = "button-group";

                    let openButton = document.createElement('button');
                    openButton.textContent = "Open";
                    openButton.onclick = function () {
                        window.open(node.url, "_blank");
                    };


                    let removeButton = document.createElement('button');
                    removeButton.textContent = "Remove";
                    removeButton.className = "remove";
                    removeButton.onclick = function () {
                        chrome.bookmarks.remove(node.id, function () {
                            div.remove();
                        });
                    };

                    titleContainer.appendChild(favicon);
                    titleContainer.appendChild(title);
                    div.appendChild(titleContainer);
                    buttonGroup.appendChild(openButton);
                    buttonGroup.appendChild(removeButton);
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

