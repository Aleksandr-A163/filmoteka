export default function replacesDefaultImage(arr) {
    console.log(arr);
    const defaultImage = '/monHD8rdfeKCgxeLnsV3xwNlNvX.jpg'
//     const defaultImage = "https://cdn.pixabay.com/photo/2021/08/07/19/49/cosmea-6529220_960_720.jpg";
// //     arr.forEach(({ backdrop_path }) => {
//         if (backdrop_path === null) {
//             backdrop_path = defaultImage;
//             console.log(backdrop_path);
//         }
    
// });
    const newArr = arr.map(element => {
        // if (element.poster_path !== null) {return element}
        if (element.backdrop_path === null && element.poster_path === null) {
            element.backdrop_path = defaultImage;
            element.poster_path = defaultImage;
        }
        // else {
        //     // element.backdrop_path = `https://www.themoviedb.org/t/p/w220_and_h330_face` + element.backdrop_path
           
        // }
        
        // if (element.backdrop_path === null && poster_path === null) {
        //     element.backdrop_path = defaultImage;
        //     console.log(element.backdrop_path);
        //     return element;
        // }
        return element;
    });
    console.log(newArr)
    return newArr;
}

