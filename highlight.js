(function(){
    function App(){}

    App.prototype.init = function(){
        
        app.insertHtml();

        document.onmouseup = function(e) {
            var coords = app.getSelectionCoords();
            var facebookLink = document.getElementById('facebook_link');
            var tweetLink = document.getElementById('tweet_link');
            var marker = document.getElementById('marker');

            if(coords.x && coords.y !== 0 || coords.text !== ''){
                var shareMessage = encodeURIComponent('"'+coords.text+'"— '+window.location.href);
                var website = encodeURIComponent(window.location.href);
                marker.setAttribute('style', 'top:'+(e.pageY-75)+'px; left:'+(coords.x+e.pageX)/2+'px;');
                app.toggle();
                facebookLink.href = 'https://www.facebook.com/sharer/sharer.php?u='+website;
                tweetLink.href = 'https://twitter.com/intent/tweet?text='+shareMessage;
            }
            else {
                app.toggle();
                facebookLink.href = 'https://www.facebook.com/sharer/sharer.php?u=';
                tweetLink.href = 'https://twitter.com/intent/tweet?text=';
            }
        };
    }


    App.prototype.getSelectionCoords = function(){
        var sel = document.selection, range;
        var coords = {};
        coords.x = 0;
        coords.y = 0;
        coords.text = '';
        if (sel) {
            if (sel.type != "Control") {
                range = sel.createRange();
                if(range.collapsed){
                    coords.x = 0;
                    coords.y = 0;
                }
                else {
                    coords.text = sel.toString();
                    range.collapse(true);
                    coords.x = range.boundingLeft;
                    coords.y = range.boundingTop;
                }   
            }
        } else if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0).cloneRange();
                if (range.collapsed) {
                    coords.x = 0;
                    coords.y = 0;
                }
                else {
                    coords.text = sel.toString();
                    range.collapse(true);
                    var rect = range.getClientRects()[0];
                    coords.x = rect.left;
                    coords.y = rect.top;
                }
            }
        }
        return coords;
    }

    App.prototype.toggle = function(){
        var item = document.getElementById('marker');
          if (item.style.display == 'block'){
            item.style.display = 'none';
          }
          else{
            item.style.display = 'block';
          }
    }

    App.prototype.insertHtml = function(){
        var highlightStyle = 'dpq2jbebhl4ml.cloudfront.net/assets/stylesheets/highlight_1.0.css';
        var facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=';
        var tweetLink = 'https://twitter.com/intent/tweet?text=';

        var highlightMenu = document.createElement('div');
        var highlightMenuInner = document.createElement('div');
        var facebookShare = document.createElement('a');
        var tweetShare = document.createElement('a');
        var icon_first = document.createElement('span');
        var icon_second = document.createElement('span')
        var ul = document.createElement('ul');
        var li_first = document.createElement('li');
        var li_second = document.createElement('li');

        icon_first.setAttribute('class', 'icon');
        icon_second.setAttribute('class', 'icon');

        highlightMenu.setAttribute('class', 'highlight-menu');
        highlightMenu.setAttribute('id', 'marker');
        highlightMenu.setAttribute('style', 'display:none');

        highlightMenuInner.setAttribute('class', 'highlight-menu-inner');

        facebookShare.setAttribute('href', facebookLink);
        facebookShare.setAttribute('class', 'facebook-highlight-menu facebook_highlight highlightbtn icon');
        facebookShare.setAttribute('id', 'facebook_link');
        facebookShare.setAttribute('target', '_blank');

        tweetShare.setAttribute('href', tweetLink);
        tweetShare.setAttribute('class', 'twitter-highlight-menu twitter_highlight highlightbtn icon');
        tweetShare.setAttribute('id', 'tweet_link');
        tweetShare.setAttribute('target', '_blank');


        highlightMenu.appendChild(highlightMenuInner);
        highlightMenuInner.appendChild(ul);

        ul.appendChild(li_first);
        ul.appendChild(li_second);

        li_first.appendChild(facebookShare);
        facebookShare.appendChild(icon_first);

        li_second.appendChild(tweetShare);
        tweetShare.appendChild(icon_second);

        document.body.appendChild(highlightMenu);
     
    }

    var app = new App();
    app.init();

}());

