/** Components */
import { BsFolder } from 'react-icons/bs';

interface FolderItemProps {
  name: string;
}

const FolderItem: React.FC<FolderItemProps> = ({ name, children }) => {
  return (
    <div>
      <div>
        <BsFolder />
        <span>{name}</span>
      </div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default FolderItem;
