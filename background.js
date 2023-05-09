
async function reddenPage() {
    const articles = Array.from(document.querySelector('#cafe_main').contentWindow.document.querySelectorAll('.type_up'));

    if (articles.length === 0) {
        alert('추천글이 없어 형');
        return;
    }
    
    articlesToRemove = [];
        
    for (article of articles) {
        const link = article.querySelector('a.article');
        const articleId = link.href.split('articleid=')[1];        

        link.setAttribute('target', '_blank');
        link.click();

        articlesToRemove.push(articleId);
    }
    
    console.log("Open Done");
    
    const link = articles[0].querySelector('a.article');
    const clubId = link.href.split('clubid=')[1].split('&')[0];
    const menuId = link.href.split('menuid=')[1].split('&')[0];

    for (articleId of articlesToRemove) {
        // 좋아요 목록에서 해당 게시글 삭제
        // HideUpArticle.nhn?clubid=30893734&page=1&menuid=3&boardtype=L&articleid=' + articleId;
        await fetch('https://cafe.naver.com/HideUpArticle.nhn?clubid=' + clubId + '&page=1&menuid=' + menuId + '&boardtype=L&articleid=' + articleId);
    }

    console.log("Remove Done. Refreshing...");

    const URL = `https://cafe.naver.com/ArticleList.nhn?search.clubid=${clubId}&search.menuid=${menuId}&userDisplay=50&search.boardtype=L&search.specialmenutype=&search.totalCount=501&search.page=1`;
    
    const newLink = document.createElement('a');
    newLink.setAttribute('href', URL);
    newLink.click();
     
    console.log('done');     
}
  
chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes('chrome://')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: reddenPage
        });
    }
});
