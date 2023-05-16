var count = 0;

// find a link containing '/random' in the href
var element = document.querySelector('a[href*="/random"]');

element.addEventListener('click', function() {
    count++;
    counter.textContent = '코인: ' + count;  
});

var counter = document.createElement('div');
counter.id = 'counter';
counter.textContent = '코인: 0';
counter.style.position = 'fixed';
counter.style.right = '0';
counter.style.top = '0';
counter.style.backgroundColor = 'white';

document.body.appendChild(counter);




