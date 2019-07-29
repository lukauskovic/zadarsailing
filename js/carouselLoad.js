var carousel = document.getElementById('carousel-insta');
var opts = {
    method: 'GET',
    headers: {}
};
var imagesArray = [];

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


function initSctructure(image, isFirstItem){

}
function load(images){
    for (var i = 0; i<images.length;i++){
        initSctructure(images[i], i===0)
    }
}