// function close_after_done(url) {
//     chrome.tabs.create({
//         url: url
//     }, function(tab) {
//         chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
//             if (tabId === tab.id && changedProps.status === 'complete') {
//                 chrome.tabs.onUpdated.removeListener(listener);
//                 chrome.tabs.remove(tabId, function() {
//                     console.log("Tab removed");
//                 });
//             }
//         });
//     });
// }

function reddenPage() {
    const articles = Array.from(document.querySelector('#cafe_main').contentWindow.document.querySelectorAll('.type_up'));    
    for (const article of articles) {
        const link = article.querySelector('a.article');        

        const articleId = link.href.split('articleid=')[1];
        const clubId = link.href.split('clubid=')[1].split('&')[0];
        const menuId = link.href.split('menuid=')[1].split('&')[0];
        
        link.setAttribute('target', '_blank');
        link.click();
        
        // 좋아요 목록에서 해당 게시글 삭제
        // HideUpArticle.nhn?clubid=30893734&page=1&menuid=3&boardtype=L&articleid=' + articleId;
        fetch('https://cafe.naver.com/HideUpArticle.nhn?clubid=' + clubId + '&page=1&menuid=' + menuId + '&boardtype=L&articleid=' + articleId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });

        console.log(articleId);
    }
}
  
chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes('chrome://')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: reddenPage
        });
    }
});
