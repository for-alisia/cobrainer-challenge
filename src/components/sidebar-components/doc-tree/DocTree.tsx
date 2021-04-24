/** Components */
import FileItem from '../file-item/FileItem';
import FolderItem from '../folder-item/FolderItem';

/** Styles */
import styles from './DocTree.module.scss';

interface DocTreeProps {
  data: any[];
}

const DocTree: React.FC<DocTreeProps> = ({ data }) => {
  console.log(data);
  if (!data) return null;
  return (
    <div className={styles.wrapper}>
      {data.map((item) => {
        if (item.type === 'file') {
          return <FileItem name={item.name} key={item.name} />;
        }

        if (item.type === 'folder') {
          return (
            <FolderItem name={item.name} key={item.name}>
              <DocTree data={item.childrens} />
            </FolderItem>
          );
        }
      })}
    </div>
  );
};

export default DocTree;
