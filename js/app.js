import DataList from "./components/DataList.js";
import DataController from "./controllers/DataController.js";

function app() {
    const dataURL = "";
    const dc = DataController(dataURL);
    const dl = DataList(dc, $('.data-list'));
    dl.init();
    dl.render();
}

app();