var opts = {
    method: 'GET',
    headers: {}
};
var imagesArray = [];
for (var i = 0; i<9;i++){
    initStructure(i)
}

fetch('https://www.instagram.com/explore/tags/zadarsailing?__a=1', opts).then(function (response) {
    return response.json();
})
    .then(function (body) {
        var media = body.graphql.hashtag.edge_hashtag_to_media.edges;
        for (var i = 0;i<media.length;i++) {
            // Process only if is an image
            if (media[i].node.__typename && media[i].node.__typename === 'GraphImage')
                imagesArray.push(media[i].node.display_url);
        }
        load(imagesArray);
    });

function initStructure(i) {
    var instaInject = document.getElementById('instaInject')
    var instaDiv = document.createElement('div')
    instaDiv.setAttribute('id','instaImg_' + i)
    var instaATag = document.createElement('a')
    var instaFigureTag = document.createElement('figure')
    var instaFigureDiv = document.createElement('div')
    var instaIcon = document.createElement('i')
    var instaImage = document.createElement('img')
    instaDiv.setAttribute('class','col-md-4')
    instaATag.setAttribute('class','page-card-item image-popup')
    instaFigureDiv.setAttribute('class','overlay')
    instaIcon.setAttribute('class','icon-resize-full-screen')
    instaImage.setAttribute('alt', 'Zadar Sailing Memories')
    instaImage.setAttribute('class','img-responsive')
    instaInject.appendChild(instaDiv)
    instaDiv.appendChild(instaATag)
    instaATag.appendChild(instaFigureTag)
    instaFigureTag.appendChild(instaFigureDiv)
    instaFigureDiv.appendChild(instaIcon)
    instaFigureTag.appendChild(instaImage)
}

function injectImages(image, i){
    var imageDiv = document.getElementById('instaImg_' + i)
    imageDiv.querySelector('.page-card-item').setAttribute('href', image)
    imageDiv.querySelector('.img-responsive').setAttribute('src', image)

}
function load(images){
    for (var i = 0; i<9;i++){
        injectImages(images[i], i)
    }
}