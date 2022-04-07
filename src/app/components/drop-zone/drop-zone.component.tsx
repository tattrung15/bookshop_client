import { useDropzone, FileError, DropEvent } from "react-dropzone";
import { useStyles } from "./make-style";

type PropTypes = {
  acceptFileTypes: string;
  messageSuggest: string;
  onDropAccepted: <T extends File>(files: T[], event: DropEvent) => void;
  onFileDialogOpen: () => void;
  maxFiles?: number;
};

function DropZone(props: PropTypes) {
  const {
    acceptFileTypes,
    messageSuggest,
    onDropAccepted,
    onFileDialogOpen,
    maxFiles,
  } = props;

  const classes = useStyles();

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: acceptFileTypes,
      onDropAccepted,
      onFileDialogOpen,
      ...(maxFiles && { maxFiles }),
    });

  const acceptedFileItems = acceptedFiles.map((file: File) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: { file: File; errors: FileError[] }) => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    )
  );

  return (
    <section className={classes.container}>
      <div {...getRootProps({ className: classes.dropzone })}>
        <input {...getInputProps()} />
        <p>Kéo và thả một số tệp vào đây hoặc nhấp để chọn tệp</p>
        <em>({messageSuggest})</em>
      </div>
      <aside>
        <h4>Tệp được chấp nhận</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Tệp bị từ chối</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}

export default DropZone;
