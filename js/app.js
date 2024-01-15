import DataList from "./components/DataList.js";
import Gallery from "./components/Gallery.js";
import ImagePicker from "./components/ImagePicker.js";
import DataController from "./controllers/DataController.js";
import FetchController from "./controllers/FetchController.js";

function app() {
    const dataURL = "";
    const dc = DataController(dataURL);
    const dl = DataList(dc, $('.data-list'));
    const gal = Gallery();
    const fc = FetchController();
    const imagePicker = ImagePicker(fc);
    

    dl.init();
    dl.render();

    gal.init();
    imagePicker.init();
}

app();