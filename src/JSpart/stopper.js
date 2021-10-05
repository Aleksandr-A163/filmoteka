export default function replacesDefaultImage(arr) {
    // const defaultImage = '/monHD8rdfeKCgxeLnsV3xwNlNvX.jpg'
    const defaultImage = "https://i.postimg.cc/1tGm47Vw/free-icon-reel-3439602.png";

    const newArr = arr.map(element => {

        if (element.backdrop_path === null && element.poster_path === null) {
            element.backdrop_path = defaultImage;
            element.poster_path = defaultImage;
        }
        else {
            element.backdrop_path = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2` + element.backdrop_path
           element.poster_path = "https://www.themoviedb.org/t/p/w220_and_h330_face" + element.poster_path
        }
        
        return element;
    });
    return newArr;
}

