import { DropEvent } from "react-dropzone";
import DropZone from "../drop-zone/drop-zone.component";

const acceptFileTypes = "image/jpeg, image/png";
const messageSuggest = "Only *.jpeg and *.png images will be accepted";

function ProductImageForm() {
  const onDropAccepted = (files: File[], event: DropEvent) => {
    console.log(files);
  };

  return (
    <DropZone
      onDropAccepted={onDropAccepted}
      acceptFileTypes={acceptFileTypes}
      messageSuggest={messageSuggest}
    />
  );
}

export default ProductImageForm;
