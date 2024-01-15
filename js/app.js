import DataList from "./components/DataList.js";
import Gallery from "./components/Gallery.js";
import ImagePicker from "./components/ImagePicker.js";
import DataController from "./controllers/DataController.js";
import FetchController from "./controllers/FetchController.js";

function app() {
    const fc = FetchController();
    const dc = DataController(fc);
    const gal = Gallery(dc);
    const dl = DataList(dc, gal);
    const imagePicker = ImagePicker(dc, gal);
    
    dl.init();
    dl.render();

    gal.init();
    imagePicker.init();
}

app();