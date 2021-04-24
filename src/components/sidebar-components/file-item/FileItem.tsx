/** Components */
import { BsFileEarmark } from 'react-icons/bs';

interface FileItemProps {
  name: string;
}

const FileItem: React.FC<FileItemProps> = ({ name }) => {
  return (
    <div>
      <div>
        <BsFileEarmark />
        <span>{name}</span>
      </div>
    </div>
  );
};

export default FileItem;
